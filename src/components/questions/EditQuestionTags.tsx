import { FC, useState } from "react";
import { Question, Tag } from "../../utilities/types";
import Select from "react-select";

// import { questionService } from "../../services/QuestionService";
import { queryClient } from "../../utilities/queries";

type Props = {
  question: Question;
  tags: Tag[];
};

const EditQuestionTags: FC<Props> = ({ question, tags }) => {
  const [editing, setEditing] = useState<boolean>(false);
  const [qtags, setQtags] = useState<Tag[]>(question.tags);
  const [qid, setQid] = useState<string>(question.id);

  if (qid !== question.id) {
    setEditing(false);
    setQtags(question.tags);
    setQid(question.id);
  }

  return (
    <div className="flex items-center w-full my-3">
      <div className="font-semibold flex-shrink w-16">Tags</div>
      {!editing && (
        <div
          className="p-2 bg-white rounded-sm border border-white hover:border-gray-300 cursor-pointer flex-grow"
          onClick={() => setEditing(true)}
        >
          {question.tags.map((tag) => (
            <span
              key={tag.id}
              className="mr-2 text-xs border border-gray-300 rounded-full bg-gray-100 p-1 px-2 group-hover:bg-gray-300"
            >
              {tag.text}
            </span>
          ))}
        </div>
      )}
      {editing && (
        <>
          <Select
            options={tags}
            isMulti
            defaultValue={question.tags}
            name="tags"
            className="z-50 react-select flex-grow"
            classNamePrefix="react-select"
            getOptionLabel={({ text }: { text: string }) => text}
            getOptionValue={({ id }: { id: string }) => id}
            onChange={(value: Tag[]) => setQtags(value)}
          />
          <div className="rounded-b text-right w-40 flex">
            <button
              className="tracking-wider bg-red-600 text-white rounded px-2 py-1 bg-gray-100 hover:bg-red-700 mx-3 w-28"
              onClick={() => {
                // questionService
                //   .edit(question.id, { tags: qtags })
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
              className="h-8 w-8 text-700 hover:text-gray-900"
              onClick={() => {
                setEditing(false);
                setQtags(question.tags);
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
};

export default EditQuestionTags;
