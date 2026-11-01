import { type Component, createSignal, Show } from "solid-js";
import { RLButton } from "@rimelight/ui";
import Turnstile from "#components/app/Turnstile";
import { t } from "@rimelight/i18n";
import { api } from "#api/client";

const inputClass =
  "w-full px-4 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-default text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition";

const Field: Component<{ label: string; children: any }> = (props) => (
  <label class="flex flex-col gap-1 text-sm font-medium text-[var(--rl-text-muted)]">
    {props.label}
    {props.children}
  </label>
);

type Status = { text: string; tone: "muted" | "error" | "success" };
const toneClass = {
  muted: "text-neutral-500",
  error: "text-red-500",
  success: "text-green-600 dark:text-green-400",
};

type ContactResponse = { success: boolean; error?: string };

export const ContactForm: Component = () => {
  const [status, setStatus] = createSignal<Status>();

  const onSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    setStatus({ text: "Sending message...", tone: "muted" });

    const result: ContactResponse = await api.contact
      .$post({ form: Object.fromEntries(new FormData(form)) as any })
      .then((res) => res.json() as Promise<ContactResponse>)
      .catch(() => ({ success: false }));

    if (!result.success) {
      setStatus({
        text: result.error || "Failed to send message. Please try again.",
        tone: "error",
      });
      return;
    }

    setStatus({ text: "Message sent successfully! ✅", tone: "success" });
    form.reset();
    (window as any).turnstile?.reset?.();
  };

  return (
    <form onSubmit={onSubmit} class="flex flex-col gap-4">
      <Field label={t("page.contact.form.name.label")}>
        <input
          name="name"
          required
          class={inputClass}
          placeholder={t("page.contact.form.placeholder.name")}
        />
      </Field>
      <Field label={t("page.contact.form.email.label")}>
        <input
          name="email"
          type="email"
          required
          class={inputClass}
          placeholder={t("page.contact.form.placeholder.email")}
        />
      </Field>
      <Field label={t("page.contact.form.subject.label")}>
        <input
          name="subject"
          class={inputClass}
          placeholder={t("page.contact.form.placeholder.subject")}
        />
      </Field>
      <Field label={t("page.contact.form.message.label")}>
        <textarea
          name="message"
          rows={5}
          required
          minlength={10}
          class={`${inputClass} resize-y min-h-[120px]`}
          placeholder={t("page.contact.form.placeholder.message")}
        />
      </Field>

      <Turnstile />

      <RLButton
        type="submit"
        color="primary"
        variant="solid"
        block={true}
        leadingIcon="i-lucide-send"
        label={t("page.contact.form.send.button")}
        class="mt-2"
      />

      <Show when={status()}>
        {(s) => (
          <p class={`text-sm min-h-[1.5rem] mt-2 font-medium ${toneClass[s().tone]}`} role="status">
            {s().text}
          </p>
        )}
      </Show>
    </form>
  );
};

export default ContactForm;
