import type { ParentProps } from "solid-js";
import { HydrationScript, useHead } from "@solidjs/web";
import { createDocumentHead } from "@rimelight/seo/head";
import { getLocaleInfo } from "@rimelight/i18n";
import { getDocumentTheme } from "@rimelight/ui/theme";
import "virtual:uno.css";

export default function Document(props: ParentProps) {
  useHead(createDocumentHead());

  return (
    <html lang={getLocaleInfo().tag} dir={getLocaleInfo().dir} data-theme={getDocumentTheme()}>
      <head>
        <HydrationScript />
        <link rel="preconnect" href="https://challenges.cloudflare.com" />
        <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
      </head>
      <body>{props.children}</body>
    </html>
  );
}
