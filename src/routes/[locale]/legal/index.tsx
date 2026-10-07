import AppLayout from "#layouts/AppLayout.tsx";
import FormattedDate from "#components/FormattedDate.tsx";
import { getCurrentLocale, getRelativeLocaleUrl } from "@rimelight/i18n";
import { useParams } from "@solidjs/router";
import { getLegalPolicies } from "#utils/content.ts";

export default function LegalIndexPage() {
  const params = useParams<{ locale?: string }>();
  const activeLocale = () => params.locale || getCurrentLocale() || "en";
  const legalPolicies = () =>
    getLegalPolicies().filter((policy) => policy.locale === activeLocale());

  return (
    <AppLayout title="Legal" description="Legal policies and information">
      <div class="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <h1 class="text-3xl font-bold mb-6">Legal</h1>
        <ul class="flex flex-col gap-4 list-none p-0 m-0">
          {legalPolicies().map((policy) => (
            <li class="border-b border-neutral-200 pb-4">
              <a
                href={getRelativeLocaleUrl(`/legal/${policy.slug}/`)}
                class="hover:text-primary transition-colors font-medium text-lg"
              >
                <h2 class="text-xl font-semibold m-0">{policy.data.title}</h2>
              </a>
              <p class="text-sm text-neutral-500 m-0 mt-1">
                <FormattedDate date={policy.data.pubDate} />
              </p>
            </li>
          ))}
        </ul>
      </div>
    </AppLayout>
  );
}
