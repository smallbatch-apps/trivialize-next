import {
  User,
  UserResponsePayload,
  Question,
  QuestionsResponsePayload,
  Tag,
  TagResponsePayload,
} from "./types";

export function parseUser(payload: UserResponsePayload): User {
  return generalParser(payload.user);
}

export function parseQuestions(payload: QuestionsResponsePayload): Question[] {
  const questions = payload.questions;
  return questions.map(generalParser);
}

export function parseTags(payload: TagResponsePayload): Tag[] {
  const tags = payload.tags;
  return tags.map(generalParser);
}

const generalParser = (data: any) => {
  data.createdAt = new Date(data.createdAt);
  data.updatedAt = new Date(data.updatedAt);
  data.deletedAt = new Date(data.deletedAt);
  return data;
};
