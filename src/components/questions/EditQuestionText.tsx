import { useState } from "react";
import { clientPatch } from "@/utilities/queries";
import { useForm } from "react-hook-form";
import { queryClient } from "../../app//providers";
import { Question } from "@/utilities/types";

interface Props {
  question: Question;
}

// interface EditQuestionFormFields {
//   points: number;
//   type: QuestionTypes;
//   text: string;
//   id: string;
// }

export default function EditQuestionText({ question }: Props) {
  const [editing, setEditing] = useState<boolean>(false);
  const [qid, setQid] = useState<string>(question.id);

  const { handleSubmit, register, reset } = useForm<Partial<Question>>({
    defaultValues: {
      text: question.text,
    },
  });

  const submitFn = async (payload: Partial<Question>) => {
    await clientPatch(`questions/${question.id}`, payload);
    queryClient.invalidateQueries({ queryKey: ["questions", question.id] });
    setEditing(false);
  };

  if (qid !== question.id) {
    setEditing(false);
    setQid(question.id);
  }

  return (
    <div className="my-3">
      {!editing && (
        <div
          className="p-2 bg-white rounded-sm border border-white hover:border-gray-300 cursor-pointer"
          onClick={() => setEditing(true)}
        >
          {question.text}
        </div>
      )}
      {editing && (
        <form onSubmit={handleSubmit(submitFn)} className="p-3">
          <textarea
            {...register("text")}
            className="p-2 bg-white rounded-sm border border-gray-300 w-full"
          ></textarea>
          <div className="rounded-b text-right flex justify-end items-center gap-2">
            <button
              type="submit"
              className="tracking-wider bg-red-600 text-white rounded-sm px-3 py-1 bg-gray-100 hover:bg-red-700 flex items-center gap-2"
            >
              <i className="fal fa-check text-xl"></i>
              Save
            </button>

            <button
              className="text-gray-700 hover:text-gray-900"
              onClick={() => {
                reset();
                setEditing(false);
              }}
            >
              <i className="fal fa-times text-xl relative"></i>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
