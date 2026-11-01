import { useHead } from "@solidjs/web";
import { createPageHead } from "@rimelight/seo/head";
import { RLPageSection, RLCard } from "@rimelight/ui";
import ContactForm from "#components/app/ContactForm";
import { t } from "@rimelight/i18n";

export default function ContactPage() {
  useHead(() =>
    createPageHead({
      title: t("page.contact.meta.title"),
      description: t("page.contact.meta.description"),
    }),
  );

  return (
    <RLPageSection
      variant="hero"
      reverse={true}
      orientation="horizontal"
      title={t("page.contact.hero.title")}
      description={t("page.contact.hero.description")}
    >
      <RLCard class="p-6 md:p-8 w-full">
        <ContactForm />
      </RLCard>
    </RLPageSection>
  );
}
