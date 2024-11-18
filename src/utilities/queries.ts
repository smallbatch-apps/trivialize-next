import { Question, Tag, Event, Series, Round } from "./types";

const headers = {
  "Content-Type": "application/json",
};

const host = process.env.NEXT_PUBLIC_LOCAL_API_HOST;

export async function clientGet(
  url: string,
  params?: Record<string, any> | undefined
) {
  const query = params ? "?" + new URLSearchParams(params).toString() : "";
  // prevent double slash in url
  if (url.startsWith("/")) url = url.slice(1);

  let res;
  try {
    return await fetch(host + url + query, { method: "GET", headers });
  } catch (error) {
    console.log(error);
    return;
  }
  return res;
}

export function clientPost(url: string, data: Record<string, any>) {
  return fetch(host + url, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });
}

export function clientPatch(url: string, data: Record<string, any>) {
  return fetch(host + url, {
    method: "PATCH",
    headers,
    body: JSON.stringify(data),
  });
}

export function clientPut(url: string, data: Record<string, any>) {
  return fetch(host + url, {
    method: "PUT",
    headers,
    body: JSON.stringify(data),
  });
}

export function clientDelete(url: string) {
  return fetch(host + url, { method: "DELETE", headers });
}

export const questionsQuery = async (): Promise<Question[]> => {
  const questionsRequest = await clientGet("questions");

  const { questions } = await questionsRequest.json();
  return questions;
};

export const questionQuery = async (id: string): Promise<Question> => {
  const questionRequest = await clientGet(`questions/${id}`);
  const { question } = await questionRequest.json();
  return question;
};

export const tagsQuery = async (): Promise<Tag[]> => {
  const request = await clientGet("tags");
  const { tags } = await request.json();
  return tags;
};

export const seriesQuery = async (): Promise<Series[]> => {
  const request = await clientGet("series");
  const { series } = await request.json();
  return series;
};

export const eventQuery = async (id: string): Promise<Event> => {
  const request = await clientGet(`events/${id}`);
  const { event } = await request.json();
  return event;
};

export const questionRoundsQuery = async (id: string): Promise<Round[]> => {
  const request = await clientGet(`question_rounds/${id}`);
  const { rounds } = await request.json();
  return rounds;
};
