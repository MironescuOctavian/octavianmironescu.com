/// <reference types="vite/client" />
/// <reference types="vite-plus/client" />
/// <reference types="@solidjs/vite-plugin/virtual-solid-manifest" />
/// <reference types="filesystem-routing/types" />

declare module "cloudflare:workers" {
  export const env: import("../cloudflare.config").Env;
}
