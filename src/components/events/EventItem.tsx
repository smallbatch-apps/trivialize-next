import { Event, Round } from "@/utilities/types";
import { formatDate, formatEventTime } from "@/utilities/utils";
import ButtonSmall from "../forms/ButtonSmall";
import Icon from "../layout/Icon";
import NewRoundForm from "./NewRoundForm";
import EditEvent from "./EditEvent";
import { Reorder } from "framer-motion";
import Link from "next/link";
import { useRef, useState, useMemo, useEffect } from "react";

interface Props {
  event: Event;
}

{
  /* <div className="flex-grow flex flex-col gap-6">
          <h2 className="">Event Details</h2>
          <div>asdf</div>

          {event.rounds.map((r) => (
            <></>
          ))}
        </div> */
}

const getRoundOrder = (rounds: Round[]) => {
  return rounds.reduce((acc, item: Round) => {
    acc.push(item.id);
    return acc;
  }, [] as string[]);
};

export default function EventItem({ event }: Props) {
  const rounds = event.rounds ?? [];

  const [sortedRounds, setSortedRounds] = useState<Round[]>(rounds);

  const roundOrder = useMemo(() => getRoundOrder(rounds).join(","), [rounds]);
  const sortedRoundOrder = useMemo(
    () => getRoundOrder(sortedRounds).join(","),
    [sortedRounds]
  );

  console.log(roundOrder, sortedRoundOrder);

  // useEffect(() => {}, []);

  const dragContainer = useRef(null);
  return (
    <div className="flex-grow flex flex-col gap-5">
      <EditEvent event={event} />
      {event.id}
      <Link
        href={`/manage/${event.id}`}
        className="flex justify-between border rounded p-3 items-center"
      >
        Manage Questions
        <Icon type="fas" icon="chevron-right" />
      </Link>

      <div className="flex flex-col gap-3">
        <h4 className="text-xl font-oswald text-blue-400">Rounds</h4>
        <div className="border rounded" ref={dragContainer}>
          <Reorder.Group
            values={sortedRounds}
            onReorder={setSortedRounds}
            className="flex flex-col divide-y"
            dragConstraints={dragContainer}
          >
            {sortedRounds.length === 0 && (
              <div className="p-3">No rounds - add rounds to continue</div>
            )}
            {sortedRounds.map((r) => (
              <Reorder.Item value={r} key={r.id} className="p-3 cursor-pointer">
                {r.text}
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </div>
        <div>
          <NewRoundForm event={event} />
        </div>
      </div>
    </div>
  );
}
