import { sqliteTable, text, integer, uniqueIndex } from "drizzle-orm/sqlite-core";

export const searchIndex = sqliteTable(
  "search_index",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    sourceType: text("source_type").notNull(),
    sourceId: text("source_id").notNull(),
    title: text("title").notNull(),
    url: text("url").notNull(),
    bodyContent: text("body_content").notNull(),
    searchableText: text("searchable_text").notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" })
      .$defaultFn(() => new Date())
      .notNull(),
  },
  (t) => [uniqueIndex("search_index_source_type_source_id_key").on(t.sourceType, t.sourceId)],
);

export type SearchIndex = typeof searchIndex.$inferSelect;
export type NewSearchIndex = typeof searchIndex.$inferInsert;
