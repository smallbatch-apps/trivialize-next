import { useState } from "react";
import { Question } from "@/utilities/types";
import { QuestionTypes, QuestionTypeLabels } from "@/utilities/enums";
// import { questionService } from "@/services/QuestionService";
import { queryClient } from "@/utilities/queries";

interface Props {
  question: Question;
}

export default function EditQuestionType({ question }: Props) {
  const [editing, setEditing] = useState(false);
  const [qid, setQid] = useState(question.id);
  const [qtype, setQtype] = useState(question.type);

  if (qid !== question.id) {
    setEditing(false);
    setQtype(question.type);
    setQid(question.id);
  }

  return (
    <div className="flex items-center w-full my-3">
      <div className="font-semibold flex-shrink w-16">Type</div>
      {!editing && (
        <div
          className="p-2 bg-white rounded-sm border border-white w-full hover:border-gray-300 cursor-pointer"
          onClick={() => setEditing(true)}
        >
          <span className="inline-block mr-5">
            {QuestionTypeLabels[question.type]}
          </span>
        </div>
      )}
      {editing && (
        <>
          <select
            name="type"
            className="p-2 border rounded-sm flex-grow text-sm"
            defaultValue={question.type}
          >
            <option value={QuestionTypes.Simple}>
              Simple Question with one Answer
            </option>
            <option value={QuestionTypes.MultipleChoice}>
              Multiple Choice Question
            </option>
            <option value={QuestionTypes.MultipleCorrect}>
              Multiple Correct Answers
            </option>
          </select>
          <div className="rounded-b text-right w-40 flex">
            <button
              className="tracking-wider bg-red-600 text-white rounded px-2 py-1 bg-gray-100 hover:bg-red-700 mx-3 w-28"
              onClick={() => {
                // questionService
                //   .edit(question.id, { type: qtype })
                //   .then(() => {
                //     queryClient.invalidateQueries({ queryKey: ["questions"] });
                //     setEditing(false);
                //   })
                //   .catch((error) => {
                //     console.log(error);
                //   });
              }}
            >
              <i
                className="fal fa-check text-xl relative mr-2"
                style={{ top: "3px" }}
              ></i>
              Save
            </button>
            <button
              className="h-8 w-8 text-gray-700 hover:text-gray-800"
              onClick={() => {
                setEditing(false);
                setQtype(question.type);
              }}
            >
              <i
                className="fal fa-times text-xl relative"
                style={{ top: "3px" }}
              ></i>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
