/// <reference types="vite-plus/client" />

declare module "cloudflare:workers" {
  export const env: import("../cloudflare.config").Env;
}
