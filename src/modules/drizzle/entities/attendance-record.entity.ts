import { date, integer, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';
import { churchesTable } from './church.entity';

const timestamps = {
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).$onUpdate(
    () => new Date(),
  ),
};

export const attendanceTable = pgTable('attendance_table', {
  id: uuid('id').defaultRandom().primaryKey(),
  churchId: uuid('church_id')
    .notNull()
    .references(() => churchesTable.id),
  date: date('date', { mode: 'date' }).notNull(),
  attendance: integer('number_of_attendees').notNull(),
  ...timestamps,
});

export type NewAttendance = typeof attendanceTable.$inferInsert;
export type Attendance = typeof attendanceTable.$inferSelect;
