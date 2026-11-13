import type { PublicEntry, PublicTerm } from "@rimelight/cms/solid";
import type { BaseBlock } from "@rimelight/cms";

interface ArticleDraft {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  category: { slug: string; label: string };
  cover: string;
  intro: string;
  sections: {
    heading: string;
    body: string;
    code?: { language: string; snippet: string };
  }[];
}

const p = (id: string, text: string): BaseBlock => ({
  id,
  type: "ParagraphBlock",
  props: { text: [{ type: "text", text }] },
});

const section = (
  id: string,
  heading: string,
  body: string,
  code?: { language: string; snippet: string },
): BaseBlock => ({
  id,
  type: "SectionBlock",
  props: { title: [{ type: "text", text: heading }] },
  children: code
    ? [
        p(`${id}-p`, body),
        {
          id: `${id}-code`,
          type: "CodeBlock",
          props: { language: code.language, code: code.snippet },
        },
      ]
    : [p(`${id}-p`, body)],
});

const DRAFTS: ArticleDraft[] = [
  {
    slug: "solid-2-fine-grained-reactivity",
    title: "Fine-Grained Reactivity in Solid 2.0",
    description:
      "How split-effect primitives and direct signal subscriptions eliminate wasted re-renders in modern SSR apps.",
    publishedAt: "2026-11-12T10:00:00.000Z",
    category: { slug: "frontend", label: "Frontend" },
    cover: "/blog/solid-reactivity.svg",
    intro:
      "Solid 2.0 sharpens the boundary between pure signal computation and DOM side effects so reactive UIs stay predictable under both streaming SSR and client hydration.",
    sections: [
      {
        heading: "Separate compute from apply",
        body: "Splitting effects into a tracked compute phase and an untracked apply phase prevents accidental cyclic dependencies while guaranteeing DOM updates only run when the computed slice actually changes.",
        code: {
          language: "typescript",
          snippet: `createEffect(
  () => [page(), activeCategory()] as const,
  ([nextPage, category]) => {
    gridEl?.scrollIntoView({ behavior: "smooth" });
    syncQueryParam(nextPage, category);
  },
);`,
        },
      },
      {
        heading: "Keep props lazy until read",
        body: "Avoiding object destructuring on component parameters preserves reactive getters. Any child reading props.value subscribes directly to the upstream signal without re-executing the parent component.",
      },
      {
        heading: "Why this fits portfolio-scale apps",
        body: "Interactive filters, paginated directories, and live clocks update only their exact text nodes instead of diffing virtual trees on every tick.",
      },
    ],
  },
  {
    slug: "spring-boot-resilient-apis",
    title: "Designing Resilient Spring Boot APIs",
    description:
      "Practical patterns for idempotent endpoints, bounded retries, and clean transactional boundaries in Java services.",
    publishedAt: "2026-11-11T14:30:00.000Z",
    category: { slug: "backend", label: "Backend" },
    cover: "/blog/spring-boot-api.svg",
    intro:
      "Production backend services fail mostly at network seams—timeouts, duplicate webhooks, and partial commits. Designing around idempotency and explicit boundaries prevents cascading retries.",
    sections: [
      {
        heading: "Keep transactions short and local",
        body: "External HTTP calls should never hold open a database transaction. Persist state changes first, publish an internal domain event, and dispatch downstream webhooks asynchronously.",
        code: {
          language: "java",
          snippet: `@Transactional
public Order confirm(UUID orderId) {
  var order = repository.findById(orderId)
    .orElseThrow(OrderNotFoundException::new);
  order.markConfirmed(Instant.now());
  events.publishEvent(new OrderConfirmedEvent(order.getId()));
  return repository.save(order);
}`,
        },
      },
      {
        heading: "Use explicit timeouts everywhere",
        body: "Default HTTP client configurations often wait indefinitely. Always set connect and read timeouts alongside bounded retry budgets with jitter so a slow dependency does not exhaust worker threads.",
      },
      {
        heading: "Return structured ProblemDetails",
        body: "RFC 9457 ProblemDetails gives callers machine-readable error codes and trace identifiers without leaking stack traces.",
      },
    ],
  },
  {
    slug: "postgresql-indexing-beyond-btrees",
    title: "PostgreSQL Indexing Strategies Beyond B-Trees",
    description:
      "When composite, partial, and GIN indexes cut query latency from seconds to single-digit milliseconds.",
    publishedAt: "2026-11-10T09:15:00.000Z",
    category: { slug: "database", label: "Database" },
    cover: "/blog/postgresql-indexing.svg",
    intro:
      "Adding a single-column index is easy, yet real production slowdowns usually stem from skewed predicates, JSONB filters, or oversized active tables.",
    sections: [
      {
        heading: "Partial indexes for hot subsets",
        body: "If 95% of rows are archived or completed, indexing only active records keeps the B-tree small enough to sit comfortably in shared buffers.",
        code: {
          language: "sql",
          snippet: `CREATE INDEX CONCURRENTLY idx_jobs_pending_run_at
ON background_jobs (run_at ASC)
WHERE status = 'pending';`,
        },
      },
      {
        heading: "GIN for tags and JSON payloads",
        body: "Tag containment and flexible document metadata queries perform cleanly with inverted GIN indexes, avoiding full sequential scans on growing tables.",
      },
      {
        heading: "Verify with EXPLAIN ANALYZE",
        body: "Never guess index effectiveness from schema alone—check buffer reads and actual row estimates against realistic data skew.",
      },
    ],
  },
  {
    slug: "multi-stage-docker-builds",
    title: "Shrinking Containers with Multi-Stage Docker Builds",
    description:
      "Separating build toolchains from runtime images to speed up deployments and reduce container attack surface.",
    publishedAt: "2026-11-09T11:20:00.000Z",
    category: { slug: "cloud", label: "Cloud & DevOps" },
    cover: "/blog/docker-multistage.svg",
    intro:
      "Shipping compilers, package caches, and test runners to production bloats registry pushes and widens security scan alerts.",
    sections: [
      {
        heading: "Isolate compilation from runtime",
        body: "Use a dedicated builder stage for Gradle or pnpm bundling, then copy only compiled artifacts into a minimal distroless or Alpine runtime base.",
        code: {
          language: "dockerfile",
          snippet: `FROM eclipse-temurin:21-jdk AS build
WORKDIR /app
COPY . .
RUN ./gradlew bootJar --no-daemon

FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /app/build/libs/*.jar app.jar
USER 1001
ENTRYPOINT ["java", "-jar", "app.jar"]`,
        },
      },
      {
        heading: "Order layers for cache hits",
        body: "Copy dependency manifests before application source code so routine feature edits reuse cached dependency layers cleanly.",
      },
      {
        heading: "Run as a non-root user",
        body: "Dropping root privileges inside the runtime stage adds defense-in-depth with zero runtime overhead.",
      },
    ],
  },
  {
    slug: "drizzle-d1-safe-migrations",
    title: "Safe Schema Migrations with Drizzle and D1",
    description:
      "Structuring SQLite table changes so edge workers roll forward cleanly without locking or drifting environments.",
    publishedAt: "2026-11-08T16:45:00.000Z",
    category: { slug: "database", label: "Database" },
    cover: "/blog/drizzle-migrations.svg",
    intro:
      "SQLite inside Cloudflare D1 makes local-to-edge schemas lightweight, but altering populated tables still requires disciplined expand-and-contract steps.",
    sections: [
      {
        heading: "Prefer additive column rollouts",
        body: "Add nullable or defaulted columns first, deploy worker code that populates both shapes if needed, and backfill existing rows in small batches.",
        code: {
          language: "typescript",
          snippet: `export const posts = sqliteTable("posts", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  publishedAt: integer("published_at", { mode: "timestamp" }),
  summary: text("summary").default(""),
});`,
        },
      },
      {
        heading: "Keep local and remote migrations synced",
        body: "Review generated SQL files in version control before running remote apply commands so local dev bindings never drift ahead of production.",
      },
      {
        heading: "Inspect constraint rebuilds",
        body: "Because SQLite recreates tables on certain column alterations, always verify generated migration scripts when renaming or tightening NOT NULL rules.",
      },
    ],
  },
  {
    slug: "unocss-semantic-tokens",
    title: "Atomic CSS Tokens with UnoCSS in Multi-Theme Apps",
    description:
      "Mapping CSS custom properties cleanly to utility classes so light and dark surfaces remain coherent across routes.",
    publishedAt: "2026-11-07T13:10:00.000Z",
    category: { slug: "frontend", label: "Frontend" },
    cover: "/blog/unocss-tokens.svg",
    intro:
      "Consistent dark and light modes come from semantic CSS variables rather than sprinkling one-off hex colors across every card.",
    sections: [
      {
        heading: "Bind utility ramps to CSS variables",
        body: "When neutral-50 through neutral-950 resolve dynamically per theme, surface hierarchy stays intact without duplicating dark: variants everywhere.",
        code: {
          language: "typescript",
          snippet: `colors: {
  neutral: {
    dark: { 50: "#000000", 100: "#070707", 950: "#f5f5f5" },
    light: { 50: "#ffffff", 100: "#f7f7f7", 950: "#0a0a0a" },
  },
}`,
        },
      },
      {
        heading: "Reserve primary accents for signal hierarchy",
        body: "Strong amber borders and badges read sharply on pure black surfaces when reserved for interactive actions, headings, and focus rings.",
      },
      {
        heading: "Safelist dynamic icon classes",
        body: "Dynamic data-driven icon names from projects or CMS entries should be declared in the UnoCSS safelist so production builds never purge them.",
      },
    ],
  },
  {
    slug: "kotlin-structured-concurrency",
    title: "Structured Concurrency with Kotlin Coroutines",
    description:
      "Coordinating parallel service calls cleanly with coroutineScope so failures cancel sibling work automatically.",
    publishedAt: "2026-11-06T12:00:00.000Z",
    category: { slug: "backend", label: "Backend" },
    cover: "/blog/kotlin-coroutines.svg",
    intro:
      "Fire-and-forget async tasks leak work when parent requests abort. Structured concurrency ties every child coroutine to a bounded scope.",
    sections: [
      {
        heading: "Fan out safely inside coroutineScope",
        body: "Wrapping concurrent async calls in coroutineScope guarantees the function does not return until every child completes or fails fast together.",
        code: {
          language: "kotlin",
          snippet: `suspend fun loadProfile(userId: String): Profile = coroutineScope {
  val account = async { accountClient.fetch(userId) }
  val activity = async { activityClient.recent(userId) }
  Profile(account.await(), activity.await())
}`,
        },
      },
      {
        heading: "Keep blocking I/O off the default pool",
        body: "Dispatch JDBC or legacy filesystem calls onto Dispatchers.IO or virtual threads so CPU-bound coroutines stay responsive.",
      },
      {
        heading: "Propagate cancellation cleanly",
        body: "Never swallow CancellationException inside broad catch blocks—rethrow it so caller timeouts unwind immediately.",
      },
    ],
  },
  {
    slug: "cloudflare-edge-caching",
    title: "Stale-While-Revalidate Caching at the Edge",
    description:
      "Serving sub-50ms responses from Cloudflare Workers while refreshing upstream data quietly in the background.",
    publishedAt: "2026-11-05T15:30:00.000Z",
    category: { slug: "cloud", label: "Cloud & DevOps" },
    cover: "/blog/edge-caching.svg",
    intro:
      "Waiting for an origin query on every page load wastes latency when content changes only a few times a day.",
    sections: [
      {
        heading: "Cache public reads at the nearest POP",
        body: "Combining short max-age headers with stale-while-revalidate lets Workers return an instant cached response and trigger a background refresh via ctx.waitUntil.",
        code: {
          language: "typescript",
          snippet: `return new Response(body, {
  headers: {
    "content-type": "application/json",
    "cache-control": "public, max-age=60, stale-while-revalidate=300",
  },
});`,
        },
      },
      {
        heading: "Separate public and personalized responses",
        body: "Keep cookie-authenticated responses strictly uncached or keyed privately so shared cache entries never cross user boundaries.",
      },
      {
        heading: "Include explicit cache keys for locale",
        body: "Multilingual routes should normalize locale and query parameters into the cache key to avoid serving the wrong translation.",
      },
    ],
  },
  {
    slug: "worker-rate-limiting-patterns",
    title: "Protecting Worker Endpoints with Rate Limiting",
    description:
      "Guarding contact forms and API routes against bursts using native Cloudflare rate-limit bindings.",
    publishedAt: "2026-11-04T18:05:00.000Z",
    category: { slug: "cloud", label: "Cloud & DevOps" },
    cover: "/blog/rate-limiting.svg",
    intro:
      "Public contact endpoints and form handlers attract automated bots quickly. Native edge rate limiters absorb bursts before hitting mail providers or databases.",
    sections: [
      {
        heading: "Check limits before parsing heavy bodies",
        body: "Key rate-limit checks on route + client IP early in the handler so rejected floods return 429 cleanly with minimal CPU cost.",
        code: {
          language: "typescript",
          snippet: `const { success } = await env.RATE_LIMIT.limit({
  key: \`contact:\${clientIp}\`,
});
if (!success) {
  return Response.json({ error: "Too many requests" }, { status: 429 });
}`,
        },
      },
      {
        heading: "Pair with Turnstile verification",
        body: "Rate limiting stops volume spikes; lightweight challenge tokens block automated form spam without degrading legitimate human submissions.",
      },
      {
        heading: "Use distinct namespaces per sensitivity",
        body: "Keep tight windows on email or auth routes while allowing generous burst budgets for public read APIs.",
      },
    ],
  },
  {
    slug: "graphql-vs-rest-tradeoffs",
    title: "Choosing Between GraphQL and REST for Services",
    description:
      "Evaluating caching, schema evolution, and client flexibility before picking an API paradigm.",
    publishedAt: "2026-11-03T10:40:00.000Z",
    category: { slug: "backend", label: "Backend" },
    cover: "/blog/graphql-vs-rest.svg",
    intro:
      "Both REST and GraphQL power production APIs well, yet choosing the wrong default creates friction either in over-fetching or cache complexity.",
    sections: [
      {
        heading: "When REST wins on simplicity",
        body: "Resource-oriented endpoints excel when HTTP status codes, CDN edge caching, and straightforward OpenAPI contracts cover client needs.",
      },
      {
        heading: "When GraphQL earns its complexity",
        body: "Aggregating deeply nested graphs across multiple mobile and web clients avoids bespoke endpoint sprawl—provided DataLoader batches prevent N+1 queries.",
        code: {
          language: "graphql",
          snippet: `type Project {
  id: ID!
  title: String!
  tags: [String!]!
  repositoryUrl: String
}`,
        },
      },
      {
        heading: "Measure team ergonomics",
        body: "Consistent pagination, clear error shapes, and typed client generation matter far more than dogma.",
      },
    ],
  },
  {
    slug: "typescript-typed-errors",
    title: "Typed Error Handling Patterns in TypeScript",
    description:
      "Replacing opaque catch blocks with discriminated unions so callers handle domain failures explicitly.",
    publishedAt: "2026-11-01T14:00:00.000Z",
    category: { slug: "engineering", label: "Engineering" },
    cover: "/blog/typescript-errors.svg",
    intro:
      "Standard JavaScript try/catch blocks erase failure types to unknown. Returning explicit Result unions forces every expected error path to be handled.",
    sections: [
      {
        heading: "Model domain errors as data",
        body: "Reserve thrown exceptions for unexpected crashes and return tagged unions for expected validation or upstream failures.",
        code: {
          language: "typescript",
          snippet: `type Result<T, E> =
  | { ok: true; value: T }
  | { ok: false; error: E };

type ContactError = "rate_limited" | "invalid_email" | "delivery_failed";`,
        },
      },
      {
        heading: "Exhaustive switching at UI boundaries",
        body: "Handling each discriminant inside a switch guarantees new error variants produce compile-time reminders across forms and API clients.",
      },
      {
        heading: "Preserve unknown errors safely",
        body: "Normalize caught non-Error throws once at service boundaries with structured logging so diagnostics remain readable.",
      },
    ],
  },
  {
    slug: "accessible-keyboard-ui",
    title: "Practical Keyboard Navigation and ARIA in Custom UIs",
    description:
      "Making custom tabs, pagination bars, and icon controls feel effortless without mouse input.",
    publishedAt: "2026-10-30T11:15:00.000Z",
    category: { slug: "frontend", label: "Frontend" },
    cover: "/blog/accessibility-ui.svg",
    intro:
      "Clean visual contrast means little if interactive controls vanish on Tab or expose no active state to screen readers.",
    sections: [
      {
        heading: "Prefer native elements first",
        body: "Use real <button> and <a> elements with clear aria-current or aria-pressed attributes before reaching for custom div click handlers.",
        code: {
          language: "tsx",
          snippet: `<button
  type="button"
  aria-current={isActive ? "page" : undefined}
  onClick={() => goToPage(pageNumber)}
>
  {pageNumber}
</button>`,
        },
      },
      {
        heading: "Keep focus rings crisp on dark surfaces",
        body: "High-contrast primary focus outlines make keyboard traversal effortless without disturbing mouse users.",
      },
      {
        heading: "Respect reduced motion preferences",
        body: "Check prefers-reduced-motion before smooth-scrolling containers or running background CSS animations.",
      },
    ],
  },
];

