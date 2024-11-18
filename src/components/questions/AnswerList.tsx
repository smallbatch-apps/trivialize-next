import { useState } from "react";

import NewAnswerForm from "./NewAnswerForm";
import AnswerRow from "./AnswerRow";
import AnswerDragList from "./AnswerDragList";

import { Question } from "@/utilities/types";

interface Props {
  question: Question;
}

export default function AnswerList({ question }: Props) {
  if (!question.answers) question.answers = [];
  const [sortable, setSortable] = useState(false);

  const [currentAnswerId, setCurrentAnswerId] = useState<string | null>(null);

  if (sortable) {
    return (
      <AnswerDragList
        answers={question.answers}
        questionId={question.id}
        setSortable={setSortable}
      />
    );
  }

  return (
    <table className=" w-full">
      <thead>
        <tr className="bg-gray-200">
          <th className="w-14"></th>
          <th className="text-left p-2">Answer</th>
          <th className="p-2 w-14">Pts</th>
          <th className="p-2 w-14"></th>
        </tr>
      </thead>
      <tbody>
        {question.answers?.length === 0 && (
          <tr className="border border-b-1">
            <td className="p-3" colSpan={3}>
              No answers currently
            </td>
          </tr>
        )}
        {question.answers?.map((answer, index) => (
          <AnswerRow
            key={answer.id}
            answer={answer}
            index={index}
            questionId={question.id}
            currentAnswerId={currentAnswerId}
            setCurrentAnswerId={setCurrentAnswerId}
          />
        ))}
        {question.answers?.length > 1 && (
          <tr>
            <td className="p-2" colSpan={4}>
              <button
                className="p-2 bg-gray-200 rounded-sm"
                onClick={() => setSortable(true)}
              >
                Sort Answers
              </button>
            </td>
          </tr>
        )}
      </tbody>

      <tfoot>
        <tr>
          <td className="p-2" colSpan={4}>
            <NewAnswerForm question={question} />
          </td>
        </tr>
      </tfoot>
    </table>
  );
}
