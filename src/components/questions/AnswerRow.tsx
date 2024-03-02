import { useState } from "react";

import { Draggable } from "react-beautiful-dnd";

import { Answer } from "@/utilities/types";
// import { answerService } from "@/services";
import { queryClient } from "@/utilities/queries";

interface Props {
  answer: Answer;
  currentAnswerId: string | null;
  setCurrentAnswerId: any;
  index: number;
}

export default function AnswerRow({
  answer,
  currentAnswerId,
  setCurrentAnswerId,
  index,
}: Props) {
  const [points, setPoints] = useState(answer.points);
  const [text, setText] = useState(answer.text);

  return (
    <Draggable draggableId={answer.id} index={index}>
      {(provided: any) => (
        <>
          {currentAnswerId !== answer.id && (
            <tr
              className="border border-b-1 group"
              ref={provided.innerRef}
              {...provided.dragHandleProps}
              {...provided.draggableProps}
            >
              <td className="p-2 text-center">
                {answer.points !== 0 ? (
                  <i className="fad fa-check-circle text-green-600"></i>
                ) : (
                  <i className="fad fa-circle text-gray-300"></i>
                )}
              </td>
              <td className="p-2">{text}</td>
              <td className="p-2 text-center">{answer.points}</td>
              <td className="p-1 text-center">
                <i
                  className="fad fa-edit text-gray-500 hidden group-hover:inline-block hover:text-green-500"
                  onClick={() => setCurrentAnswerId(answer.id)}
                ></i>
                <i
                  className="fad fa-times mx-2 text-gray-500 hidden group-hover:inline-block hover:text-red-500"
                  onClick={() => {
                    answerService.delete(answer.id).then(() =>
                      queryClient.invalidateQueries({
                        queryKey: ["questions"],
                      })
                    );
                  }}
                ></i>
              </td>
            </tr>
          )}
          {currentAnswerId === answer.id && (
            <tr
              className="border border-b-1 group"
              ref={provided.innerRef}
              {...provided.dragHandleProps}
              {...provided.draggableProps}
            >
              <td className="p-2" colSpan={4}>
                <div className="flex w-full">
                  <input
                    type="text"
                    className="p-1 flex-grow"
                    name="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                  <input
                    type="text"
                    className="p-1 mx-3 w-16"
                    name="text"
                    value={points}
                    onChange={(e) => setPoints(+e.target.value)}
                  />
                  <div className="rounded-b text-right">
                    <button
                      className="shadow rounded h-8 w-8 mr-3 bg-gray-100 hover:bg-gray-200"
                      onClick={() => {
                        setPoints(answer.points);
                        setText(answer.text);
                        setCurrentAnswerId(null);
                      }}
                    >
                      <i
                        className="fad fa-times text-xl relative"
                        style={{ top: "3px" }}
                      ></i>
                    </button>
                    <button
                      className="shadow rounded h-8 w-8 bg-gray-100 hover:bg-gray-200"
                      onClick={() => {
                        // answerService
                        //   .edit(answer.id, { points, text })
                        //   .then(() => {
                        //     setText(answer.text);
                        //     queryClient.invalidateQueries({
                        //       queryKey: ["questions"],
                        //     });
                        //     setCurrentAnswerId(null);
                        //   })
                        //   .catch((error) => console.error(error));
                      }}
                    >
                      <i
                        className="fad fa-check text-xl relative"
                        style={{ top: "3px" }}
                      ></i>
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          )}
        </>
      )}
    </Draggable>
  );
}
