# Performance and console audit — 9 November 2026

## Scope and limits

Inspected the current local production build and the development server. Exercised home, blog index, a published article, resume, projects, contact, and privacy-policy routes, including client navigation; checked theme and Romanian locale switching and a 390px mobile viewport. Contact email delivery was not exercised: no messages were sent.

Asset measurements use the production Vite manifest. JavaScript totals include the entry, app layout, route, and their recursive static imports, counted once per cold page load. Gzip sizes are computed locally, not observed production network compression. They exclude HTML, CSS, fonts, images, API responses, third-party scripts, and additional runtime dynamic imports. Subsequent navigation reuses shared cached chunks.

This is not a Lighthouse score, a throttled mobile benchmark, or a real-user Core Web Vitals assessment. The preview tab was backgrounded; paint timings were visibly delayed by the inspection environment and are unsuitable for judging visitor loading speed. Do not interpret navigation-related layout-shift entries from programmatic clicks as a valid field CLS score. GPU/frame-time and battery costs need a visible device trace.

## Console fix

Navigating from home to `/en/legal/privacy-policy` reproduced a production `style-src-elem` CSP violation: the route created an inline `<style>` without the document nonce. Moved those unchanged rules into `src/styles/privacy.css`, imported by `src/Document.tsx`. No CSP permissions were relaxed. Rebuilt and repeated the same navigation: zero CSP violations, no inline style elements, and the privacy paragraph styles were applied (28px line height).

The previously fixed Blog → Home tooltip regression also remained absent in the checked navigation path. Runtime error, unhandled rejection, CSP violation, and console warn/error hooks were used during client navigation. This establishes the tested paths, not every possible CMS document, third-party failure, or form-submission response.

## Measured asset costs

| Cold page      | JS files |    JS raw |   JS gzip |
| -------------- | -------: | --------: | --------: |
| Home           |       14 | 337.6 KiB | 116.4 KiB |
| Projects       |       13 | 308.8 KiB | 109.1 KiB |
| Resume         |       12 | 321.9 KiB | 111.6 KiB |
| Blog index     |       15 | 417.9 KiB | 141.7 KiB |
| Blog article   |       15 | 414.6 KiB | 140.4 KiB |
| Contact        |       12 | 315.7 KiB | 111.3 KiB |
| Privacy policy |       14 | 414.8 KiB | 140.4 KiB |

- Global CSS after the console fix: 301,337 bytes raw / 50,565 bytes gzip (294.3 / 49.4 KiB). It contains six font-face definitions and about 205 embedded SVG icon occurrences. This does not prove all rules/icons are unused.
- Two font resources were observed on home: 76,224 bytes combined (74.4 KiB). Six font assets are emitted, but that does **not** mean every visitor downloads all six. Unicode subsetting determines which files load.
- One home document response was 162,003 bytes before compression (158.2 KiB). Locale, CMS content, and viewport can change it.
- Home had approximately 1,160 DOM elements; the decorative code panels contributed 340. On the projects page, those same decorative elements were roughly half the DOM (676 elements in one mobile observation).
- Home had about 23 persistent CSS animations at desktop size and 11 at mobile size. This is an inventory, not a measured FPS failure.
- Resume loads the original 2176 × 4608 JPEG: 10,027,008 source pixels, displayed at roughly 284px square in the sampled desktop layout. The source has ample detail; it is oversized for delivery. Its cross-origin byte size was not established by this audit.
- Production-preview CMS API calls in local logs were around 0.5 seconds in several observations. These use a local Worker with remote D1 and are not deployed-region latency measurements.
- A home navigation had a roughly 94ms response-start time and 1.08s load event in the local environment. Those are individual observations, not stable benchmarks or a claim about production visitors.

## Optimization order — proposals, not implemented

### 1. Deliver responsive portrait variants

Generate square crops at approximately 320, 640, and 960px using WebP/AVIF with a JPEG fallback or automatic content negotiation. Supply `srcset`, `sizes`, explicit dimensions, and preserve the current focal point. Keep the above-fold portrait eager; only add high fetch priority if it is the measured LCP element. Cloudflare Images is already declared as a binding, but verify the actual delivery transformation configuration first.

**Preserves:** the larger portrait, its sharpness on high-density displays, and current card design. Likely the clearest resume-specific bandwidth and image-decode saving; exact bytes must be measured after encoding.

### 2. Reduce decoration's DOM and hydration cost

Keep both large terminals and their slow scrolling, but pre-render their highlighted content as SVG assets or a more compact static representation. The current token-by-token markup produces 340 elements on every page. Two crisp external SVG code textures can preserve the visual while avoiding hundreds of hydrated nodes. Keep labels decorative and hidden from assistive technology.

Pause decorative animations when the document is hidden and when their section is offscreen; pause the home technology orbits/marquee below the fold. Preserve reduced-motion support. Keep animation on transform/opacity, limit large blurred layers, and add compositor hints only after a trace proves they help. Slowing an animation alone does not guarantee fewer frames or lower rendering cost.

