const covers: Record<string, string> = {
  "vite-plus-unified-toolchain": "/blog/vite-plus.svg",
  "vite-cloudflare-workers-development": "/blog/cloud.svg",
  "cloudflare-remote-bindings": "/blog/bindings.svg",
  "cloudflare-d1-sqlite": "/blog/database.svg",
  "rolldown-modern-javascript-builds": "/blog/toolchain.svg",
  "workers-local-tracing": "/blog/tracing.svg",
};

export function blogCover(slug: string, cover: unknown): string {
  return covers[slug] ?? (typeof cover === "string" && cover ? cover : "/blog/cloud.svg");
}
