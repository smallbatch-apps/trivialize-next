import { useRef, useState } from "react";
import { Reorder } from "framer-motion";

import { Answer } from "@/utilities/types";
import Button from "@/components/ui/Button";
import { clientPost } from "@/utilities/queries";
import { queryClient } from "../../app/providers";

interface Props {
  answers: Answer[];
  questionId: string;
  setSortable: (sortable: boolean) => void;
}

export default function AnswerDragList({
  answers,
  questionId,
  setSortable,
}: Props) {
  const [sortedAnswers, setSortedAnswers] = useState<Answer[]>(answers);
  const dragContainer = useRef(null);
  return (
    <div ref={dragContainer}>
      <Reorder.Group
        values={sortedAnswers}
        onReorder={setSortedAnswers}
        className="flex flex-col gap-1 mb-3"
        dragConstraints={dragContainer}
      >
        {sortedAnswers?.map((answer, index) => (
          <Reorder.Item value={answer} key={answer.id}>
            <div className="border flex p-3 gap-3 bg-white items-center">
              <i
                className={
                  answer.points > 0
                    ? "fad fa-check-circle text-green-600"
                    : "fad fa-circle text-gray-200"
                }
              ></i>
              <div className="flex-grow">{answer.text}</div>

              <i className="flex-shrink fal fa-grip-lines cursor-grab"></i>
            </div>
          </Reorder.Item>
        ))}
      </Reorder.Group>

      <div className="flex gap-2 items-center justify-end">
        <i
          className="fal fa-times cursor-pointer"
          onClick={() => setSortable(false)}
        ></i>
        <Button
          onClick={async () => {
            await clientPost("answers/sorting/" + questionId, {
              answer_ids: sortedAnswers.map((a) => a.id),
            });
            queryClient.invalidateQueries({
              queryKey: ["questions", questionId],
            });
            setSortable(false);
          }}
        >
          Save order
        </Button>
      </div>
    </div>
  );
}
