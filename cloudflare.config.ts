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
      BLOB: bindings.r2({
        name: "octavianmironescu-dot-com",
        dev: {
          remote: true,
        },
      }),
      ASSETS: bindings.assets(),
      CONSTRUCTION_PASSPHRASE: bindings.secret(),
    },
  },
});
