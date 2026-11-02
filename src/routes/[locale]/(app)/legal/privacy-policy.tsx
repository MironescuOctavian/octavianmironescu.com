import { createMemo, Loading, Show, type ComponentProps } from "solid-js";
import { useSearchParams } from "@solidjs/router";
import { getRequestEvent, useHead } from "@solidjs/web";
import {
  PageRenderer,
  SectionBlock,
  richTextToPlain,
  type PublicEntry,
} from "@rimelight/cms/solid";
import { getCurrentLocale } from "@rimelight/i18n";
import { createPageHead } from "@rimelight/seo/head";

const sectionIcons: Record<string, string> = {
  "Who is responsible": "i-lucide-user-round",
  "Information you provide": "i-lucide-message-square",
  "Technical information and service providers": "i-lucide-server",
  "Cookies and similar technologies": "i-lucide-cookie",
  "How long information is kept": "i-lucide-clock",
  "Sharing and international transfers": "i-lucide-globe",
  "Your rights": "i-lucide-shield-check",
  "External links and changes": "i-lucide-external-link",
};

function PrivacySection(props: ComponentProps<typeof SectionBlock>) {
  const icon = () =>
    sectionIcons[richTextToPlain(props.block.props?.["title"], props.locale)] ??
    "i-lucide-file-text";
  return (
    <div class="privacy-section relative">
      <span
        class="privacy-section-icon mx-auto mb-4 flex size-10 items-center justify-center rounded-xl border border-primary-500/50 bg-primary-500/10 text-primary-400 sm:size-11"
        aria-hidden="true"
      >
        <span class={`inline-block size-5 ${icon()}`} />
      </span>
      <SectionBlock {...props} />
    </div>
  );
}

export default function PrivacyPolicyPage() {
  const [search] = useSearchParams<{ preview?: string }>();
  const policy = createMemo<PublicEntry | null>(async () => {
    const request = getRequestEvent()?.request;
    const path = `/api/content/collections/legal/privacy-policy${search.preview ? `?${new URLSearchParams({ preview: search.preview })}` : ""}`;
    const url = request ? new URL(path, request.url).toString() : path;
    try {
      const response = await fetch(url, {
        headers: request?.headers.get("cookie") ? { cookie: request.headers.get("cookie")! } : {},
      });
      return response.ok ? ((await response.json()) as { entry: PublicEntry }).entry : null;
    } catch {
      return null;
    }
  });

  useHead(() =>
    createPageHead({
      title: "Privacy Policy",
      description: "How this website handles personal information.",
    }),
  );

  return (
    <main class="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28">
      <style>{`
        .privacy-content .cms-section {
          margin: 0;
          padding: 0 0 2rem;
          border-top: 2px solid color-mix(in srgb, var(--rl-primary-600) 40%, transparent);
        }
        .privacy-content .privacy-section { padding-top: 2rem; border-top: 2px solid color-mix(in srgb, var(--rl-primary-600) 40%, transparent); }
        .privacy-content .privacy-section:first-child { border-top: 0; padding-top: 0; }
        .privacy-content .privacy-section .cms-section { border-top: 0; }
        .privacy-content .cms-section h2 {
          margin: 0;
          padding: 0;
          border: 0;
          color: var(--rl-primary-500);
          font-size: clamp(1.5rem, 2.5vw, 2rem);
          font-weight: 700;
          letter-spacing: -.025em;
          line-height: 1.2;
          justify-content: center;
        }
        .privacy-content .cms-paragraph {
          margin: 0;
          color: color-mix(in srgb, var(--rl-neutral-950) 65%, transparent);
          font-size: 1rem;
          line-height: 1.75;
        }
        .privacy-content a { color: var(--rl-primary-400); text-decoration: underline; }
      `}</style>
      <header class="mx-auto max-w-3xl text-center">
        <div
          class="mx-auto mb-6 flex size-14 items-center justify-center rounded-2xl border-2 border-primary-500 bg-primary-500/10 text-primary-400 shadow-[0_0_24px_var(--rl-primary-900)]"
          aria-hidden="true"
        >
          <span class="i-lucide-shield-check inline-block size-7" />
        </div>
        <p class="mb-4 text-xs font-semibold uppercase tracking-[.3em] text-primary-400">Legal</p>
        <h1 class="text-5xl font-bold tracking-tight text-primary-500 sm:text-6xl">
          Privacy Policy<span class="text-neutral-950">.</span>
        </h1>
        <p class="mt-5 text-base leading-7 text-neutral-950/60 sm:text-lg">
          How this website handles personal information.
        </p>
      </header>
      <section class="privacy-content mx-auto mt-12 max-w-4xl border-t-2 border-primary-600/40 pt-10 text-center text-neutral-950/80">
        <Loading fallback={<p>Loading privacy policy…</p>}>
          <Show when={policy()} fallback={<p>This policy is not available yet.</p>}>
            <PageRenderer
              blocks={policy()?.blocks ?? []}
              locale={getCurrentLocale()}
              components={{ SectionBlock: PrivacySection }}
            />
          </Show>
        </Loading>
      </section>
    </main>
  );
}
