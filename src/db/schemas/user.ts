import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'
import { posts } from './post';
import { relations } from 'drizzle-orm';

export const users = pgTable("users", {
    id: serial("id").primaryKey(),

    fullName: text("full_name").notNull(),
    email: text("email").unique().notNull(),
    username: text("username").unique().notNull(),
    passowrd: text("password").notNull(),

    role: text("role", { enum: ['user', 'admin'] }).default('user').notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export type User = typeof users.$inferSelect;
export type UserInsert = typeof users.$inferInsert;

export const userRelations = relations(users, ({ many }) => ({
    posts: many(posts)
}))