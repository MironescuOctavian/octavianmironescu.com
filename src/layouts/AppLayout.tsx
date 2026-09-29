import { type Component, Show } from "solid-js"
import { useParams } from "@solidjs/router"
import type { JSX } from "@solidjs/web"
import { Title, Meta } from "@solidjs/meta"
import Header from "#components/Header.tsx"
import Footer from "#components/Footer.tsx"
import { RLMain, RLScrollToTop, RLToaster } from "@rimelight/ui"
import { currentLocale } from "@rimelight/i18n"

export interface AppLayoutProps {
  title?: string | undefined
  description?: string | undefined
  noindex?: boolean | undefined
  is404?: boolean | undefined
  robots?: string | undefined
  ogImageSrc?: string | undefined
  ogImageAlt?: string | undefined
  children?: JSX.Element | undefined
}

export const AppLayout: Component<AppLayoutProps> = (props) => {
  const params = useParams<{ locale?: string }>()
  if (params.locale && ["en", "ro", "pt-br"].includes(params.locale)) {
    currentLocale.set(params.locale)
  }

  return (
    <>
      <Show when={props.title}>
        <Title>{props.title}</Title>
      </Show>
      <Show when={props.description}>
        <Meta name="description" content={props.description} />
      </Show>
      <Show when={props.noindex}>
        <Meta name="robots" content="noindex, nofollow" />
      </Show>
      <Show when={props.robots}>
        <Meta name="robots" content={props.robots} />
      </Show>
      <Show when={props.ogImageSrc}>
        <Meta property="og:image" content={props.ogImageSrc} />
        <Meta name="twitter:image" content={props.ogImageSrc} />
      </Show>
      <Show when={props.ogImageAlt}>
        <Meta property="og:image:alt" content={props.ogImageAlt} />
      </Show>

      <div class="isolate flex flex-col min-h-screen">
        <Header />

        <RLMain id="main-content" class="flex-1">
          {props.children}
        </RLMain>

        <Footer />

        <RLScrollToTop showProgress={true} />
        <RLToaster />
      </div>
    </>
  )
}

export default AppLayout
