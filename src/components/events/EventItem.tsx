import { Event } from "@/utilities/types";
import { formatDate, formatEventTime } from "@/utilities/utils";

interface Props {
  event: Event;
}

const statuses = ["", "Draft", "Published", "Completed"];

export default function EventItem({ event }: Props) {
  return (
    <div className="flex justify-between">
      <div>
        {formatEventTime(event)} - {formatDate(event.endTime)}
      </div>
      <div>{statuses[event.status]}</div>
    </div>
  );
}
