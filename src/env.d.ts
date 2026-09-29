/// <reference types="vite/client" />
/// <reference types="vite-plus/client" />
/// <reference types="@solidjs/vite-plugin/virtual-solid-manifest" />
/// <reference types="filesystem-routing/types" />
/// <reference types="../file-routes.d.ts" />

type R2Bucket = import("@cloudflare/workers-types").R2Bucket

type CloudflareEnv = {
  BLOB: R2Bucket
  SITE_NAME?: string
  POLICY_AUD?: string
  TEAM_DOMAIN?: string
  CONSTRUCTION_MODE?: string
}

declare module "cloudflare:workers" {
  export const env: CloudflareEnv
}
