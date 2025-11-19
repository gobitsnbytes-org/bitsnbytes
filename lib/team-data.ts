export interface TeamMember {
  name: string
  role: string
  superpowers: string[]
  talkToMeWhen: string[]
  department: "Leadership" | "Engineering" | "Design" | "Community" | "Content"
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Yash",
    role: "Co-Founder & Local Lead",
    superpowers: ["Full-stack dev", "AI", "Web architecture", "Modern web frameworks"],
    talkToMeWhen: [
      "Designing a new system or feature",
      "Blocked on complex implementation details",
      "Exploring AI/ML ideas",
    ],
    department: "Leadership",
  },
  {
    name: "Saksham",
    role: "Co-Founder & Designer",
    superpowers: ["UI/UX", "Design systems", "Visual identity", "Accessibility"],
    talkToMeWhen: [
      "Starting a new product/page and want high-quality UI",
      "Need flows, wireframes, or interaction design",
      "Need feedback on accessibility or visual consistency",
    ],
    department: "Design",
  },
  {
    name: "Aadrika",
    role: "Community Lead",
    superpowers: ["Community building", "Mentoring", "Event hosting", "Onboarding"],
    talkToMeWhen: [
      "You're new and don't know where to start",
      "Want to host a community activity or workshop",
      "See community issues needing care or support",
    ],
    department: "Community",
  },
  {
    name: "Akshat",
    role: "Project Manager",
    superpowers: ["Project planning", "Timelines", "Coordination", "Strategy"],
    talkToMeWhen: [
      "Unsure about priorities or what to work on next",
      "A project feels stuck and needs structure",
      "Want to propose a new initiative or cross-team collab",
    ],
    department: "Leadership",
  },
  {
    name: "Devansh",
    role: "Backend Specialist",
    superpowers: ["Databases", "APIs", "System design", "Scalability"],
    talkToMeWhen: [
      "Designing a new API or database schema",
      "Have performance or scaling questions",
      "Validating backend architecture decisions",
    ],
    department: "Engineering",
  },
  {
    name: "Maryam",
    role: "Mobile Dev Lead",
    superpowers: ["iOS", "Android", "Cross-platform frameworks", "Mobile UX"],
    talkToMeWhen: [
      "Starting or integrating a mobile app",
      "Need help making something feel 'native'",
      "Dealing with device-specific bugs or optimizations",
    ],
    department: "Engineering",
  },
  {
    name: "Kaustubh",
    role: "DevOps Engineer",
    superpowers: ["Infrastructure", "CI/CD", "Cloud", "Security", "Monitoring"],
    talkToMeWhen: [
      "Deploying a new service",
      "Want logging/monitoring added or improved",
      "Questions about infra costs, security, or scaling",
    ],
    department: "Engineering",
  },
  {
    name: "Fatima",
    role: "Content Creator",
    superpowers: ["Technical writing", "Tutorials", "Educational content", "Social posts"],
    talkToMeWhen: [
      "Shipping a feature that needs docs or a blog",
      "Running a workshop and want clear content",
      "Want to share a project story with the community",
    ],
    department: "Content",
  },
]

export function findExperts(query: string): TeamMember[] {
  const lowerQuery = query.toLowerCase()
  return TEAM_MEMBERS.filter(
    (member) =>
      member.name.toLowerCase().includes(lowerQuery) ||
      member.role.toLowerCase().includes(lowerQuery) ||
      member.superpowers.some((s) => s.toLowerCase().includes(lowerQuery)) ||
      member.talkToMeWhen.some((t) => t.toLowerCase().includes(lowerQuery))
  )
}

export function recommendRoles(skills: string[], interests: string[]): string {
  const userKeywords = [...skills, ...interests].map((k) => k.toLowerCase())
  const recommendations: string[] = []

  if (userKeywords.some((k) => k.includes("design") || k.includes("ui") || k.includes("art") || k.includes("drawing"))) {
    recommendations.push("Design Team (Talk to Saksham)")
  }
  if (
    userKeywords.some(
      (k) => k.includes("code") || k.includes("dev") || k.includes("web") || k.includes("python") || k.includes("js")
    )
  ) {
    recommendations.push("Engineering Team (Talk to Yash or Devansh)")
  }
  if (
    userKeywords.some(
      (k) => k.includes("people") || k.includes("event") || k.includes("manage") || k.includes("lead")
    )
  ) {
    recommendations.push("Community & Leadership (Talk to Aadrika or Akshat)")
  }
  if (
    userKeywords.some(
      (k) => k.includes("mobile") || k.includes("app") || k.includes("android") || k.includes("ios")
    )
  ) {
    recommendations.push("Mobile Development (Talk to Maryam)")
  }
  if (
    userKeywords.some(
      (k) => k.includes("write") || k.includes("blog") || k.includes("teach") || k.includes("content")
    )
  ) {
    recommendations.push("Content Team (Talk to Fatima)")
  }

  if (recommendations.length === 0) {
    return "General Member - join our Discord to explore different tracks!"
  }

  return recommendations.join(", ")
}

