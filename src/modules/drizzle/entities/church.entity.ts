import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';

const timestamps = {
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).$onUpdate(
    () => new Date(),
  ),
};

export const churchesTable = pgTable('churhches_table', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  ...timestamps,
});

export type NewChurch = typeof churchesTable.$inferInsert;
export type Church = typeof churchesTable.$inferSelect;
