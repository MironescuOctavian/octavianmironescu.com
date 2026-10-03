import BlogPost from "#layouts/BlogPost.tsx";
import { useParams } from "@solidjs/router";
import { getBlogPosts } from "#utils/content.ts";
import ErrorPage404 from "#routes/[locale]/404.tsx";

export default function BlogPostPage() {
  const params = useParams<{ locale?: string; slug?: string }>();
  const post = () =>
    getBlogPosts().find((p) => p.locale === params.locale && p.slug === params.slug);

  return (
    <>
      {post() ? (
        <BlogPost
          title={post()!.data.title}
          description={post()!.data.description}
          pubDate={post()!.data.pubDate}
          updatedDate={post()!.data.updatedDate}
          heroImage={post()!.data.heroImage}
        >
          <div class="whitespace-pre-wrap">{post()!.body}</div>
        </BlogPost>
      ) : (
        <ErrorPage404 />
      )}
    </>
  );
}
