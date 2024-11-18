import { FC, useState } from "react";
import { Question, Tag as TagType } from "../../utilities/types";
import Select, { MultiValue } from "react-select";
import { clientPost } from "@/utilities/queries";
import { useForm } from "react-hook-form";
import { queryClient } from "../../app//providers";
import Tag from "@/components/Tag";

type Props = {
  question: Question;
  tags: TagType[];
};

interface FormFields {
  tags: MultiValue<TagType>;
}

const EditQuestionTags: FC<Props> = ({ question, tags }) => {
  const [editing, setEditing] = useState<boolean>(false);
  const [qid, setQid] = useState<string>(question.id);

  const { handleSubmit, register, reset, setValue } = useForm<FormFields>({
    defaultValues: {
      tags: question.tags,
    },
  });

  if (qid !== question.id) {
    setEditing(false);
    setQid(question.id);
  }

  register("tags");

  const submitFn = async (payload: FormFields) => {
    const questionId = question.id;

    await clientPost("question_tags", {
      question_id: questionId,
      tag_ids: payload.tags.map((t) => t.id),
    });

    queryClient.invalidateQueries({ queryKey: ["questions", question.id] });
    setEditing(false);
  };

  return (
    <div className="flex items-center w-full my-3">
      <div className="font-semibold flex-shrink w-16">Tags</div>
      {!editing && (
        <div
          className="p-2 bg-white rounded-sm border border-white hover:border-gray-300 cursor-pointer flex-grow"
          onClick={() => setEditing(true)}
        >
          {question.tags.map((tag) => (
            <Tag key={tag.id}>{tag.text}</Tag>
          ))}
        </div>
      )}
      {editing && (
        <form onSubmit={handleSubmit(submitFn)} className="flex w-full">
          <Select
            options={tags}
            isMulti
            defaultValue={question.tags}
            name="tags"
            className="z-50 react-select flex-grow"
            classNamePrefix="react-select"
            getOptionLabel={({ text }: { text: string }) => text}
            onChange={(value) => setValue("tags", value)}
            getOptionValue={({ id }) => id}
          />
          <div className="rounded-b text-right w-40 flex">
            <button
              className="tracking-wider bg-red-600 text-white rounded px-2 py-1 bg-gray-100 hover:bg-red-700 mx-3 w-28"
              type="submit"
            >
              <i
                className="fal fa-check text-xl relative mr-2"
                style={{ top: "3px" }}
              ></i>
              Save
            </button>
            <button
              type="button"
              className="h-8 w-8 text-700 hover:text-gray-900"
              onClick={() => {
                reset();
                setEditing(false);
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
};

export default EditQuestionTags;
