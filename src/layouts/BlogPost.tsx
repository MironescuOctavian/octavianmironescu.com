import type { ParentProps } from "solid-js";
import AppLayout from "#layouts/AppLayout.tsx";
import FormattedDate from "#components/FormattedDate.tsx";

interface BlogPostProps extends ParentProps {
  title: string;
  description?: string;
  pubDate: Date;
  updatedDate?: Date;
  heroImage?: string;
}

export default function BlogPost(props: BlogPostProps) {
  return (
    <AppLayout title={props.title} description={props.description}>
      <div class="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <article>
          {props.heroImage && (
            <div class="mb-8 rounded-2xl overflow-hidden shadow-sm">
              <img
                width={1020}
                height={510}
                src={props.heroImage}
                alt=""
                class="w-full h-auto object-cover"
              />
            </div>
          )}
          <header class="border-b border-neutral-200 pb-8 mb-8 text-center">
            <h1 class="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-4">
              {props.title}
            </h1>
            {props.description && (
              <p class="text-lg text-neutral-500 max-w-2xl mx-auto mb-4">{props.description}</p>
            )}
            <div class="flex items-center justify-center gap-4 text-sm text-neutral-500">
              <FormattedDate date={props.pubDate} />
              {props.updatedDate && (
                <span class="italic">
                  (Updated: <FormattedDate date={props.updatedDate} />)
                </span>
              )}
            </div>
          </header>
          <div class="prose max-w-none mx-auto leading-relaxed">{props.children}</div>
        </article>
      </div>
    </AppLayout>
  );
}
