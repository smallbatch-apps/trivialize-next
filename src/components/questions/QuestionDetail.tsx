import { Tag } from "@/utilities/types";

import EditQuestionText from "./EditQuestionText";
import EditQuestionTags from "./EditQuestionTags";
import EditQuestionType from "./EditQuestionType";
import QuestionDelete from "./QuestionDelete";
import Images from "./Images";
import AnswerList from "./AnswerList";
import { useQuery } from "@tanstack/react-query";
import { questionQuery } from "@/utilities/queries";

interface Props {
  activeQuestion: string;
  tags: Tag[];
}

export default function QuestionDetail({ activeQuestion, tags }: Props) {
  const { data: question } = useQuery({
    queryKey: ["questions", activeQuestion],
    queryFn: () => questionQuery(activeQuestion),
  });

  if (!question) {
    return (
      <div className="p-5">
        <p>Select a question on the left to get more informations here.</p>
      </div>
    );
  }
  return (
    <div className="w-full">
      <div className="p-5 ml-6 flex flex-col gap-6 sticky top-0 w-full">
        <div className="w-full">
          <h1 className="font-oswald text-blue-400 text-2xl">
            Question Details
          </h1>

          <EditQuestionText question={question} />
          <EditQuestionType question={question} />
          <EditQuestionTags question={question} tags={tags} />
        </div>

        <div className="w-full">
          <h2 className="font-oswald text-blue-400 text-xl">Images</h2>

          <Images question={question} />
        </div>

        <div className="w-full">
          <h2 className="font-oswald text-blue-400 text-xl">Answers</h2>
          <AnswerList question={question} />
        </div>

        <QuestionDelete question={question} />
      </div>
    </div>
  );
}
