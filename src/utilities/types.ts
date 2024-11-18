import { QuestionTypes, EventStatuses } from "./enums";

export type User = {
  id: string;
  name: string;
  email: string;
  company_id: string;
};

export type Answer = {
  id: string;
  text: string;
  points: number;
  question_id: string;
  sort: number;
};

export type Question = {
  id: string;
  type: QuestionTypes;
  text: string;
  answers: Answer[];
  tags: Tag[];
  documents: Document[];
  company_id: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  deletedAt: string | Date;
};

export type QuestionType = {
  value: QuestionTypes;
  label: string;
};

export type Tag = {
  id: string;
  text: string;
  icon: string;
  colour: string;
  icon_colour: string;
  icon_secondary_colour: string;
};

export type Document = {
  id: string;
  location?: string;
  filename?: string;
  tempfile?: string;
  status?: number;
  title?: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  deletedAt: string | Date;
};

export type OrderAnswer = {
  id: string;
  sort: number;
};

export type Event = {
  id: string;
  series_id: string;
  description: string;
  location: string;
  location_link: string;
  start_time: Date;
  end_time: Date;
  status: EventStatuses;
  rounds: Round[];
};

export type Round = {
  id: string;
  event_id: string;
  text: string;
  sort: number;
  tag_id: string;
  question_count: number;
  questions?: Question[];
};

export type QuestionRound = Round & { questions: Question[] };

export type Series = {
  id: string;
  name: string;
  description: string;
  promoImage: string;
  events?: Event[];
};

export type UserResponsePayload = {
  status: "ok" | "error";
  user: User;
};

export type QuestionsResponsePayload = {
  status: "ok" | "error";
  questions: Question[];
};

export type SeriesResponsePayload = {
  status: "ok" | "error";
  series: Series[];
};

export type TagResponsePayload = {
  status: "ok" | "error";
  tags: Tag[];
};
