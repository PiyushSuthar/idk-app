import { relations } from "drizzle-orm";
import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./user";

export const posts = pgTable("posts", {
    id: serial("id").primaryKey(),

    title: text("title").notNull(),
    body: text("body").notNull(),

    authorId: integer("author_id").notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Post = typeof posts.$inferSelect;
export type PostInsert = typeof posts.$inferInsert;

export const postRelations = relations(posts, ({ one }) => ({
    author: one(users, {
        fields: [posts.authorId],
        references: [users.id]
    })
}))