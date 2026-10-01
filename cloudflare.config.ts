import { bindings, defineConfig, type InferEnv } from "cf/config";

const config = defineConfig({
  worker: {
    name: "octavianmironescu-dot-com",
    compatibilityDate: "2026-08-27",
    entrypoint: "./src/fetch.ts",
    cache: {
      enabled: true,
    },
    observability: {
      enabled: true,
      logs: {
        enabled: true,
        headSamplingRate: 1,
        invocationLogs: true,
      },
      traces: {
        enabled: true,
      },
    },
    domains: ["octavianmironescu.com", "www.octavianmironescu.com"],
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

export type Env = InferEnv<typeof config>;
export default config;
