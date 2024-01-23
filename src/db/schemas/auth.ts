import { relations, sql } from 'drizzle-orm';
import { bigint, mysqlTableCreator, varchar } from 'drizzle-orm/mysql-core';
import { text, integer, blob, sqliteTable } from "drizzle-orm/sqlite-core";
import { env } from '../../env.mjs';

export const tableNames = {
  users: 'users',
  keys: 'keys',
  sessions: 'sessions',
} as const;

export const users = sqliteTable(tableNames.users, {
  id: text('id', { length: 15 }).primaryKey(),
  username: text('username', { length: 39 }),
  name: text('name').notNull(),
  email: text('email').notNull(),
  emailVerified: integer('emailVerified', { mode: 'boolean' }).default(false),
});

export const keys = sqliteTable(tableNames.keys, {
  id: text('id', { length: 255 }).primaryKey(),
  userId: text('user_id', { length: 15 }).notNull(),
  hashedPassword: text('hashed_password', { length: 255 }),
});

export const keysRelations = relations(keys, ({ one }) => ({
  user: one(users, {
    fields: [keys.userId],
    references: [users.id],
  }),
}));

export const sessions = sqliteTable(tableNames.sessions, {
  id: text('id', { length: 128 }).primaryKey(),
  userId: text('user_id', { length: 15 }).notNull(),
  activeExpires: blob('active_expires', { mode: 'bigint' }).notNull(),
  idleExpires: blob('idle_expires', { mode: 'bigint' }).notNull(),
});

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

type UserColumns = typeof users._.columns;

export type UserAttributes = Omit<
  {
    [K in keyof UserColumns as UserColumns[K]['_']['notNull'] extends true
    ? UserColumns[K]['_']['name']
    : never]: UserColumns[K]['_']['data'];
  } & {
    [K in keyof UserColumns as UserColumns[K]['_']['notNull'] extends true
    ? never
    : UserColumns[K]['_']['name']]?: UserColumns[K]['_']['data'];
  },
  'id'
>;
