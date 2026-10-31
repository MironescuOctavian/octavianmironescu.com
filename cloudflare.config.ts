import { bindings, defineConfig, triggers } from "cf/config";

export default defineConfig({
  worker: {
    name: "octavianmironescu-dot-com",
    compatibilityDate: "2026-10-01",
    entrypoint: "./src/fetch.ts",
    observability: {
      enabled: true,
      traces: {
        enabled: true,
      },
      issues: {
        enabled: true,
      },
    },
    cache: {
      enabled: true,
    },
    triggers: [
      triggers.fetch({ pattern: "octavianmironescu.com/*", zone: "octavianmironescu.com" }),
      triggers.fetch({ pattern: "www.octavianmironescu.com/*", zone: "octavianmironescu.com" }),
    ],
    env: {
      ASSETS: bindings.assets(),
      IMAGES: bindings.images(),
      BLOB: bindings.r2({
        name: "octavianmironescu-dot-com",
      }),
      DB: bindings.d1({
        id: "5a1db703-9438-4880-9770-490548e07814",
      }),
      EMAIL: bindings.sendEmail(),
      RATE_LIMIT: bindings.rateLimit({
        namespace: "1001",
        simple: {
          limit: 100,
          period: 60,
        },
      }),
      CONSTRUCTION_MODE: bindings.secret(),
      CONSTRUCTION_PASSPHRASE: bindings.secret(),
      CONTACT_OWNER_EMAIL: bindings.text("owner@octavianmironescu.com"),
    },
  },
});
