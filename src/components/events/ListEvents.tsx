import { Event } from "@/utilities/types";

import EventItem from "./EventItem";

interface Props {
  events: Event[] | undefined;
}

export default function ListEvents({ events }: Props) {
  if (!events) return <div></div>;
  return (
    <div>
      {events.map((event) => (
        <EventItem event={event} key={event.id} />
      ))}
    </div>
  );
}
