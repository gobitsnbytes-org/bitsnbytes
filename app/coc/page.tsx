"use client"

import dynamic from "next/dynamic"
import { Suspense } from "react"
import { LiquidGlassBackdrop } from "@/components/ui/liquid-glass-effect"
import { PageSection } from "@/components/page-section"

const WebGLShader = dynamic(() => import("@/components/ui/web-gl-shader").then(mod => ({ default: mod.WebGLShader })), {
  loading: () => null,
  ssr: false
})

export default function CodeOfConduct() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden text-white">
        <WebGLShader />
        <div className="relative z-10 w-full mx-auto max-w-5xl px-4 sm:px-6 py-12 md:py-16">
          <div className="relative border-2 border-[var(--brand-pink)]/30 rounded-[32px] md:rounded-[40px] p-1.5 md:p-2 backdrop-blur-sm bg-black/10">
            <div className="relative border-2 border-[var(--brand-pink)]/50 rounded-[28px] md:rounded-[36px] py-12 px-6 sm:px-10 overflow-hidden bg-black/40 backdrop-blur-xl">
              <div className="absolute inset-0 bg-[var(--brand-purple)]/20" />
              <div className="relative z-10 space-y-6 text-center">
                <span className="inline-flex items-center gap-2 rounded-full border border-[var(--brand-pink)]/60 bg-black/40 px-4 py-1.5 text-xs uppercase tracking-[0.35em] font-semibold text-white/90 backdrop-blur-md">
                  Community Guidelines
                </span>
                <h1 className="font-display text-4xl md:text-6xl lg:text-7xl leading-tight font-extrabold text-white tracking-tighter">
                  Code of Conduct
                </h1>
                <div className="inline-block bg-[var(--brand-pink)] text-white px-6 py-3 rounded-full text-base md:text-lg font-bold shadow-[0_0_30px_rgba(228,90,146,0.5)]">
                  TL;DR: Be nice. Be cool. Don't cause chaos.
                </div>
                <p className="text-white/80 mt-6 text-base md:text-lg max-w-2xl mx-auto">
                  If something feels off, ping us at{" "}
                  <a href="mailto:hello@lucknow.codes" className="text-[var(--brand-pink)] hover:underline font-semibold">
                    hello@lucknow.codes
                  </a>{" "}
                  or talk to any Agent.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="relative z-10 bg-transparent pb-20">
        <PageSection className="max-w-5xl">
          <div className="space-y-8">
            {/* Section 1 */}
            <div className="glass-card relative p-8 shadow-2xl">
              <LiquidGlassBackdrop radiusClassName="rounded-[inherit]" />
              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-[var(--brand-pink)] mb-4 flex items-center gap-3">
                  <span className="text-4xl">1.</span> What We Stand For
                </h2>
                <p className="text-foreground/90 dark:text-white/90 text-lg leading-relaxed mb-4">
                  Bits&Bytes is home for builders, dreamers, designers, and that one person who always knows the shortcut keys. 
                  We want this place to feel friendly, safe, and welcoming for everyone, no matter who they are or where they come from.
                </p>
                <p className="text-muted-foreground dark:text-white/70 text-lg leading-relaxed">
                  This document ensures that the vibe stays positive and everyone feels secure, respected, and free to create the next big thing.
                </p>
              </div>
            </div>

            {/* Section 2 */}
            <div className="glass-card relative p-8 shadow-2xl">
              <LiquidGlassBackdrop radiusClassName="rounded-[inherit]" />
              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-[var(--brand-pink)] mb-4 flex items-center gap-3">
                  <span className="text-4xl">2.</span> The Values We Live By
                </h2>
                <p className="text-foreground/90 dark:text-white/90 text-lg mb-6">
                  Here's the energy we expect from everyone who joins our world:
                </p>
                <div className="space-y-6">
                  <div className="pl-4 border-l-4 border-[var(--brand-pink)]">
                    <h3 className="text-xl font-bold text-foreground dark:text-white mb-2">Be Warm and Welcoming</h3>
                    <p className="text-muted-foreground dark:text-white/80">
                      Make people feel at home. New members shouldn't feel like they walked into the wrong classroom.
                    </p>
                  </div>
                  <div className="pl-4 border-l-4 border-[var(--brand-pink)]">
                    <h3 className="text-xl font-bold text-foreground dark:text-white mb-2">Be Patient and Chill</h3>
                    <p className="text-muted-foreground dark:text-white/80">
                      Everyone learns differently. Everyone speaks differently. Take a breath before replying.
                    </p>
                  </div>
                  <div className="pl-4 border-l-4 border-[var(--brand-pink)]">
                    <h3 className="text-xl font-bold text-foreground dark:text-white mb-2">Respect is Non-Negotiable</h3>
                    <p className="text-muted-foreground dark:text-white/80">
                      We'll disagree sometimes, and that's fine. Just don't make it personal. The goal isn't to "win," it's to learn.
                    </p>
                  </div>
                  <div className="pl-4 border-l-4 border-[var(--brand-pink)]">
                    <h3 className="text-xl font-bold text-foreground dark:text-white mb-2">Build Together, Don't Break Down</h3>
                    <p className="text-muted-foreground dark:text-white/80">
                      Instead of "this sucks," try "here's how we can make this cooler." No unnecessary sniping or derailing.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3 */}
            <div className="glass-card relative p-8 shadow-2xl">
              <LiquidGlassBackdrop radiusClassName="rounded-[inherit]" />
              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-[var(--brand-pink)] mb-4 flex items-center gap-3">
                  <span className="text-4xl">3.</span> Where This Applies
                </h2>
                <p className="text-foreground/90 dark:text-white/90 text-lg mb-4">
                  This code applies everywhere Bits&Bytes exists, including:
                </p>
                <ul className="space-y-2 text-muted-foreground dark:text-white/80 text-lg">
                  <li className="flex items-start gap-3">
                    <span className="text-[var(--brand-pink)] text-2xl">•</span>
                    <span>Offline meetups, workshops, events</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[var(--brand-pink)] text-2xl">•</span>
                    <span>WhatsApp groups, Slack, and other official online spaces</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[var(--brand-pink)] text-2xl">•</span>
                    <span>Any club-affiliated projects, collabs, or forums</span>
                  </li>
                </ul>
                <p className="text-muted-foreground dark:text-white/70 text-lg mt-4 font-semibold">
                  If it has the Bits&Bytes name on it, this code covers it.
                </p>
              </div>
            </div>

            {/* Section 4 */}
            <div className="glass-card relative p-8 shadow-2xl">
              <LiquidGlassBackdrop radiusClassName="rounded-[inherit]" />
              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-[var(--brand-pink)] mb-4 flex items-center gap-3">
                  <span className="text-4xl">4.</span> Things We Absolutely Don't Allow
                </h2>
                <p className="text-foreground/90 dark:text-white/90 text-lg mb-4">Straightforward list of nope:</p>
                <ul className="space-y-2 text-muted-foreground dark:text-white/80 text-lg">
                  <li className="flex items-start gap-3">
                    <span className="text-[var(--brand-pink)] text-2xl">•</span>
                    <span>Harassment or discrimination of any kind</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[var(--brand-pink)] text-2xl">•</span>
                    <span>Bullying or intentionally isolating someone</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[var(--brand-pink)] text-2xl">•</span>
                    <span>Unwanted romantic or sexual advances or sharing explicit content</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[var(--brand-pink)] text-2xl">•</span>
                    <span>Spamming, trolling, or derailing discussions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[var(--brand-pink)] text-2xl">•</span>
                    <span>Misusing club funds or resources</span>
                  </li>
                </ul>
                <p className="text-muted-foreground dark:text-white/70 text-lg mt-4 font-semibold">
                  Basically: don't be harmful, creepy, or chaotic.
                </p>
              </div>
            </div>

            {/* Section 5 */}
            <div className="glass-card relative p-8 shadow-2xl">
              <LiquidGlassBackdrop radiusClassName="rounded-[inherit]" />
              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-[var(--brand-pink)] mb-4 flex items-center gap-3">
                  <span className="text-4xl">5.</span> What Happens If You Break the Rules
                </h2>
                <p className="text-foreground/90 dark:text-white/90 text-lg mb-4">We follow a simple three-strike system:</p>
                <div className="space-y-4">
                  <div className="bg-black/20 dark:bg-white/5 p-4 rounded-lg border border-[var(--brand-pink)]/30">
                    <p className="text-[var(--brand-pink)] font-bold text-xl mb-1">Strike One:</p>
                    <p className="text-muted-foreground dark:text-white/80">You get a formal warning. Might include an apology request.</p>
                  </div>
                  <div className="bg-black/20 dark:bg-white/5 p-4 rounded-lg border border-[var(--brand-pink)]/30">
                    <p className="text-[var(--brand-pink)] font-bold text-xl mb-1">Strike Two:</p>
                    <p className="text-muted-foreground dark:text-white/80">Temporary ban from events and chats.</p>
                  </div>
                  <div className="bg-black/20 dark:bg-white/5 p-4 rounded-lg border border-[var(--brand-pink)]/30">
                    <p className="text-[var(--brand-pink)] font-bold text-xl mb-1">Strike Three:</p>
                    <p className="text-muted-foreground dark:text-white/80">Permanent removal from the community.</p>
                  </div>
                </div>
                <p className="text-muted-foreground dark:text-white/70 text-lg mt-4">
                  For serious situations, the team can take immediate action without warning.
                </p>
              </div>
            </div>

            {/* Section 6 */}
            <div className="glass-card relative p-8 shadow-2xl">
              <LiquidGlassBackdrop radiusClassName="rounded-[inherit]" />
              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-[var(--brand-pink)] mb-4 flex items-center gap-3">
                  <span className="text-4xl">6.</span> Reporting Problems
                </h2>
                <p className="text-foreground/90 dark:text-white/90 text-lg mb-4">
                  If something's wrong, don't ignore it. Tell us.
                </p>
                <ul className="space-y-2 text-muted-foreground dark:text-white/80 text-lg mb-4">
                  <li className="flex items-start gap-3">
                    <span className="text-[var(--brand-pink)] text-2xl">•</span>
                    <span>
                      Email:{" "}
                      <a href="mailto:hello@lucknow.codes" className="text-[var(--brand-pink)] hover:underline font-semibold">
                        hello@lucknow.codes
                      </a>
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[var(--brand-pink)] text-2xl">•</span>
                    <span>Or message any Agent privately</span>
                  </li>
                </ul>
                <p className="text-muted-foreground dark:text-white/70 text-lg">
                  Share context or screenshots if possible. Your report stays confidential. We'll handle things calmly and fairly.
                </p>
              </div>
            </div>

            {/* Footer Quote */}
            <div className="relative overflow-hidden rounded-2xl p-8 text-center shadow-2xl">
              <div className="absolute inset-0 bg-[var(--brand-pink)]" />
              <LiquidGlassBackdrop radiusClassName="rounded-[inherit]" />
              <p className="relative z-10 text-white text-xl md:text-2xl font-bold italic">
                "Bits&Bytes exists to be a positive, creative, exciting space.<br />
                Help us keep it that way."
              </p>
            </div>
          </div>
        </PageSection>
      </main>
    </>
  );
}