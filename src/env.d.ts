/// <reference types="vite-plus/client" />
/// <reference types="@solidjs/vite-plugin/virtual-solid-manifest" />

declare module "cloudflare:workers" {
  export const env: import("../cloudflare.config").Env;
}
