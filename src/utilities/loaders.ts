import { clientGet } from "./queries";
import { TagResponsePayload, QuestionsResponsePayload } from "./types";
import { parseUser, parseQuestions, parseTags } from "./parsers";
import { useUserStore, useQuestionStore } from "@/store";

export async function loadUser() {
  const user = parseUser(await clientGet("user"));
  useUserStore.getState().setUser(user);
}

export async function loadQuestions() {
  const questionResponse = await clientGet("questions");
  const questionData: QuestionsResponsePayload = await questionResponse.json();
  const questions = parseQuestions(questionData);
  useQuestionStore.getState().setQuestions(questions);
}

export async function loadTags() {
  const tagResponse = await clientGet("tags");
  const tagData: TagResponsePayload = await tagResponse.json();
  const tags = parseTags(tagData);
  useQuestionStore.getState().setTags(tags);
}
