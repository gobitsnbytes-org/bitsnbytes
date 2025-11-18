"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { HeroFuturistic } from "@/components/ui/hero-futuristic"
import TechShapes from "@/components/tech-shapes"
import { PageSection } from "@/components/page-section"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards"

const stats = [
  { value: "80+", label: "Active members", detail: "across Lucknow" },
  { value: "50+", label: "Projects shipped", detail: "from apps to AI" },
  { value: "10", label: "Partner schools", detail: "and growing" },
]

const stories = [
  {
    quote:
      "Scrapyard hackathon felt electric—40+ teens building, pitching, and cheering each other on. It proved students can run world-class events.",
    name: "Aadrika",
    title: "Community Lead",
  },
  {
    quote:
      "We pair first-time coders with experienced mentors, so everyone ships something real. The confidence boost is unreal.",
    name: "Yash",
    title: "Co-founder & Lead Dev",
  },
  {
    quote:
      "Bits&Bytes gave me my first stage to teach design systems. Now I help younger designers craft bold visuals for events.",
    name: "Saksham",
    title: "Design Lead",
  },
]

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroFuturistic />

      <PageSection
        eyebrow="Impact"
        title="Community-powered learning with real outcomes"
        description="We’re a teen-led code club where workshops, hackathons, and build nights lead directly to shipped projects and new opportunities."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {stats.map((stat) => (
            <Card
              key={stat.label}
              className="border-white/20 bg-white/70 p-6 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-white/5"
            >
              <CardContent className="p-0">
                <p className="text-4xl font-bold text-[var(--brand-pink)]">{stat.value}</p>
                <CardTitle className="mt-2 text-lg">{stat.label}</CardTitle>
                <CardDescription className="text-base">{stat.detail}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </PageSection>

      <PageSection
        eyebrow="Ways We Build"
        title="Learn, collaborate, and hack with us"
        description="From weekly sessions to multi-day hackathons, we create premium spaces for experimentation, mentorship, and wild ideas."
      >
        <TechShapes />
      </PageSection>

      <PageSection eyebrow="Stories" title="Voices from the crew" align="center">
        <InfiniteMovingCards
          items={stories}
          direction="right"
          speed="slow"
        />
      </PageSection>
    </div>
  )
}