export const EXTRA_BLOG_POSTS: PublicEntry[] = DRAFTS.map((draft, idx) => ({
  id: `extra-blog-${idx + 1}`,
  collection: "blog",
  slug: draft.slug,
  title: { en: draft.title },
  description: { en: draft.description },
  tags: [],
  bylines: [],
  publishedAt: draft.publishedAt,
  updatedAt: draft.publishedAt,
  blocks: [
    p(`${draft.slug}-intro`, draft.intro),
    ...draft.sections.map((sec, sIdx) =>
      section(`${draft.slug}-s${sIdx + 1}`, sec.heading, sec.body, sec.code),
    ),
  ],
  properties: {
    featured: false,
    excerpt: draft.description,
    cover: draft.cover,
  },
  terms: [{ taxonomy: "category", slug: draft.category.slug, label: { en: draft.category.label } }],
}));

const EXTRA_BY_SLUG = new Map(EXTRA_BLOG_POSTS.map((entry) => [entry.slug, entry]));

export function findExtraBlogPost(slug: string): PublicEntry | null {
  return EXTRA_BY_SLUG.get(slug) ?? null;
}

export function mergeBlogPosts(cmsEntries: PublicEntry[]): PublicEntry[] {
  const bySlug = new Map<string, PublicEntry>();
  for (const post of EXTRA_BLOG_POSTS) {
    bySlug.set(post.slug, post);
  }
  for (const post of cmsEntries) {
    bySlug.set(post.slug, post);
  }
  return Array.from(bySlug.values()).sort((a, b) => {
    const da = new Date(a.publishedAt || a.updatedAt || 0).getTime();
    const db = new Date(b.publishedAt || b.updatedAt || 0).getTime();
    return db - da;
  });
}

export function mergeBlogCategories(cmsTerms: PublicTerm[], allPosts: PublicEntry[]): PublicTerm[] {
  const counts = new Map<string, { label: PublicTerm["label"]; count: number }>();

  for (const term of cmsTerms) {
    if (term.count > 0) {
      counts.set(term.slug, { label: term.label, count: 0 });
    }
  }

  for (const post of allPosts) {
    const term = post.terms?.find((x) => x.taxonomy === "category");
    const slug = term?.slug ?? "technology";
    const label = term?.label ?? { en: "Technology" };
    const prev = counts.get(slug);
    counts.set(slug, {
      label: prev?.label ?? label,
      count: (prev?.count ?? 0) + 1,
    });
  }

  return Array.from(counts.entries())
    .map(([slug, info], i) => ({
      id: `cat-${slug}`,
      taxonomy: "category",
      slug,
      label: info.label,
      description: null,
      parentId: null,
      displayOrder: i,
      count: info.count,
    }))
    .filter((t) => t.count > 0);
}
