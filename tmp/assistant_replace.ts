    let modelUsed = PRIMARY_MODEL
    let currentMessages = [...baseMessages]
    let actionToClient: AssistantAction | undefined

    const encoder = new TextEncoder()

    const stream = new ReadableStream({
      async start(controller) {
        const send = (payload: Record<string, unknown>) => {
          try {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify(payload)}\n\n`))
          } catch (e) {}
        }
        
        send({ type: "meta", model: modelUsed })

        let fullAssistantContent = ""

        try {
          for (let i = 0; i < 5; i++) {
            let completion
            try {
              completion = await openai.chat.completions.create({
                model: modelUsed,
                messages: currentMessages,
                tools,
                tool_choice: "auto",
                max_tokens: 1024,
                stream: true,
              })
            } catch (err: any) {
              const code = err?.code ?? err?.error?.code
              const status = err?.status
              if (
                code === "model_not_found" ||
                code === "unsupported_parameter" ||
                code === "unsupported_value" ||
                status === 403
              ) {
                modelUsed = FALLBACK_MODEL
                send({ type: "meta", model: modelUsed })
                completion = await openai.chat.completions.create({
                  model: modelUsed,
                  messages: currentMessages,
                  tools,
                  tool_choice: "auto",
                  max_tokens: 1024,
                  stream: true,
                })
              } else {
                throw err
              }
            }

            const toolCallsMap = new Map<number, OpenAI.Chat.Completions.ChatCompletionMessageToolCall>()
            let finishReason: string | null = null
            
            // Temporary holder for this loop iteration
            let chunkText = ""

            for await (const chunk of completion) {
              const delta = chunk.choices[0]?.delta
              if (!delta) continue

              if (chunk.choices[0]?.finish_reason) {
                finishReason = chunk.choices[0].finish_reason
              }

              if (delta.content) {
                chunkText += delta.content
                send({ type: "token", content: delta.content })
              }

              if (delta.tool_calls) {
                for (const tc of delta.tool_calls) {
                  const idx = tc.index
                  if (!toolCallsMap.has(idx)) {
                    toolCallsMap.set(idx, {
                      id: tc.id ?? "",
                      type: "function",
                      function: { name: tc.function?.name ?? "", arguments: tc.function?.arguments ?? "" }
                    })
                  } else {
                    const existing = toolCallsMap.get(idx)!
                    if (tc.id) existing.id = tc.id
                    if (tc.function?.name) existing.function.name += tc.function.name
                    if (tc.function?.arguments) existing.function.arguments += tc.function.arguments
                  }
                }
              }
            }

            fullAssistantContent += chunkText
            const toolCalls = Array.from(toolCallsMap.values())

            if (finishReason === "length" && toolCalls.length > 0) {
              console.warn("[Assistant] Tool call truncated. Retrying without tools.")
              currentMessages.push({
                role: "system",
                content: "Your previous response was truncated. Answer directly without tools.",
              })
              continue
            }

            if (toolCalls.length === 0) {
              break // No tools, we are done streaming text!
            }

            // Append assistant completion message BEFORE the tool responses
            currentMessages.push({
              role: "assistant",
              content: chunkText || null,
              tool_calls: toolCalls as OpenAI.Chat.ChatCompletionMessageToolCall[]
            } as any)

            for (const toolCall of toolCalls) {
              const toolName = toolCall.function.name
              let toolArgs: any = {}
              try {
                const rawArgs = toolCall.function.arguments || "{}"
                const repaired = rawArgs.replace(/,\s*$/, "") + (rawArgs.includes("{") && !rawArgs.endsWith("}") ? "}" : "")
                toolArgs = JSON.parse(repaired)
              } catch {
                toolArgs = {}
                currentMessages.push({
                  role: "tool",
                  tool_call_id: toolCall.id,
                  content: JSON.stringify({ success: false, error: "Malformed tool arguments." }),
                } as OpenAI.Chat.ChatCompletionToolMessageParam)
                continue
              }

              let toolResult: any = null

              if (toolName === "submit_contact_form") {
                toolResult = await handleSubmitContactTool(toolArgs)
              } else if (toolName === "suggest_navigation") {
                const path = normalizePath(toolArgs?.path)
                toolResult = { success: true, path }
                actionToClient = { type: "navigate" as const, path }
              } else if (toolName === "search_site_content") {
                const results = await searchSiteContent(toolArgs?.query ?? "")
                toolResult = { success: true, results }
              } else if (toolName === "find_team_expert") {
                const query = (toolArgs?.query ?? "").toString()
                const experts = findExperts(query)
                toolResult = { query, experts }
              } else if (toolName === "recommend_role") {
                const skills = Array.isArray(toolArgs?.skills) ? toolArgs.skills : []
                const interests = Array.isArray(toolArgs?.interests) ? toolArgs.interests : []
                const recommendation = recommendRoles(skills, interests)
                toolResult = { skills, interests, recommendation }
              } else if (toolName === "highlight_text") {
                const textSnippet = (toolArgs?.textSnippet ?? "").toString()
                toolResult = { success: true, textSnippet }
                actionToClient = { type: "highlight" as const, textSnippet }
              } else if (toolName === "generate_image") {
                const res = await handleImageGenTool(toolArgs)
                toolResult = res.result
                if (res.action) actionToClient = res.action as any
              } else if (toolName === "generate_project_ideas") {
                toolResult = await handleGenerateProjectIdeasTool(toolArgs)
              } else if (toolName === "submit_sponsor_inquiry") {
                toolResult = await handleSubmitSponsorInquiryTool(toolArgs)
              } else {
                toolResult = { success: false, message: `Unknown tool: ${toolName}` }
              }

              currentMessages.push({
                role: "tool",
                tool_call_id: toolCall.id,
                content: JSON.stringify(toolResult),
              } as OpenAI.Chat.ChatCompletionToolMessageParam)
            }
          }

          send({ type: "done", action: actionToClient ?? null })

          if (sessionId) {
            try {
              const { createClient } = await import("@supabase/supabase-js")
              const supabase = createClient(
                process.env.NEXT_PUBLIC_SUPABASE_URL!,
                process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
              )

              const finalMessages = [...currentMessages, { role: "assistant", content: fullAssistantContent }]

              supabase.from("chat_sessions").upsert({
                session_id: sessionId,
                messages: finalMessages,
                pathname: clientPathname,
                model: modelUsed,
                ip_hash: ip,
                updated_at: new Date().toISOString()
              }, { onConflict: "session_id" }).then(({ error }) => {
                if (error) console.error("Failed to save chat_session:", error)
              })
            } catch (err) {
              console.error("Supabase import or upsert failed in stream:", err)
            }
          }

          if (
            latestUserEmbedding &&
            lastUserMsg?.content &&
            !containsSessionSpecificWord(lastUserMsg.content) &&
            fullAssistantContent.trim().length > 0
          ) {
            addSemanticCacheEntry({
              key: `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
              embedding: latestUserEmbedding,
              response: fullAssistantContent,
              action: actionToClient,
            })
          }

        } catch (error) {
          console.error("Streaming error:", error)
          send({ type: "error", message: "Failed to stream assistant response." })
        } finally {
          try { controller.close() } catch (e) {}
        }
      }
    })

    return new Response(stream, { headers: SSE_HEADERS })
  } catch (error) {
    console.error("Assistant API error:", error)
    return NextResponse.json({ error: "Failed to generate a response from the assistant." }, { status: 500 })
  }
}
