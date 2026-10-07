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
        favicon: { svg: "https://cdn.octavianmironescu.com/logos/logomark_color.svg" },
        appleTouchIcon: "https://cdn.octavianmironescu.com/logos/logomark_color.svg",
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

    ui({
      logos: {
        logomark: {
          color: "https://cdn.octavianmironescu.com/logos/logomark_color.svg",
          white: "https://cdn.octavianmironescu.com/logos/logomark_white.svg",
          black: "https://cdn.octavianmironescu.com/logos/logomark_black.svg",
        },
        logotype: {
          color: "https://cdn.octavianmironescu.com/logos/logotype_color.svg",
          white: "https://cdn.octavianmironescu.com/logos/logotype_white.svg",
          black: "https://cdn.octavianmironescu.com/logos/logotype_black.svg",
        },
      },
    }),

    cms(),
  ],
});
