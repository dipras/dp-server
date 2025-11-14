import { int, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

export const commentTable = mysqlTable("comments", {
    id: int("id").primaryKey().autoincrement(),
    name: varchar({length: 32}).notNull(),
    comment: text().notNull(),
    created_at: timestamp().notNull().defaultNow(),
    updated_at: timestamp().notNull().defaultNow()
})

