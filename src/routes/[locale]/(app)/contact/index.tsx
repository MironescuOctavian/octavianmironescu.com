import { useHead } from "@solidjs/web";
import { createPageHead } from "@rimelight/seo/head";
import { t } from "@rimelight/i18n";
import { createSignal, onSettled } from "solid-js";
import ContactForm from "#components/app/ContactForm";
import SocialLinks from "#components/app/SocialLinks";

export default function ContactPage() {
  const getBucharestTime = () =>
    new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Bucharest",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(new Date());

  const [clockTime, setClockTime] = createSignal(getBucharestTime());

  onSettled(() => {
    const id = setInterval(() => setClockTime(getBucharestTime()), 1000);
    return () => clearInterval(id);
  });

  useHead(() =>
    createPageHead({
      title: t("page.contact.meta.title"),
      description: t("page.contact.meta.description"),
    }),
  );

  return (
    <div class="w-full overflow-hidden bg-neutral-50 text-neutral-950 selection:bg-primary-400/30">
      <div class="mx-auto max-w-7xl px-5 sm:px-8 py-16 md:py-24">
        <div class="grid items-start gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          {/* Left Column: Context, Information, Live Status & Socials */}
          <div class="flex flex-col">
            <p class="mb-3 text-xs font-semibold tracking-[.3em] text-primary-400 uppercase">
              {t("home.sections.contact.eyebrow") ?? "GET IN TOUCH"}
            </p>
            <h1 class="mb-4 text-4xl font-bold tracking-tight text-primary-500 sm:text-5xl lg:text-6xl">
              {t("page.contact.hero.title")}
            </h1>
            <p class="mt-2 max-w-xl text-base leading-7 text-neutral-950/65 sm:text-lg sm:leading-8">
              {t("page.contact.hero.description")}
            </p>

            {/* Direct Contact Cards */}
            <div class="mt-8 flex flex-col gap-4">
              <a
                href="mailto:omironescu@gmail.com"
                class="group flex items-center justify-between rounded-2xl border-2 border-primary-600 bg-neutral-100 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary-400 hover:bg-neutral-200/60 hover:shadow-[0_4px_24px_var(--rl-primary-950)]"
              >
                <div class="flex items-center gap-4">
                  <div class="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary-500/10 text-primary-400 transition-colors group-hover:bg-primary-500/20 group-hover:text-primary-300">
                    <span class="i-mdi-email-outline size-6" aria-hidden="true" />
                  </div>
                  <div class="flex flex-col">
                    <span class="text-xs font-medium text-neutral-950/50">Email Me</span>
                    <span class="text-base font-semibold text-neutral-950 transition-colors group-hover:text-primary-400 sm:text-lg">
                      omironescu@gmail.com
                    </span>
                  </div>
                </div>
                <span
                  class="i-lucide-arrow-up-right size-5 text-neutral-950/30 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary-400"
                  aria-hidden="true"
                />
              </a>

              <a
                href="https://wa.me/40729616906"
                target="_blank"
                rel="noopener noreferrer"
                class="group flex items-center justify-between rounded-2xl border-2 border-primary-600 bg-neutral-100 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary-400 hover:bg-neutral-200/60 hover:shadow-[0_4px_24px_var(--rl-primary-950)]"
              >
                <div class="flex items-center gap-4">
                  <div class="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary-500/10 text-primary-400 transition-colors group-hover:bg-primary-500/20 group-hover:text-primary-300">
                    <span class="i-mdi-whatsapp size-6" aria-hidden="true" />
                  </div>
                  <div class="flex flex-col">
                    <span class="text-xs font-medium text-neutral-950/50">WhatsApp / Direct</span>
                    <span class="text-base font-semibold text-neutral-950 transition-colors group-hover:text-primary-400 sm:text-lg">
                      +40 729 616 906
                    </span>
                  </div>
                </div>
                <span
                  class="i-lucide-arrow-up-right size-5 text-neutral-950/30 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary-400"
                  aria-hidden="true"
                />
              </a>
            </div>

            {/* Timezone Status Card */}
            <div class="mt-6 flex items-center justify-between rounded-xl border border-primary-600/50 bg-neutral-100/60 px-5 py-4">
              <div class="flex items-center gap-3">
                <span class="relative flex size-3">
                  <span class="absolute inline-flex size-full animate-ping rounded-full bg-primary-400 opacity-75" />
                  <span class="relative inline-flex size-3 rounded-full bg-primary-500" />
                </span>
                <span class="text-sm font-medium text-neutral-950/80">Current Local Time</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="font-mono text-sm font-bold text-neutral-950 sm:text-base">
                  {clockTime()}
                </span>
                <span class="text-xs font-semibold uppercase tracking-wider text-primary-400">
                  EET · Bucharest, Romania
                </span>
              </div>
            </div>

            {/* Social Links */}
            <div class="mt-8">
              <p class="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-950/50">
                Connect on social media
              </p>
              <SocialLinks class="mt-1" />
            </div>
          </div>

          {/* Right Column: Contact Form Card */}
          <div class="rounded-2xl border-2 border-primary-600 bg-neutral-100 p-6 sm:p-8 shadow-[0_4px_24px_var(--rl-primary-950)]">
            <h2 class="mb-2 text-2xl font-bold tracking-tight text-neutral-950">Send a Message</h2>
            <p class="mb-6 text-sm text-neutral-950/60">
              Leave your details and message below. I will respond to your inquiry directly.
            </p>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
