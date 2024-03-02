import {
  pgTable,
  uuid,
  smallint,
  varchar,
  timestamp,
  boolean,
  text,
} from "drizzle-orm/pg-core";

import { relations } from "drizzle-orm";

const id = uuid("id").defaultRandom().primaryKey();
const createdAt = timestamp("created_at").defaultNow();
const updatedAt = timestamp("updated_at").defaultNow();

export const answers = pgTable("answers", {
  id,
  text: text("text"),
  points: smallint("points").default(0),
  sort: smallint("sort").default(0),
  createdAt,
  updatedAt,
  questionId: uuid("question_id")
    .notNull()
    .references(() => questions.id),
});

export const answerRelations = relations(answers, ({ one }) => ({
  question: one(questions, {
    fields: [answers.questionId],
    references: [questions.id],
  }),
}));

export const questions = pgTable("questions", {
  id,
  companyId: uuid("company_id"),
  text: text("text"),
  type: smallint("type").default(0),
  createdAt,
  updatedAt,
});

export const questionRelations = relations(answers, ({ one, many }) => ({
  answers: many(answers),
}));

export const companies = pgTable("companies", {
  id,
  name: varchar("name", { length: 256 }),
  createdAt,
  updatedAt,
});

export const companyRelations = relations(companies, ({ many }) => ({
  users: many(users),
  questions: many(questions),
  series: many(series),
}));

export const documents = pgTable("documents", {
  id,
  title: varchar("title", { length: 256 }),
  location: text("location"),
  tempfile: text("tempfile"),
  filename: text("filename"),
  public: boolean("public").notNull().default(false),
  status: smallint("status").default(0),
  createdAt,
  updatedAt,
  questionId: uuid("question_id")
    .notNull()
    .references(() => questions.id),
});

export const documentRelations = relations(documents, ({ one, many }) => ({
  question: one(questions, {
    fields: [documents.questionId],
    references: [questions.id],
  }),
}));

export const events = pgTable("events", {
  id,
  description: text("description"),
  location: text("location"),
  status: smallint("status").default(0),
  createdAt,
  updatedAt,
  seriesId: uuid("series_id")
    .notNull()
    .references(() => series.id),
});

export const eventRelations = relations(events, ({ one }) => ({
  series: one(series, {
    fields: [events.seriesId],
    references: [series.id],
  }),
}));

export const series = pgTable("series", {
  id,
  name: varchar("name", { length: 256 }),
  description: text("description"),
  promoImage: text("promo_image"),
  companyId: uuid("company_id")
    .notNull()
    .references(() => companies.id),
  createdAt,
  updatedAt,
});

export const seriesRelations = relations(series, ({ one, many }) => ({
  events: many(events),
}));

export const users = pgTable("users", {
  id,
  name: varchar("name", { length: 256 }),
  email: varchar("email", { length: 256 }).unique(),
  password: varchar("email", { length: 256 }),
  companyId: uuid("company_id")
    .notNull()
    .references(() => companies.id),
  createdAt,
  updatedAt,
});

export const userRelations = relations(users, ({ one, many }) => ({
  company: one(companies, {
    fields: [users.companyId],
    references: [companies.id],
  }),
}));

export const tags = pgTable("tags", {
  id: uuid("id").defaultRandom().primaryKey(),
  text: varchar("text", { length: 256 }),
  icon: varchar("icon", { length: 256 }),
  colour: varchar("colour", { length: 8 }),
  iconColour: varchar("iconColour", { length: 8 }),
  iconSecondary: varchar("iconColour", { length: 8 }),
  createdAt,
  updatedAt,
});

export const tagRelations = relations(tags, ({ many }) => ({
  questions: many(companies),
}));
