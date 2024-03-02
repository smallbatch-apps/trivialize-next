import { useState } from "react";

// import { questionService } from "@/services/QuestionService";
import { queryClient } from "@/utilities/queries";
import { Question } from "@/utilities/types";

interface Props {
  question: Question;
}

export default function EditQuestionText({ question }: Props) {
  const [editing, setEditing] = useState<boolean>(false);
  const [qid, setQid] = useState<string>(question.id);
  const [qtext, setQtext] = useState<string>(question.text);

  if (qid !== question.id) {
    setEditing(false);
    setQtext(question.text);
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
        <>
          <textarea
            onChange={(e) => setQtext(e.target.value)}
            value={qtext}
            className="p-2 bg-white rounded-sm border border-gray-300 w-full"
          ></textarea>
          <div className="rounded-b text-right flex justify-end">
            <button
              className="tracking-wider bg-red-600 text-white rounded px-2 py-1 bg-gray-100 hover:bg-red-700 w-28"
              onClick={() => {
                // questionService
                //   .edit(question.id, { text: qtext })
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
              className="h-8 w-8 ml-2 text-gray-700 hover:text-gray-900"
              onClick={() => {
                setEditing(false);
                setQtext(question.text);
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
