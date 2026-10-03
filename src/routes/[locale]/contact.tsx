import { createSignal, Show } from "solid-js";
import AppLayout from "#layouts/AppLayout.tsx";
import { RLPageSection, RLCard, RLButton } from "@rimelight/ui";
import Turnstile from "#components/Turnstile";
import { t } from "@rimelight/i18n";
import { api } from "#api/client";

export default function ContactPage() {
  const [contactStatus, setContactStatus] = createSignal<{ text: string; error?: boolean } | null>(
    null,
  );

  let contactFormRef!: HTMLFormElement;

  const handleContactSubmit = async (e: Event) => {
    e.preventDefault();
    if (!contactFormRef) return;

    setContactStatus({ text: "Sending message..." });

    try {
      const res = await api.contact.$post({
        form: new FormData(contactFormRef) as any,
      });
      const result = await res.json();

      if (!res.ok || !result.success) {
        const errorMsg =
          !result.success && "error" in result
            ? (result as any).error
            : "Please check form fields and try again.";
        setContactStatus({
          text: errorMsg || "Please check form fields and try again.",
          error: true,
        });
        return;
      }

      setContactStatus({ text: "Message sent successfully! ✅", error: false });
      contactFormRef.reset();
      // @ts-ignore
      window.turnstile?.reset?.();
    } catch {
      setContactStatus({ text: "Failed to send message. Please try again.", error: true });
    }
  };

  return (
    <AppLayout title={t("page_contact.title")} description={t("page_contact.description")}>
      <RLPageSection
        variant="hero"
        reverse={true}
        orientation="horizontal"
        title={t("page_contact.hero_title")}
        description={t("page_contact.hero_description")}
      >
        <RLCard class="p-6 md:p-8 w-full">
          <form
            ref={(el) => (contactFormRef = el)}
            onSubmit={handleContactSubmit}
            class="flex flex-col gap-4"
          >
            <div class="flex flex-col gap-1">
              <label for="contact-name" class="text-sm font-medium text-[var(--rl-text-muted)]">
                {t("page_contact.contact_form_name_label")}
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                placeholder={t("page_contact.contact_form_placeholder_name")}
                class="w-full px-4 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-default text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
              />
            </div>

            <div class="flex flex-col gap-1">
              <label for="contact-email" class="text-sm font-medium text-[var(--rl-text-muted)]">
                {t("page_contact.contact_form_email_label")}
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                placeholder={t("page_contact.contact_form_placeholder_email")}
                class="w-full px-4 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-default text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
              />
            </div>

            <div class="flex flex-col gap-1">
              <label for="contact-subject" class="text-sm font-medium text-[var(--rl-text-muted)]">
                {t("page_contact.contact_form_subject_label")}
              </label>
              <input
                id="contact-subject"
                name="subject"
                type="text"
                placeholder={t("page_contact.contact_form_placeholder_subject")}
                class="w-full px-4 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-default text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
              />
            </div>

            <div class="flex flex-col gap-1">
              <label for="contact-message" class="text-sm font-medium text-[var(--rl-text-muted)]">
                {t("page_contact.contact_form_message_label")}
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                required
                placeholder={t("page_contact.contact_form_placeholder_message")}
                class="w-full px-4 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-default text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition resize-y min-h-[120px]"
              />
            </div>

            <Turnstile />

            <RLButton
              type="submit"
              color="primary"
              variant="solid"
              block={true}
              leadingIcon="i-lucide-send"
              label={t("page_contact.contact_form_send_button")}
              class="mt-2"
            />

            <Show when={contactStatus()}>
              {(status) => (
                <p
                  class={`text-sm min-h-[1.5rem] mt-2 font-medium ${
                    status().error
                      ? "text-red-500"
                      : status().text.includes("✅")
                        ? "text-green-600 dark:text-green-400"
                        : "text-neutral-500"
                  }`}
                  role="status"
                >
                  {status().text}
                </p>
              )}
            </Show>
          </form>
        </RLCard>
      </RLPageSection>
    </AppLayout>
  );
}