**Preserves:** background code, amber lighting, motion, hero icons, and marquee. Validate on a midrange phone; animation count alone cannot predict GPU cost.

### 3. Stop public pages inheriting avoidable CMS/UI code

The blog index's static dependency closure includes the roughly 107 KiB raw / 31 KiB gzip `BlockRenderer` chunk, although the index renders its own cards. Inspect the CMS solid export graph and use a supported narrower delivery-data entry point, or split data delivery from rendering in the package if required. Keep the full renderer for actual articles and privacy content.

The largest shared chunk is about 126.5 KiB raw / 45.8 KiB gzip; the app-layout chunk is about 52.7 / 16.2 KiB. Chunk names such as `RLButton` do not establish that a single button costs the entire chunk: shared utilities can be grouped there. Use a bundle graph before choosing a fix.

Load infrequently used shortcut/help/modal interfaces on demand where that does not delay core navigation. The CMS dashboard is a dynamic route; its emitted ~283 KiB JS file is not evidence it downloads on every public page. Do not count all build output as a page's transfer cost.

**Preserves:** all controls, routing, CMS articles, and dashboard access. Keep admin/editor code out of public critical paths; avoid arbitrary manual chunking without evidence.

### 4. Tighten CSS and font delivery

Use browser coverage across all routes, hover/focus states, themes, locales, and CMS block types to identify unused CSS. Review local UnoCSS scanning and safelist scope so public CSS does not absorb avoidable dashboard styles/icons. Prefer supported plugin configuration; do not purge dynamic CMS icons blindly.

Keep the fonts actually used. Verify whether serif styles are ever displayed before removing that family; preserve Romanian/Portuguese glyph coverage. Preload only a genuinely critical font subset, not every emitted font. Existing font-face declarations already use `font-display: swap`.

**Preserves:** typography, icons, localization, and dynamic content. The target is a smaller critical stylesheet, not an unvalidated percentage reduction.

### 5. Cache public CMS data safely

Cache public delivery responses with keys including locale, collection/slug, category, and pagination. Use short TTLs and publication invalidation; bypass authenticated and draft-preview requests. Avoid refetching the same public records when returning to a route if a fresh resolved result is already available. Do not cache unresolved Solid hydration promises across requests.

Do not blindly cache nonce-bearing or personalized HTML. Optimize the public data layer first. Measure D1 query spans and indexes before changing database design; the audit did not prove slow queries or missing indexes.

**Preserves:** publishing freshness, previews, categories, translations, and security.

### 6. Scope third-party work to the feature using it

Turnstile currently loads in the document head on every route. Load it on the contact route when a site key is configured, using explicit widget lifecycle management so client navigation, token expiry, retries, and cleanup still work. Retain server-side verification.

The GitHub contribution graphic is already lazy loaded. Consider fetching/caching it through a controlled endpoint or scheduled asset with a bounded refresh interval and a graceful fallback, retaining attribution and respecting the upstream service. This removes an unpredictable browser dependency without removing the calendar.

**Preserves:** contact spam protection and live GitHub activity; no contact submissions were made to test email delivery.

### 7. Reserve layout space and verify caching/compression on deployment

Maintain explicit image dimensions or aspect ratios for blog/project images and the contribution chart; inspect async-loading placeholders for shifts. Keep content stable while CMS requests resolve. Some images already have aspect-ratio classes, so change only measured gaps.

Verify Brotli/gzip and immutable caching for fingerprinted assets on the deployed Cloudflare path. Local preview transferred uncompressed assets, which is not evidence production compression is disabled. Avoid preloading every route or merging everything into one bundle; retain shared cache reuse and route splitting.

## Acceptance criteria for an approved optimization pass

1. Baseline and repeat cold/warm production loads of home, resume, projects, blog index/article, and contact under the same mobile network/CPU conditions. Test both themes and Romanian text.
2. Record transfer bytes, LCP element/timing, CLS session window, interaction latency, long tasks, and visible animation frame traces. Check form/Turnstile flow without sending an unsolicited real message.
3. Target field p75 LCP ≤2.5s, INP ≤200ms, CLS ≤0.1, segmented by mobile and desktop. A Lighthouse lab score alone is not a field pass.
4. Recheck navigation, project/package links, CMS categories/articles, locale/theme persistence, forms, reduced motion, and zero unexpected console/CSP errors.
5. Compare before/after measurements. Set byte and CPU budgets after the first measured pass; do not promise 100/100 scores or a speedup percentage in advance.

## Primary references

- [Google: Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals)
- [web.dev: Web Vitals and field measurement](https://web.dev/articles/vitals)
- [web.dev: High-performance CSS animations](https://web.dev/articles/animations-guide)
- [Cloudflare: Responsive image delivery](https://developers.cloudflare.com/images/optimization/make-responsive-images/)

Machine-readable size measurements are in `performance-measurements.json`; the route chart is in `performance-audit.html`.
