import { useState } from "react";

import AnswerRow from "./AnswerRow";

import { Answer } from "@/utilities/types";

interface Props {
  answers: Answer[];
}

export default function AnswerDragList({ answers }: Props) {
  const [currentAnswerId, setCurrentAnswerId] = useState(null);
  return (
    <>
      {answers?.map((answer, index) => (
        <AnswerRow
          key={answer.id}
          answer={answer}
          currentAnswerId={currentAnswerId}
          setCurrentAnswerId={setCurrentAnswerId}
          index={index}
        />
      ))}
    </>
  );
}
