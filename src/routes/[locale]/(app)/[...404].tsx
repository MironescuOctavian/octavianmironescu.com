import { useHead } from "@solidjs/web";
import { createPageHead } from "@rimelight/seo/head";
import { RLError } from "@rimelight/ui";
import { t } from "@rimelight/i18n";

export default function ErrorPage404() {
  useHead(() =>
    createPageHead({
      title: "404 - Not Found",
      description: t("app.text.page-has-not-been-found"),
      noindex: true,
      is404: true,
    }),
  );

  return <RLError status={404} />;
}
