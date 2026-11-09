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
  isPlaceholder?: boolean;
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
    id: "discord-bot",
    title: "Discord Automation Bot",
    description: "A Java project for Discord automation, developed and maintained since 2024.",
    href: "/resume#resume-projects-heading",
    icon: "i-mdi-discord",
    category: "Automation",
    tags: ["Java", "Discord"],
    status: "Active",
  },
  {
    id: "spring-cloud-microservices",
    title: "Cloud Microservices Suite",
    description:
      "Distributed backend architecture with Spring Cloud, resilient circuit breakers, and OpenTelemetry tracing.",
    href: "https://github.com/MironescuOctavian",
    icon: "i-mdi-server-outline",
    category: "Backend",
    tags: ["Java", "Spring Boot", "Docker"],
    isPlaceholder: true,
    status: "In progress",
  },
  {
    id: "edge-kv-cache",
    title: "Edge Cache & API Proxy",
    description:
      "Ultra-low-latency edge caching layer and rate limiter powered by Cloudflare Workers and KV storage.",
    href: "https://github.com/MironescuOctavian",
    icon: "i-mdi-cloud-cog-outline",
    category: "Cloud & Edge",
    tags: ["TypeScript", "Cloudflare", "Hono"],
    isPlaceholder: true,
    status: "In progress",
  },
  {
    id: "dev-terminal-suite",
    title: "Developer CLI Toolchain",
    description:
      "Command-line productivity toolkit for managing local environments, database seeds, and automated deployments.",
    href: "https://github.com/MironescuOctavian",
    icon: "i-mdi-api",
    category: "DevTools",
    tags: ["TypeScript", "Node.js", "CLI"],
    isPlaceholder: true,
    status: "Planned",
  },
  {
    id: "realtime-event-hub",
    title: "Event Streaming Engine",
    description:
      "High-throughput asynchronous event processor and message pipeline built with Kotlin and reactive streams.",
    href: "https://github.com/MironescuOctavian",
    icon: "i-mdi-database-outline",
    category: "Architecture",
    tags: ["Kotlin", "Kafka", "MongoDB"],
    isPlaceholder: true,
    status: "Planned",
  },
  {
    id: "solid-component-kit",
    title: "Design System & UI Kit",
    description:
      "Accessible component library with design tokens, dark mode primitives, and headless behaviors for SolidJS.",
    href: "https://github.com/MironescuOctavian",
    icon: "i-mdi-layers-outline",
    category: "Design System",
    tags: ["SolidJS", "UnoCSS", "TypeScript"],
    isPlaceholder: true,
    status: "In progress",
  },
  {
    id: "metrics-dashboard",
    title: "Service Health Dashboard",
    description:
      "Real-time infrastructure health and uptime monitor with live telemetry charting and incident alerts.",
    href: "https://github.com/MironescuOctavian",
    icon: "i-mdi-web",
    category: "Monitoring",
    tags: ["SolidJS", "TypeScript", "REST"],
    isPlaceholder: true,
    status: "Planned",
  },
];
