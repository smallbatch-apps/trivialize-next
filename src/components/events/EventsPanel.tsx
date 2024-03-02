import { useQuery } from "@tanstack/react-query";
import { eventsQuery, seriesQuery } from "@/utilities/queries";

import SeriesList from "./SeriesList";

export default function EventsPanel() {
  const { data: events = [] } = useQuery({
    queryKey: ["events"],
    queryFn: eventsQuery,
  });
  const { data: series = [] } = useQuery({
    queryKey: ["series"],
    queryFn: seriesQuery,
  });

  return (
    <>
      <h1 className="font-oswald text-blue-400 text-4xl m-5 my-6">
        Manage Events
      </h1>

      <SeriesList series={series} events={events} />
    </>
  );
}
