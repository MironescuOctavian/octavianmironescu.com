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
    cloudflare(),

    solid({
      exclude: ["src/fetch.ts"],
      start: true,
      ssr: true,
      serverFunctions: true,
    }),

    fileRoutes({ types: ".cloudflare/types/file-routes.d.ts" }),

    seo({
      id: "octavianmironescu.com",
      url: "https://octavianmironescu.com",
      name: "Mironescu Octavian",
      description: "Personal website of Mironescu Octavian",
      author: "Mironescu Octavian",
      branding: {
        logo: { alt: "Mironescu Octavian" },
        colors: { themeColor: "#ffffff", backgroundColor: "#ffffff" },
      },
      titleTemplate: "%s | Mironescu Octavian",
      og: {
        routes: {
          "*/blog/*": "./src/components/og/BlogOgCard.tsx",
        },
      },
    }),

    security({
      domain: "octavianmironescu.com",
    }),

    auth(),

    i18n(),

    ui({
      colors: {
        // Tailwind green-600 (#16a34a) in OKLCH chroma/hue.
        primary: [0.194, 149],
      },
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

    cms({ autoMigrate: true, devBypassAuth: true }),
  ],
});
