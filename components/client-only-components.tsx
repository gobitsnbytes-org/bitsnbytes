"use client";

import dynamic from "next/dynamic";

// Client-side only components (no SSR)
export const FloatingAiAssistant = dynamic(
  () => import("@/components/ui/glowing-ai-chat-assistant").then(mod => ({ default: mod.FloatingAiAssistant })),
  { ssr: false }
);

