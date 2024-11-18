"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { seriesQuery, eventQuery } from "@/utilities/queries";

import ButtonSmall from "@/components/forms/ButtonSmall";
import Icon from "@/components/layout/Icon";
import EditSeries from "./EditSeries";
import NewSeriesForm from "./NewSeriesForm";
import NewEventForm from "./NewEventForm";

import EventItem from "./EventItem";

export default function SeriesList() {
  const [eventId, setEventId] = useState<string>("");
  const { data: series = [] } = useQuery({
    queryKey: ["series"],
    queryFn: seriesQuery,
  });

  const { data: event = null } = useQuery({
    queryKey: ["events", eventId],
    queryFn: async () => {
      const getEvent = await eventQuery(eventId);
      return getEvent;
    },
    enabled: !!eventId,
  });

  return (
    <div className="w-full flex gap-5">
      <div className="flex-grow">
        {series.map((s) => {
          const events = s.events ?? [];
          return (
            <div className="border rounded p-6 flex flex-col gap-5" key={s.id}>
              <EditSeries series={s} />

              <div className="flex flex-col gap-2">
                <h4 className="text-xl font-oswald text-blue-400">Events</h4>
                <div className="divide-y border">
                  {events.map((e) => (
                    <div
                      className="p-2 cursor-pointer hover:bg-gray-100"
                      key={e.id}
                      onClick={() => setEventId(e.id)}
                    >
                      {e.description} - {new Date(e.start_time).toDateString()}
                    </div>
                  ))}
                </div>
                <div>
                  <NewEventForm series={s} />
                </div>
              </div>
            </div>
          );
        })}
        <div>
          <NewSeriesForm />
        </div>
      </div>

      {eventId && event && <EventItem event={event} />}
    </div>
  );
}
