import type { ParentProps } from "solid-js";
import { HydrationScript, useHead } from "@solidjs/web";
import { createUiHead } from "@rimelight/ui/head";
import { createSecurityHead } from "@rimelight/security/head";
import { createSeoHead } from "@rimelight/seo/head";
import { getHtmlLang } from "@rimelight/i18n";
import "virtual:uno.css";

export default function Document(props: ParentProps) {
  useHead([...createSeoHead().tags, ...createSecurityHead().tags, ...createUiHead().tags]);

  return (
    <html lang={getHtmlLang()}>
      <head>
        <HydrationScript />
      </head>
      <body>{props.children}</body>
    </html>
  );
}
