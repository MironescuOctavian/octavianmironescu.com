import { bindings, defineConfig, triggers } from "cf/config";

export default defineConfig({
  worker: {
    name: "octavianmironescu-dot-com",
    compatibilityDate: "2026-08-27",
    entrypoint: "./src/fetch.ts",
    cache: {
      enabled: true,
    },
    observability: {
      enabled: true,
      traces: {
        enabled: true,
      },
    },
    triggers: [
      triggers.fetch({ pattern: "octavianmironescu.com/*", zone: "octavianmironescu.com" }),
      triggers.fetch({ pattern: "www.octavianmironescu.com/*", zone: "octavianmironescu.com" }),
    ],
    env: {
      CONSTRUCTION_MODE: bindings.text("true"),
      EMAIL_DOMAIN: bindings.text("octavianmironescu.com"),
      CONTACT_OWNER_EMAIL: bindings.text("owner@octavianmironescu.com"),
      DB: bindings.d1({
        id: "5a1db703-9438-4880-9770-490548e07814",
        dev: {
          remote: true,
        },
      }),
      BLOB: bindings.r2({
        name: "octavianmironescu-dot-com",
        dev: {
          remote: true,
        },
      }),
      EMAIL: bindings.sendEmail({
        dev: {
          remote: true,
        },
      }),
      MY_RATE_LIMITER: bindings.rateLimit({
        namespace: "1001",
        simple: {
          limit: 100,
          period: 60,
        },
      }),
      ASSETS: bindings.assets(),
      CONSTRUCTION_PASSPHRASE: bindings.secret(),
    },
  },
});
