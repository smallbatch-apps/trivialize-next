import { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import NewAnswerForm from "./NewAnswerForm";

import { Question } from "@/utilities/types";
import { queryClient } from "@/utilities/queries";
// import { answerService } from "@/services";

import AnswerDragList from "./AnswerDragList";

interface Props {
  question: Question;
}

const reorder = (list: string[], startIndex: number, endIndex: number) => {
  const [removed] = list.splice(startIndex, 1);
  list.splice(endIndex, 0, removed);
  return list;
};

export default function AnswerList({ question }: Props) {
  const [sortOrder, setSortOrder] = useState(
    question.answers.map(({ id }) => id)
  );
  return (
    <table className="my-3 mx-3">
      <thead>
        <tr className="bg-gray-200">
          <th className="w-14"></th>
          <th className="text-left p-2">Answer</th>
          <th className="p-2 w-14">Pts</th>
          <th className="p-2 w-14"></th>
        </tr>
      </thead>

      {question.answers?.length === 0 && (
        <tbody>
          <tr className="border border-b-1">
            <td className="p-3" colSpan={3}>
              No answers currently
            </td>
          </tr>
        </tbody>
      )}
      <DragDropContext
        onDragEnd={async (result) => {
          const newSortOrder = reorder(
            sortOrder,
            result?.source!.index,
            result?.destination!.index
          );
          setSortOrder(newSortOrder);
          // await answerService.reorderAnswers(question.id, newSortOrder);
          queryClient.invalidateQueries("questions");
        }}
      >
        <Droppable droppableId="list">
          {(provided) => (
            <tbody ref={provided.innerRef} {...provided.droppableProps}>
              <AnswerDragList answers={question.answers} />
              {provided.placeholder}
            </tbody>
          )}
        </Droppable>
      </DragDropContext>
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
