import { Question, Tag } from "@/utilities/types";

import EditQuestionText from "./EditQuestionText";
import EditQuestionTags from "./EditQuestionTags";
import EditQuestionType from "./EditQuestionType";
import QuestionDelete from "./QuestionDelete";
import Images from "./Images";
import AnswerList from "./AnswerList";

interface Props {
  question: Question | null;
  tags: Tag[];
}

export default function QuestionDetail({ question, tags }: Props) {
  if (!question) {
    return (
      <div className="p-5">
        <p>Select a question on the left to get more informations here.</p>
      </div>
    );
  }
  return (
    <div className="p-5">
      <div className="m-3">
        <h1 className="font-oswald text-blue-400 text-2xl">Question Details</h1>

        <EditQuestionText question={question} />
        <EditQuestionTags question={question} tags={tags} />
        <EditQuestionType question={question} />

        <Images question={question} />
      </div>

      <AnswerList question={question} />
      <QuestionDelete question={question} />
    </div>
  );
}
