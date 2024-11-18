import { useState } from "react";
import { Question } from "@/utilities/types";
import { QuestionTypes, QuestionTypeLabels } from "@/utilities/enums";
import { clientPatch } from "@/utilities/queries";
import { useForm } from "react-hook-form";
import { queryClient } from "../../app//providers";

interface Props {
  question: Question;
}

export default function EditQuestionType({ question }: Props) {
  const [editing, setEditing] = useState(false);
  const [qid, setQid] = useState(question.id);

  const { handleSubmit, register, reset } = useForm<Partial<Question>>({
    defaultValues: {
      type: question.type,
    },
  });

  if (qid !== question.id) {
    setEditing(false);
    setQid(question.id);
  }

  const submitFn = async (payload: Partial<Question>) => {
    await clientPatch(`questions/${question.id}`, payload);
    queryClient.invalidateQueries({ queryKey: ["questions", question.id] });
    setEditing(false);
  };

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
        <form onSubmit={handleSubmit(submitFn)} className="flex w-full">
          <select
            className="p-2 border rounded-sm flex-grow text-sm"
            {...register("type", { valueAsNumber: true })}
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
            <option value={QuestionTypes.TrueFalse}>True or False</option>
          </select>
          <div className="rounded-b text-right w-40 flex flex-shrink">
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
                reset();
              }}
            >
              <i
                className="fal fa-times text-xl relative"
                style={{ top: "3px" }}
              ></i>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
