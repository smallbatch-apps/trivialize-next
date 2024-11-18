"use client";

import {
  useState,
  useReducer,
  useEffect,
  Fragment,
  createElement,
} from "react";
import { useQuery } from "@tanstack/react-query";
import {
  seriesQuery,
  eventQuery,
  questionsQuery,
  clientPut,
  tagsQuery,
  questionRoundsQuery,
} from "@/utilities/queries";
import { useParams } from "next/navigation";
import type { Event, Question, Round, Tag } from "@/utilities/types";
import { useQuestionStore } from "@/store";
import {
  planningReducer,
  initialPlanningState,
  PlanAction,
} from "@/utilities/reducers";
// import { motion, PanInfo } from "framer-motion";
import Icon from "../layout/Icon";
import { set } from "date-fns";

export default function EventQuestions() {
  const questions = useQuestionStore((s) => s.questions);
  const tags = useQuestionStore((s) => s.tags);
  const params = useParams();

  const [filterTags, setFilterTags] = useState<string[]>([]);
  const [showTags, setShowTags] = useState<boolean>(false);
  const [dropIndex, setDropIndex] = useState<number>(0);
  const eventId = params.id as string;

  const [state, dispatch] = useReducer(planningReducer, initialPlanningState);

  const { data: event, isFetched: eventIsFetched } = useQuery({
    queryKey: ["event", eventId],
    queryFn: async () => await eventQuery(eventId),
  });

  useQuery({
    queryKey: ["question_rounds", eventId],
    queryFn: async () => await questionRoundsQuery(eventId),
    select: (payload: Round[]) => {
      if (!state.rqReady) {
        dispatch({ type: PlanAction.LoadQuestionRounds, payload });
      }
      return payload;
    },
  });

  const autoFillRounds = async () => {
    const alreadyUsedIds: string[] = [];
    const availableQuestions = questions.filter(
      (q) => !state.usedQuestionIds.includes(q.id)
    );
    state.questionRounds.forEach((round) => {
      const roundQuestions = round.questions ?? [];
      if (roundQuestions.length >= round.question_count) return;

      const remainingQuestions = availableQuestions.filter((q) => {
        const qTags = q.tags ?? [];
        const hasTag = qTags.some((t) => t.id === round.tag_id);

        return !alreadyUsedIds.includes(q.id) && hasTag;
      });

      const wantedSliceLength = round.question_count - roundQuestions.length;
      const sliceLength = Math.min(
        wantedSliceLength,
        remainingQuestions.length
      );
      const useQuestions = remainingQuestions.slice(0, sliceLength);
      alreadyUsedIds.push(...useQuestions.map((q) => q.id));

      dispatch({
        type: PlanAction.MoveManyQuestions,
        payload: { questions: useQuestions, roundId: round.id },
      });
    });
  };

  const handleDrop = (
    event: React.DragEvent<HTMLDivElement>,
    question: Question
  ) => {
    const dropZone = event.currentTarget as HTMLElement;

    if (dropZone) {
      console.log("Dropped inside a valid round");

      const roundId: string = dropZone.getAttribute("data-round-id") ?? "";

      // const thisQuestionRound = state.questionRounds.find(
      //   (r) => r.id === roundId
      // );
      // const theseQuestions = thisQuestionRound?.questions ?? [];

      // if (theseQuestions.some((q) => q.id === question.id)) {
      //   setTimeout(() => {
      //     draggedElement.style.pointerEvents = "all";
      //     draggedElement.style.transform = "translate(0px, 0px)";
      //   }, 2000);
      //   return;
      // }
      dispatch({
        type: PlanAction.MoveQuestion,
        payload: { question, roundId, index: dropIndex },
      });
    }
  };

  const addHoverClasses = (draggableElement: HTMLElement) => {
    draggableElement.classList.add("bg-blue-100", "border-blue-400");

    const questions = draggableElement.querySelectorAll(".question-item");
    questions.forEach((el) => el.classList.add("bg-blue-50"));
  };

  const removeHoverClasses = (draggableElement: HTMLElement) => {
    draggableElement.classList.remove("bg-blue-100", "border-blue-400");

    const questions = draggableElement.querySelectorAll(".question-item");
    questions.forEach((el) => el.classList.remove("bg-blue-50"));
  };

  const toggleFilterTag = (tagId: string) => {
    if (filterTags.includes(tagId)) {
      setFilterTags((prev) => prev.filter((t) => t !== tagId));
    } else {
      setFilterTags((prev) => [...prev, tagId]);
    }
  };
  const clearFilterTags = () => setFilterTags([]);

  useEffect(() => {
    setFilterTags(tags.map((t) => t.id));
  }, [tags]);

  if (!state.rqReady || !questions.length || !eventIsFetched) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex gap-6">
      <div className="w-1/2 flex flex-col gap-6">
        <h2 className="font-oswald text-blue-400 text-xl">Questions</h2>

        {showTags && (
          <div className="grid grid-cols-5 gap-2">
            {tags.map((tag) => {
              return (
                <div
                  onClick={() => toggleFilterTag(tag.id)}
                  key={tag.id}
                  className={
                    "p-3 text-sm border flex flex-col gap-1 items-center rounded cursor-pointer" +
                    (filterTags.includes(tag.id) ? " bg-blue-100" : "")
                  }
                >
                  <Icon
                    icon={tag.icon}
                    size="3x"
                    primaryColour={tag.icon_colour}
                    secondaryColour={tag.icon_secondary_colour}
                  />
                  {tag.text}
                </div>
              );
            })}
            <div></div>
            <div
              className="p-2 border flex gap-2 items-center justify-center cursor-pointer"
              onClick={clearFilterTags}
            >
              <Icon icon="ban" type="fas" className="text-gray-500" />
              Clear
            </div>
          </div>
        )}
        {!showTags && (
          <div className="cursor-pointer" onClick={() => setShowTags(true)}>
            Filter by tags
          </div>
        )}
        {showTags && (
          <div className="cursor-pointer" onClick={() => setShowTags(false)}>
            Hide filtered tags
          </div>
        )}

        <div
          className="drop-zone flex p-3 flex-col gap-2" // Default Tailwind styling
          data-round-id="questions"
          onDrop={(e) => {
            const question: Question = JSON.parse(
              e.dataTransfer.getData("question")
            );
            console.log("Dropped in the questions zone");
            handleDrop(e, question);
            const questions =
              e.currentTarget.querySelectorAll(".question-item");
            questions.forEach((el) =>
              el.classList.remove("pointer-events-none")
            );
          }}
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={(e) => {
            e.stopPropagation();
            addHoverClasses(e.currentTarget as HTMLElement);
            const questions =
              e.currentTarget.querySelectorAll(".question-item");
            questions.forEach((el) => el.classList.add("pointer-events-none"));
          }}
          onDragLeave={(e) => {
            e.stopPropagation();
            removeHoverClasses(e.currentTarget as HTMLElement);
            const questions =
              e.currentTarget.querySelectorAll(".question-item");
            questions.forEach((el) =>
              el.classList.remove("pointer-events-none")
            );
          }}
        >
          {questions
            .filter((q) => {
              const hasQ = !state.usedQuestionIds.includes(q.id);
              const qTags = q.tags ?? [];
              const intersection = qTags
                .map((t) => t.id)
                .filter((t) => filterTags.includes(t));
              const showByString = q.text.toLowerCase().includes("olympics");
              return hasQ && intersection.length > 0 && !showByString;
            })
            .map((question) => (
              <div
                key={question.id}
                draggable="true"
                onDragStart={(e) => {
                  const draggableElement = e.target as HTMLElement;
                  draggableElement.style.opacity = "0.2";
                  e.dataTransfer.setData("question", JSON.stringify(question));
                }}
                onDragEnd={(e) => {
                  const draggableElement = e.target as HTMLElement;
                  draggableElement.style.opacity = "1";
                }}
                className="question-item p-2 bg-gray-50 border rounded"
              >
                {question.text}
              </div>
            ))}
        </div>
      </div>
      <div className="w-1/2">
        <h3 className="font-oswald text-blue-400 text-xl mb-5">
          {event?.description}
        </h3>
        <div className="flex flex-col gap-10">
          {state.questionRounds.map((round) => {
            const roundId = round.id;
            const tag = tags.find((t) => t.id === round.tag_id) ?? tags[0];

            return (
              <div className="flex flex-col gap-4" key={roundId}>
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-oswald text-blue-400 text-lg">
                      Round {round.sort} - {round.text}
                    </h3>
                    <p>Questions per round: {round.question_count}</p>
                  </div>
                  <Icon
                    icon={tag.icon}
                    size="3x"
                    primaryColour={tag.icon_colour}
                    secondaryColour={tag.icon_secondary_colour}
                  />
                </div>
                <div
                  key={roundId}
                  className="drop-zone flex flex-col gap-2 pointer-events-auto p-3 border flex flex-col gap-1 rounded"
                  data-round-id={roundId}
                  onDragEnter={(e: React.DragEvent<HTMLDivElement>) => {
                    e.stopPropagation();
                    addHoverClasses(e.currentTarget as HTMLElement);
                  }}
                  onDragOver={(e: React.DragEvent<HTMLDivElement>) =>
                    e.preventDefault()
                  }
                  onDragLeave={(e: React.DragEvent<HTMLDivElement>) => {
                    if (
                      e.target === e.currentTarget &&
                      !e.currentTarget.contains(e.relatedTarget as Node)
                    ) {
                      removeHoverClasses(e.currentTarget as HTMLElement);
                    }
                  }}
                  onDrop={(e: React.DragEvent<HTMLDivElement>) => {
                    const question: Question = JSON.parse(
                      e.dataTransfer.getData("question")
                    );
                    removeHoverClasses(e.currentTarget as HTMLElement);
                    handleDrop(e, question);
                    setDropIndex(0);
                    const spacers = e.currentTarget.querySelectorAll(".spacer");
                    spacers.forEach((spacer) => spacer.remove());
                  }}
                >
                  <div className="question-title p-2 font-semibold pointer-events-none">
                    Questions
                  </div>
                  {round.questions?.length === 0 && (
                    <div className="pointer-events-none question-item border p-2 bg-gray-50 text-center">
                      No questions - drag questions here to plan the round
                    </div>
                  )}
                  {round.questions?.map((question, index) => (
                    <div
                      key={question.id}
                      draggable="true"
                      onDragEnter={(e) => {
                        const target = e.currentTarget as HTMLElement;
                        const sibling = target.nextSibling as HTMLElement;
                        if (
                          !sibling ||
                          !sibling.className.startsWith("spacer")
                        ) {
                          const spacer = document.createElement("div");
                          spacer.className = "spacer h-1 bg-blue-300";
                          target.parentNode!.insertBefore(spacer, sibling);
                          setDropIndex(index + 1);
                        }
                      }}
                      onDragLeave={(e) => {
                        const target = e.currentTarget as HTMLElement;
                        const sibling = target.nextSibling as HTMLElement;
                        if (sibling && sibling.className.startsWith("spacer")) {
                          sibling.remove();
                        }
                        setDropIndex(0);
                      }}
                      onDragStart={(e) => {
                        const draggableElement = e.target as HTMLElement;
                        draggableElement.style.opacity = "0.2";
                        e.dataTransfer.setData(
                          "question",
                          JSON.stringify(question)
                        );
                      }}
                      onDragEnd={(e) => {
                        const draggableElement = e.target as HTMLElement;
                        draggableElement.style.opacity = "1";
                      }}
                      className={
                        "question-item p-2 bg-gray-50 border rounded flex gap-2" +
                        (index >= round.question_count ? " opacity-50" : "")
                      }
                    >
                      <div>{index + 1}.</div>
                      {question.text}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div
          className="p-3 border rounded bg-blue-400 mt-6 text-center text-white cursor-pointer"
          onClick={autoFillRounds}
        >
          <Icon icon="wand-magic" /> AutoFill Rounds
        </div>
      </div>
    </div>
  );
}
