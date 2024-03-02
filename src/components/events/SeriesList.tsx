import { Series, Event } from "@/utilities/types";

import SeriesItem from "./SeriesItem";
import ListEvents from "./ListEvents";
import NewSeriesForm from "./NewSeriesForm";

interface Props {
  series: Series[];
  events: Event[];
}

export default function SeriesList({ series, events }: Props) {
  const formattedEvents = events.reduce((accumulator: any, item) => {
    if (!accumulator[item.seriesId]) accumulator[item.seriesId] = [];
    accumulator[item.seriesId].push(item);
    return accumulator;
  }, {});

  series = series.map((item) => {
    item.events = formattedEvents[item.id];
    return item;
  });

  return (
    <div>
      {series.map((item) => {
        return (
          <div key={item.id} className="flex gap-3">
            <SeriesItem series={item} />
            <ListEvents events={item.events} />
          </div>
        );
      })}

      <NewSeriesForm />
    </div>
  );
}
