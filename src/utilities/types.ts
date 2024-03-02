import { QuestionTypes, EventStatuses } from "./enums";

export type Answer = {
  id: string;
  text: string;
  points: number;
  sort: number;
};

export type Question = {
  id: string;
  type: 1 | 2 | 3;
  text: string;
  answers: Answer[];
  tags: Tag[];
  documents: Document[];
  companyId?: string;
};

export type QuestionType = {
  value: QuestionTypes;
  label: string;
};

export type Tag = {
  id: string;
  text: string;
};

export type Document = {
  id: string;
  location?: string;
  filename?: string;
  tempfile?: string;
  status?: number;
  title?: string;
};

export type OrderAnswer = {
  id: string;
  sort: number;
};

export type Event = {
  id: string;
  seriesId: string;
  description: string;
  location: string;
  startTime: Date;
  endTime: Date;
  status: EventStatuses;
};

export type Series = {
  id: string;
  companyId: string;
  name: string;
  description: string;
  promoImage: string;
  events?: Event[];
};
