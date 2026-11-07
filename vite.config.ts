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
      frameSrc: ["https://open.spotify.com", "https://*.spotify.com"],
      imgSrc: ["https://placehold.co", "https://ghchart.rshah.org"],
      directives: { "style-src-attr": ["'unsafe-inline'"] },
      crossOriginEmbedderPolicy: false,
    }),

    auth(),

    i18n(),

    ui({
      unocss: {
        safelist: [
          "i-logos-java",
          "i-logos-spring-icon",
          "i-logos-kotlin-icon",
          "i-logos-typescript-icon",
          "i-logos-vue",
          "i-logos-solidjs-icon",
          "i-logos-mongodb-icon",
          "i-logos-postgresql",
          "i-logos-docker-icon",
          "i-logos-cloudflare-icon",
          "i-logos-vitejs",
          "i-logos-pnpm",
          "i-logos-javascript",
          "i-logos-python",
          "i-logos-unocss",
          "i-logos-html-5",
          "i-mdi-database-outline",
          "i-mdi-api",
          "i-logos-graphql",
          "i-logos-git-icon",
          "i-logos-gradle",
          "i-mdi-github",
          "i-mdi-linkedin",
          "i-mdi-email-outline",
          "i-mdi-web",
          "i-mdi-server-outline",
          "i-mdi-cloud-cog-outline",
          "i-mdi-layers-outline",
          "i-mdi-certificate-outline",
          "i-mdi-rosette-outline",
          "i-mdi-calendar-outline",
          "i-lucide-award",
          "i-mdi-whatsapp",
          "i-mdi-instagram",
          "i-mdi-send-outline",
          "i-mdi-discord",
          "i-mdi-spotify",
          "i-mdi-arrow-top-right",
          "i-mdi-shield-check-outline",
          "i-mdi-file-document-outline",
          "i-mdi-message-text-outline",
        ],
      },
      colors: {
        primary: {
          light: {
            50: "#4b3000",
            100: "#674100",
            200: "#805000",
            300: "#ffbf00",
            400: "#ffca24",
            500: "#ffbf00",
            600: "#d99c00",
            700: "#c79936",
            800: "#e8cf93",
            900: "#f6e7bf",
            950: "#fff7e2",
          },
          dark: {
            50: "#fff8dc",
            100: "#ffecae",
            200: "#ffdd70",
            300: "#ffda4f",
            400: "#ffc91a",
            500: "#ffbf00",
            600: "#d99c00",
            700: "#805b00",
            800: "#503700",
            900: "#302100",
            950: "#1c1400",
          },
        },
        secondary: {
          light: {
            50: "#4b3000",
            100: "#674100",
            200: "#805000",
            300: "#ffbf00",
            400: "#ffca24",
            500: "#ffbf00",
            600: "#d99c00",
            700: "#c79936",
            800: "#f6e7bf",
            900: "#fbf1d7",
            950: "#fff9ea",
          },
          dark: {
            50: "#fff8dc",
            100: "#ffecae",
            200: "#ffdd70",
            300: "#ffda4f",
            400: "#ffc91a",
            500: "#ffbf00",
            600: "#d99c00",
            700: "#805b00",
            800: "#302100",
            900: "#1c1400",
            950: "#100b00",
          },
        },
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
