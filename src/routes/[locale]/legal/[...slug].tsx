import AppLayout from "#layouts/AppLayout.tsx"
import FormattedDate from "#components/FormattedDate.tsx"
import { useParams } from "@solidjs/router"
import { getLegalPolicies } from "#utils/content.ts"
import ErrorPage404 from "#routes/[locale]/404.tsx"

export default function LegalPolicyPage() {
  const params = useParams<{ locale?: string; slug?: string }>()
  const policy = () =>
    getLegalPolicies().find((p) => p.locale === params.locale && p.slug === params.slug)

  return (
    <>
      {policy() ? (
        <AppLayout title={policy()!.data.title} description={policy()!.data.description}>
          <div class="max-w-4xl mx-auto px-4 py-8 sm:py-12">
            <header class="border-b border-neutral-200 pb-6 mb-8 text-center">
              <h1 class="text-3xl sm:text-4xl font-bold mb-2">{policy()!.data.title}</h1>
              {policy()!.data.pubDate && (
                <p class="text-sm text-neutral-500">
                  <FormattedDate date={policy()!.data.pubDate} />
                </p>
              )}
            </header>
            <article class="prose max-w-none leading-relaxed whitespace-pre-wrap">
              {policy()!.body}
            </article>
          </div>
        </AppLayout>
      ) : (
        <ErrorPage404 />
      )}
    </>
  )
}
