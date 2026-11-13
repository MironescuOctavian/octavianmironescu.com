const covers: Record<string, string> = {
  "vite-plus-unified-toolchain": "/blog/vite-plus.svg",
  "vite-cloudflare-workers-development": "/blog/cloud.svg",
  "cloudflare-remote-bindings": "/blog/bindings.svg",
  "cloudflare-d1-sqlite": "/blog/database.svg",
  "rolldown-modern-javascript-builds": "/blog/toolchain.svg",
  "workers-local-tracing": "/blog/tracing.svg",
  "solid-2-fine-grained-reactivity": "/blog/solid-reactivity.svg",
  "spring-boot-resilient-apis": "/blog/spring-boot-api.svg",
  "postgresql-indexing-beyond-btrees": "/blog/postgresql-indexing.svg",
  "multi-stage-docker-builds": "/blog/docker-multistage.svg",
  "drizzle-d1-safe-migrations": "/blog/drizzle-migrations.svg",
  "unocss-semantic-tokens": "/blog/unocss-tokens.svg",
  "kotlin-structured-concurrency": "/blog/kotlin-coroutines.svg",
  "cloudflare-edge-caching": "/blog/edge-caching.svg",
  "worker-rate-limiting-patterns": "/blog/rate-limiting.svg",
  "graphql-vs-rest-tradeoffs": "/blog/graphql-vs-rest.svg",
  "typescript-typed-errors": "/blog/typescript-errors.svg",
  "accessible-keyboard-ui": "/blog/accessibility-ui.svg",
};

export function blogCover(slug: string, cover: unknown): string {
  return covers[slug] ?? (typeof cover === "string" && cover ? cover : "/blog/cloud.svg");
}
