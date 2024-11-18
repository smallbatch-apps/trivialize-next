import { format, isSameSecond } from "date-fns";
import { Event } from "./types";

export const formatDate = (date: Date): string => format(date, "EEEE, do LLLL");

export const formatTime = (date: Date): string => format(date, "haaa");

export const formatEventTime = (event: Event): string => {
  if (isSameSecond(event.startTime, event.endTime)) {
    return format(event.startTime, "haaa");
  }
  return (
    format(event.startTime, "haaa") + " to " + format(event.endTime, "haaa")
  );
};
