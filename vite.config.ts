import { defineConfig } from "vite-plus";
import { cloudflare } from "@cloudflare/vite-plugin";
import solid from "@solidjs/vite-plugin";
import { fileRoutes } from "filesystem-routing/vite";
import { seo } from "@rimelight/seo/plugin";
import { security } from "@rimelight/security/plugin";
import { auth } from "@rimelight/auth/plugin";
import { i18n } from "@rimelight/i18n/plugin";
import { ui } from "@rimelight/ui/plugin";
import { cms } from "@rimelight/cms/plugin";

export default defineConfig({
  lint: {
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
  staged: {
    "{package.json,pnpm-workspace.yaml,pnpm-lock.yaml}": () => "pnpm audit",
    "*": "vp check --fix",
  },
  plugins: [
    cloudflare({
      viteEnvironment: {
        name: "ssr",
      },
      experimental: {
        newConfig: true,
      },
    }),

    solid({
      start: true,
      ssr: true,
    }),

    fileRoutes({ types: ".cloudflare/types/file-routes.d.ts" }),

    seo({
      id: "octavianmironescu.com",
      url: "https://octavianmironescu.com",
      name: "Octavian Mironescu",
      description: "Personal website of Octavian Mironescu",
      author: "Octavian Mironescu",
      branding: {
        logo: { alt: "Octavian Mironescu" },
        colors: { themeColor: "#ffffff", backgroundColor: "#ffffff" },
      },
      titleTemplate: "%s | Octavian Mironescu",
      locales: {
        en: "en-US",
        ro: "ro-RO",
        pt: "pt-BR",
      },
      privatePathPrefixes: [
        "/dashboard",
        "/admin",
        "/cms",
        "/internal",
        "/api",
        "/dev",
        "/og",
        "/open-graph",
        "/auth",
      ],
    }),

    security({
      domain: "octavianmironescu.com",
      ratelimit: {
        routes: ["/auth/sign-in", "/auth/sign-up", "/api/upload", "/api/chat", "/api/contact"],
      },
    }),

    auth({
      roleGuards: {
        "/admin": ["admin", "owner"],
      },
    }),

    i18n(),

    ui(),

    cms(),
  ],
});
