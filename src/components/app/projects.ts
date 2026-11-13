export interface Project {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: string;
  category: string;
  tags: string[];
  image?: string;
  status?: string;
}

// Shared by the home page and project directory.
export const projects: Project[] = [
  {
    id: "timezone-converter",
    title: "Timezone Converter",
    description:
      "World clocks, timezone conversions, an interactive globe, and Discord timestamps. Make time work across borders.",
    href: "https://timezone-converter.omironescu.workers.dev/en/",
    icon: "i-lucide-globe",
    category: "Application",
    tags: ["SolidJS", "TypeScript", "Cloudflare"],
    image: "/projects/timezone-converter.svg",
    status: "Live",
  },
  {
    id: "portfolio",
    title: "octavianmironescu.com",
    description:
      "My personal corner of the web: a multilingual portfolio, resume, and blog built with the Rimelight ecosystem.",
    href: "https://github.com/MironescuOctavian/octavianmironescu.com",
    icon: "i-lucide-code-xml",
    category: "Website",
    tags: ["SolidJS", "Rimelight", "Cloudflare"],
    status: "Live",
  },
  {
    id: "pomodoro-kitty",
    title: "Pomodoro Kitty",
    description:
      "A cozy Pomodoro timer with a little feline friend. Focus together, earn treats, and care for your kitty during breaks.",
    href: "https://pomodoro-kitty.omironescu.workers.dev/en/",
    icon: "i-lucide-cat",
    category: "Productivity",
    tags: ["SolidJS", "TypeScript", "Cloudflare"],
    status: "Live",
  },
  {
    id: "steam-next",
    title: "SteamNext",
    description:
      "Turn your Steam backlog into a plan. Filter by time-to-beat, spin the roulette, and track live Steam activity and news.",
    href: "https://steam-next.omironescu.workers.dev/",
    icon: "i-lucide-gamepad-2",
    category: "Application",
    tags: ["SolidJS", "TypeScript", "Cloudflare"],
    status: "Live",
  },
];
