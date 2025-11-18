"use client"

import { Mail, MapPin, Clock, Loader2 } from "lucide-react"
import { InteractiveRobotSection } from "@/components/ui/interactive-3d-robot"
import { useState, FormEvent } from "react"

import { PageSection } from "@/components/page-section"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ContactCard } from "@/components/ui/contact-card"
import { cn } from "@/lib/utils"
import { LiquidGlassBackdrop } from "@/components/ui/liquid-glass-effect"

const fieldClass =
  "w-full rounded-2xl border border-white/20 bg-card/90 px-4 py-3 text-base text-foreground shadow-inner shadow-black/5 transition focus:border-[var(--brand-pink)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-pink)]/30 dark:border-white/15 dark:bg-white/5 dark:text-white"

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<null | { type: "success" | "error"; message: string }>(null)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus(null)
    setIsSubmitting(true)

    const form = e.currentTarget
    const formData = new FormData(form)

    const name = (formData.get("name") as string) || ""
    const email = (formData.get("email") as string) || ""
    const subject = (formData.get("subject") as string) || ""
    const message = (formData.get("message") as string) || ""

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, subject, message }),
      })

      const data = await res.json()

      if (!res.ok || !data?.success) {
        throw new Error(data?.error || "Failed to send message.")
      }

      setStatus({ type: "success", message: "Message sent successfully. We’ll get back to you soon." })
      form.reset()
    } catch (err) {
      console.error(err)
      setStatus({
        type: "error",
        message: "Something went wrong while sending your message. Please try again in a moment.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <section className="relative overflow-hidden rounded-b-[3rem]">
        <InteractiveRobotSection className="h-[70vh] min-h-[560px]">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.35em] text-white/70">Contact</p>
            <h1 className="font-display text-4xl leading-tight md:text-5xl">Let’s co-create the next big sprint</h1>
            <p className="text-white/75">
              Partner with us on hackathons, workshops, or custom experiences for schools across Lucknow.
            </p>
          </div>
        </InteractiveRobotSection>
      </section>

      <main className="bg-transparent">
        <PageSection
          align="center"
          eyebrow="Contact"
          title="Reach the team"
          description="We love partnering with schools, sponsors, mentors, and students. Drop a note and we'll get back within a couple days."
        >
          <div className="mx-auto w-full max-w-6xl">
            <ContactCard
              title="Get in Touch"
              description="Have questions about our hackathons, workshops, or programs? We'd love to hear from you! Fill out the form and we'll respond within 1-2 business days."
              contactInfo={[
                {
                  icon: Mail,
                  label: 'Email',
                  value: 'hello@lucknow.codes',
                },
                {
                  icon: MapPin,
                  label: 'Location',
                  value: 'Lucknow, India',
                },
                {
                  icon: Clock,
                  label: 'Established',
                  value: 'Teen-led since 2025',
                  className: 'col-span-2',
                }
              ]}
              className="rounded-[40px] border-white/30 bg-white/50 shadow-2xl backdrop-blur-3xl dark:border-white/10 dark:bg-white/5 overflow-hidden"
            >
              <form onSubmit={handleSubmit} className="w-full space-y-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="name" className="text-foreground dark:text-white">Name</Label>
                  <Input 
                    id="name"
                    name="name" 
                    type="text" 
                    placeholder="Your name"
                    className={fieldClass}
                    required 
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="email" className="text-foreground dark:text-white">Email</Label>
                  <Input 
                    id="email"
                    name="email" 
                    type="email" 
                    placeholder="you@email.com"
                    className={fieldClass}
                    required 
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="subject" className="text-foreground dark:text-white">Subject</Label>
                  <Input 
                    id="subject"
                    name="subject" 
                    type="text" 
                    placeholder="Reason for reaching out"
                    className={fieldClass}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="message" className="text-foreground dark:text-white">Message</Label>
                  <Textarea 
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Tell us what you're thinking…"
                    className={cn(fieldClass, "min-h-[120px] resize-none")}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-full bg-gradient-to-r from-[var(--brand-pink)] to-[var(--brand-purple)] py-6 text-base font-semibold text-white shadow-[var(--glow-strong)] disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    "Send message"
                  )}
                </Button>
                {status && (
                  <p
                    className={cn(
                      "text-sm text-center",
                      status.type === "success" ? "text-emerald-600 dark:text-emerald-300" : "text-red-600 dark:text-red-300",
                    )}
                  >
                    {status.message}
                  </p>
                )}
              </form>
            </ContactCard>
          </div>
        </PageSection>
      </main>
    </>
  )
}
