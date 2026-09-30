import type { ParentProps } from "solid-js";
import { HydrationScript, NoHydration } from "@solidjs/web";
import { createUiHead } from "@rimelight/ui/head";
import { createSecurityHead } from "@rimelight/security/head";
import { createSeoHead } from "@rimelight/seo/head";
import "virtual:uno.css";

const seoHead = createSeoHead();
const securityHead = createSecurityHead();
const uiHead = createUiHead();

const headTags = [...seoHead.tags, ...securityHead.tags, ...uiHead.tags];

export default function Document(props: ParentProps) {
  return (
    <html lang="en">
      <head>
        {/* Head never hydrates: render every tag (meta/link/script/style). */}
        <NoHydration>
          {headTags.map((tag) => {
            if (tag.tag === "title") {
              return <title>{tag.children}</title>;
            }
            if (tag.tag === "meta") {
              const p = tag.props as Record<string, string | undefined>;
              return (
                <meta
                  charset={p["charset"]}
                  name={p["name"]}
                  property={p["property"]}
                  http-equiv={p["http-equiv"] as "refresh" | undefined}
                  media={p["media"]}
                  content={p["content"]}
                />
              );
            }
            if (tag.tag === "link") {
              return <link {...tag.props} />;
            }
            if (tag.tag === "style") {
              return <style nonce={tag.props?.nonce}>{tag.children}</style>;
            }
            if (tag.tag === "script") {
              return (
                <script type={tag.props?.type} nonce={tag.props?.nonce}>
                  {tag.children}
                </script>
              );
            }
            return null;
          })}
        </NoHydration>
        <HydrationScript />
      </head>
      <body>{props.children}</body>
    </html>
  );
}
