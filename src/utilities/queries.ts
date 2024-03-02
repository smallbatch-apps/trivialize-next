import { QueryClient } from "@tanstack/react-query";

// import { questionService } from "@/services/QuestionService";
// import { eventService } from "@/services/EventService";
// import { seriesService } from "@/services/SeriesService";
// import { tagService } from "@/services/TagService";
import { Question, Tag, Event, Series } from "./types";

export const queryClient = new QueryClient();

export const questionsQuery = async (): Promise<Question[]> => {
  // const { data } = await questionService.getAll();
  return [];
};

export const tagsQuery = async (): Promise<Tag[]> => {
  // const { data } = await tagService.getAll();
  return [];
};

export const eventsQuery = async (): Promise<Event[]> => {
  // const { data } = await eventService.getAll();
  return [];
};

export const seriesQuery = async (): Promise<Series[]> => {
  // const { data } = await seriesService.getAll();
  return [];
};
