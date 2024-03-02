import { nextTuesday, subWeeks, setMinutes, setHours, format } from "date-fns";

import { EventStatuses } from "@/utilities/enums";

const tues3 = setMinutes(nextTuesday(new Date()), 0);
const tues2 = subWeeks(tues3, 1);
const tues1 = subWeeks(tues3, 2);

export const rawSeries = [
  {
    name: "Sportsman Tuesday Trivia",
    description:
      "Trivia every Tuesday night from 8pm at Sportsman Bar, Sukhumvit Soi 13",
    events: [
      {
        description: `Tuesday Night Trivia - ${format(tues1, "MMMM do")}`,
        startTime: setHours(tues1, 19),
        endTime: setHours(tues1, 21),
        status: EventStatuses.Published,
      },
      {
        description: `Tuesday Night Trivia - ${format(tues2, "MMMM do")}`,
        startTime: setHours(tues2, 19),
        endTime: setHours(tues2, 21),
        status: EventStatuses.Published,
      },
      {
        description: `Tuesday Night Trivia - ${format(tues3, "MMMM do")}`,
        startTime: setHours(tues3, 19),
        endTime: setHours(tues3, 21),
        status: EventStatuses.Draft,
      },
    ],
  },
];
