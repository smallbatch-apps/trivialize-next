import { useReducer } from "react";
import classNames from "classnames";

import { QuestionTypeLabels } from "@/utilities/enums";
import { Question, Tag, QuestionType } from "@/utilities/types";
import { filterReducer } from "@/utilities/reducers";

import Filter from "./Filter";

interface Props {
  tags: Tag[];
  questions: Question[];
  activeQuestion: string | null;
  setActiveQuestion: any;
}

const allQuestionTypes = Object.entries(QuestionTypeLabels).map(
  ([value, label]) => ({ value: +value, label })
);

export default function QuestionList({
  tags,
  questions,
  activeQuestion,
  setActiveQuestion,
}: Props) {
  let availableTags: string[] = questions
    .reduce((allTags, question) => {
      if (!question.tags) question.tags = [];
      allTags = [...allTags, ...question.tags];
      return allTags;
    }, [] as Tag[])
    .map((tag) => JSON.stringify(tag));

  let availableTagsUnique: Tag[] = Array.from(new Set([...availableTags]))
    .map((tag) => JSON.parse(tag))
    .sort((a, b) => {
      return a.text.localeCompare(b.text);
    });

  const [filters, dispatchFilters] = useReducer(filterReducer, {
    searchString: "",
    types: allQuestionTypes,
    tags,
  });

  const stringFilter = (question: Question) => {
    // return true;
    if (filters.searchString.length < 3) return true;
    return question.text.includes(filters.searchString);
  };

  const tagsFilter = (question: Question) => {
    if (filters.tags.length === 0) return true;
    const filterTagIds = filters.tags.map((tag: Tag) => tag.id);
    const questionTagIds = question.tags.map((tag: Tag) => tag.id);
    return filterTagIds.some((id: string) => questionTagIds.includes(id));
  };

  const typesFilter = (question: Question) => {
    return true;
    if (filters.types.length === 0) return true;
    const types = filters.types.map((type: QuestionType) => type.value);
    return types.includes(question.type);
  };

  const filteredQuestions = questions
    .filter(stringFilter)
    .filter(typesFilter)
    .filter(tagsFilter);

  return (
    <>
      <h1 className="font-oswald text-blue-400 text-4xl m-5 my-6">
        All Questions
      </h1>

      <Filter
        tags={availableTagsUnique}
        filters={filters}
        dispatchFilters={dispatchFilters}
      />

      <ul className="bg-white ml-3">
        {filteredQuestions.map((question) => {
          return (
            <li
              key={question.id}
              className={classNames(
                "p-3 border border-b-1 flex cursor-pointer group",
                {
                  "bg-gray-200 hover:bg-gray-300":
                    activeQuestion === question.id,
                  "hover:bg-gray-100": activeQuestion !== question.id,
                }
              )}
              onClick={() => setActiveQuestion(question.id)}
            >
              <div className="flex-grow">
                <p className="w-full font-semibold">{question.text}</p>
                <span className="inline-block mr-5">
                  {QuestionTypeLabels[question.type]}
                </span>

                <p className="inline-block mr-5">
                  {question.tags.length === 0 && <>No tags</>}
                  {question.tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="mr-2 text-xs border border-gray-300 rounded-full bg-gray-100 p-1 px-2 group-hover:bg-gray-300"
                    >
                      {tag.text}
                    </span>
                  ))}
                </p>
              </div>
              <div className="flex-shrink">
                <i className="fal fa-chevron-square-right"></i>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
