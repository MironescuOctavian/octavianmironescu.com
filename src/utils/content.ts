export interface Frontmatter {
  title: string;
  description?: string | undefined;
  pubDate: Date;
  updatedDate?: Date | undefined;
  heroImage?: string | undefined;
}

export interface MarkdownPost {
  locale: string;
  slug: string;
  id: string;
  data: Frontmatter;
  body: string;
}

function parseFrontmatter(raw: string): { data: Frontmatter; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    return {
      data: {
        title: "",
        pubDate: new Date(),
      },
      body: raw,
    };
  }

  const yamlBlock = match[1] ?? "";
  const body = match[2] ?? "";
  const data: Record<string, any> = {};

  for (const line of yamlBlock.split(/\r?\n/)) {
    const colonIndex = line.indexOf(":");
    if (colonIndex !== -1) {
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      data[key] = value;
    }
  }

  return {
    data: {
      title: data["title"] || "",
      description: data["description"],
      pubDate: data["pubDate"] ? new Date(data["pubDate"]) : new Date(),
      updatedDate: data["updatedDate"] ? new Date(data["updatedDate"]) : undefined,
      heroImage: data["heroImage"],
    },
    body,
  };
}

const blogFiles = import.meta.glob<string>("../content/blog/**/*.{md,mdx}", {
  query: "?raw",
  import: "default",
  eager: true,
});

export function getBlogPosts(): MarkdownPost[] {
  const posts: MarkdownPost[] = [];
  for (const [path, raw] of Object.entries(blogFiles)) {
    // path format: ../content/blog/{locale}/{slug}.md
    const relative = path.replace(/^..\/content\/blog\//, "").replace(/\.(md|mdx)$/, "");
    const parts = relative.split("/");
    const locale = parts[0] || "en";
    const slug = parts.slice(1).join("/");
    const { data, body } = parseFrontmatter(raw);
    posts.push({
      locale,
      slug,
      id: `${locale}/${slug}`,
      data,
      body,
    });
  }
  return posts;
}

const legalFiles = import.meta.glob<string>("../content/legal/**/*.{md,mdx}", {
  query: "?raw",
  import: "default",
  eager: true,
});

export function getLegalPolicies(): MarkdownPost[] {
  const posts: MarkdownPost[] = [];
  for (const [path, raw] of Object.entries(legalFiles)) {
    const relative = path.replace(/^..\/content\/legal\//, "").replace(/\.(md|mdx)$/, "");
    const parts = relative.split("/");
    const locale = parts[0] || "en";
    const slug = parts.slice(1).join("/");
    const { data, body } = parseFrontmatter(raw);
    posts.push({
      locale,
      slug,
      id: `${locale}/${slug}`,
      data,
      body,
    });
  }
  return posts;
}
