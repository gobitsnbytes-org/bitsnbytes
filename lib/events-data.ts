export type HeroEventStatus = "upcoming" | "archived" | "closed";

export type HeroEventSlide = {
  image: string;
  imageMobile?: string;
  alt: string;
  badge: string;
  status: HeroEventStatus;
  title: string;
  subtitle: string;
  href: string;
};

export const githubDevDayEvent = {
  title: "GitHub Copilot Dev Days",
  city: "Lucknow",
  dateLabel: "Apr 19, 2026",
  venueLabel: "Cubispace, Lucknow",
  formatLabel: "In-Person Workshop",
  statusLabel: "Registrations Closed",
  archiveLink: "https://luma.com/xtxua1jl",
  lumaCheckoutUrl: "https://luma.com/event/evt-utBD3JUI1ENZoyn",
  lumaEventId: "evt-utBD3JUI1ENZoyn",
} as const;

export const lucknowBuildGuildEvent = {
  title: "Lucknow Build Guild",
  dateLabel: "Apr 19, 2026",
  venueLabel: "SureStay by Best Western, Lucknow",
  formatLabel: "Free Hardware Workshop & Meetup",
  statusLabel: "Archived",
  hostName: "Shaurya",
  eventSite: "https://www.lucknow-build-guild.xyz/",
  hostLinktree: "https://linktr.ee/shauryaashu",
  hostGithub: "https://github.com/Shaurya-Ashu",
} as const;

export const heroEvents: HeroEventSlide[] = [
  {
    image: "/event_pictures/bd1.jpg",
    imageMobile: "/event_pictures/bd1.jpg",
    alt: "Lucknow Build Guild",
    badge: "Archived Event",
    status: "archived",
    title: "Lucknow Build Guild",
    subtitle: "19 Apr 2026 · Lucknow",
    href: "/events",
  },
  {
    image: "/images/github-copilot-hero-desktop.png",
    imageMobile: "/images/github-copilot-hero-mobile.png",
    alt: "GitHub Copilot Dev Days | Lucknow",
    badge: "Registrations Closed",
    status: "closed",
    title: "GitHub Copilot Dev Days",
    subtitle: "19 Apr 2026 · Lucknow",
    href: "/events",
  },
  {
    image: "/event_pictures/HEe923uagAATqvy.jpg",
    imageMobile: "/event_pictures/HEe923uagAATqvy.jpg",
    alt: "India Innovates 2026 archive",
    badge: "Archived Event",
    status: "archived",
    title: "India Innovates 2026 Archive",
    subtitle: "28 Mar 2026 · New Delhi",
    href: "/events",
  },
];
