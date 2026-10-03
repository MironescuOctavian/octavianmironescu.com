import { type Component, Show, onSettled } from "solid-js";
import { getTurnstileSiteKey } from "@rimelight/security";

export interface TurnstileProps {
  siteKey?: string;
  theme?: "auto" | "light" | "dark";
  size?: "normal" | "compact" | "flexible";
  class?: string;
  responseFieldName?: string;
  action?: string;
  cdata?: string;
  execution?: "render" | "execute";
  appearance?: "always" | "execute" | "interaction-only";
  injectScript?: boolean;
  [key: string]: any;
}

export const Turnstile: Component<TurnstileProps> = (props) => {
  const resolvedSiteKey = () =>
    props.siteKey ||
    getTurnstileSiteKey() ||
    (import.meta as any).env?.["TURNSTILE_SITE_KEY"] ||
    "";

  onSettled(() => {
    if (props.injectScript !== false && typeof document !== "undefined") {
      const existing = document.querySelector('script[src*="turnstile/v0/api.js"]');
      if (!existing) {
        const script = document.createElement("script");
        script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
      }
    }
  });

  return (
    <Show when={resolvedSiteKey()}>
      <div
        class={props.class || "cf-turnstile my-2"}
        data-sitekey={resolvedSiteKey()}
        data-theme={props.theme || "auto"}
        data-size={props.size || "normal"}
        data-response-field-name={props.responseFieldName || "cf-turnstile-response"}
        data-action={props.action}
        data-cdata={props.cdata}
        data-execution={props.execution}
        data-appearance={props.appearance}
      />
    </Show>
  );
};

export default Turnstile;
