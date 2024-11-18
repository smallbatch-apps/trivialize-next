import { createContext } from "react";
import {
  Tag,
  QuestionType,
  Question,
  Round,
  Event,
  QuestionRound,
} from "./types";
import { clientPut } from "./queries";
import { queryClient } from "@/app/providers";

export type Action = {
  type: string | UserActions | FilterActions | PlanAction;
  payload: any;
};

export enum UserActions {
  SetUser = "SET_USER",
  UpdateUser = "UPDATE_USER",
  ClearUser = "CLEAR_USER",
}

interface IContextProps {
  state: ILoginState;
  dispatch: ({ type, payload }: { type: string; payload: any }) => void;
}

export interface IFilterState {
  searchString: string;
  tags: Tag[];
  types: QuestionType[];
}

export interface ILoginState {
  user: string | null;
  token: string | null;
  loggedIn: boolean;
}

export const defaultLoginState = { user: null, token: null, loggedIn: false };

export const loginReducer = (state = defaultLoginState, action: Action) => {
  switch (action.type) {
    case UserActions.ClearUser:
      return defaultLoginState;
    case UserActions.SetUser:
      return { ...action.payload };
    case UserActions.UpdateUser:
      return { ...state, ...action.payload };
    default:
      return { ...state };
  }
};

export enum FilterActions {
  SetSearchString = "SET_SEARCHSTRING",
  SetAllTags = "SET_TAGS",
  AddTag = "ADD_TAG",
  RemoveTag = "REMOVE_TAG",
  SetAllTypes = "SET_TYPES",
  AddType = "ADD_TYPE",
  RemoveType = "REMOVE_TYPE",
}

export const filterReducer = (state: IFilterState, action: Action) => {
  switch (action.type) {
    case FilterActions.SetSearchString:
      return { ...state, searchString: action.payload };
    case FilterActions.SetAllTags:
      return { ...state, tags: action.payload };
    case FilterActions.AddTag:
      return { ...state };
    case FilterActions.RemoveTag:
      return { ...state };
    case FilterActions.SetAllTypes:
      return { ...state, types: action.payload };
    case FilterActions.AddType:
      return { ...state };
    default:
      return state;
  }
};

export const LoginContext = createContext<IContextProps>({
  state: defaultLoginState,
  dispatch: () => {},
});

export interface IPlanningState {
  sortedRounds: Record<string, Question[]>;
  questionRounds: Round[];
  allQuestions: Record<string, Question>;
  usedQuestionIds: string[];
  rqReady: boolean;
}

export enum PlanAction {
  LoadQuestions = "LOAD_QUESTIONS",
  LoadEvent = "LOAD_EVENT",
  LoadQuestionRounds = "LOAD_QUESTION_ROUNDS",
  MoveQuestionToRound = "MOVE_QUESTION_TO_ROUND",
  MoveQuestionFromRound = "MOVE_QUESTION_FROM_ROUND",
  MoveQuestion = "MOVE_QUESTION",
  MoveManyQuestions = "MOVE_MANY_QUESTIONS",
  LoadFilterTags = "LOAD_FILTER_TAGS",
}

export const initialPlanningState = {
  sortedRounds: {},
  sortedQuestions: [],
  usedQuestionIds: [],
  questionRounds: [],
  allQuestions: {},
  filterTagIds: [],
  event: null,
  rqHasEvent: false,
  rqHasQuestions: false,
  rqHasRounds: false,
  rqReady: false,
};

const calcIndex = (
  actionIndex: number,
  existingIndex: number,
  length: number
) => {
  if (actionIndex === 0 && existingIndex === -1) {
    return length;
  }
  if (actionIndex === 0 && existingIndex >= 0) {
    return length - 1;
  }
  if (actionIndex !== 0 && existingIndex === -1) {
    return actionIndex;
  }
  // if (actionIndex !== 0 && existingIndex > actionIndex) {
  //   return actionIndex;
  // }
  if (actionIndex !== 0 && existingIndex < actionIndex) {
    return actionIndex - 1;
  }
  return actionIndex;
};

export const planningReducer = (
  state: IPlanningState,
  action: Action
): IPlanningState => {
  let rqReady = false;
  let toRoundId = "";
  let questionId = "";
  let sortedQuestions = [];
  let sortedRounds = {};

  switch (action.type) {
    // case PlanAction.LoadQuestions:
    //   rqReady = state.rqHasEvent && state.rqHasRounds;
    //   const allQuestions = action.payload.reduce(
    //     (acc: Record<string, Question>, q: Question) => {
    //       acc[q.id] = q;
    //       return acc;
    //     },
    //     {} as Record<string, Question>
    //   );
    //   return {
    //     ...state,
    //     sortedQuestions: action.payload,
    //     rqHasQuestions: true,
    //     allQuestions,
    //     rqReady,
    //   };
    // case PlanAction.LoadFilterTags:
    //   const filterTagIds = action.payload.map((t: Tag) => t.id);
    //   return {
    //     ...state,
    //     filterTagIds,
    //   };
    // case PlanAction.LoadEvent:
    //   rqReady = state.rqHasQuestions && state.rqHasRounds;
    //   return {
    //     ...state,
    //     event: action.payload,
    //     rqHasEvent: true,
    //     rqReady,
    //   };
    case PlanAction.LoadQuestionRounds:
      const usedInitialQuestionIds: string[] = action.payload.reduce(
        (acc: string[], round: Round) => {
          if (!round.questions) return acc;
          return [...acc, ...round.questions.map((q) => q.id)];
        },
        []
      );
      return {
        ...state,
        usedQuestionIds: usedInitialQuestionIds,
        questionRounds: action.payload,
        rqReady: true,
      };
    case PlanAction.MoveManyQuestions:
      toRoundId = action.payload.roundId;
      console.log("action.payload.questions", action.payload.questions);
      // questionRounds
      const moveManyQuestionRounds = state.questionRounds.map((r) => {
        if (r.id !== toRoundId) return r;
        if (!r.questions) r.questions = [];
        r.questions = [...r.questions, ...action.payload.questions];
        return r;
      });

      // const moveManyRoundQuestionIds: string[] = [];

      const qRound = state.questionRounds.find((r) => r.id === toRoundId);

      const moveManyRoundQuestionIds =
        qRound?.questions?.map((q) => q.id) ?? [];

      const moveUsedQuestionIds = new Set([
        ...state.usedQuestionIds,
        ...moveManyRoundQuestionIds,
      ]);

      clientPut(`question_rounds/${toRoundId}`, {
        question_ids: moveManyRoundQuestionIds,
      }).then(() => {
        queryClient.invalidateQueries({
          queryKey: ["question_rounds", state.questionRounds[0]?.event_id!],
        });
      });

      return {
        ...state,
        questionRounds: moveManyQuestionRounds,
        usedQuestionIds: [...moveUsedQuestionIds],
      };
    case PlanAction.MoveQuestion:
      // console.log("MoveQuestion", action.payload);
      toRoundId = action.payload.roundId;
      const usedQuestionIds = new Set(state.usedQuestionIds);
      const roundQuestionIds: Record<string, string[]> = {};

      usedQuestionIds.add(action.payload.question.id);

      if (toRoundId === "questions") {
        usedQuestionIds.delete(action.payload.question.id);
      }

      const questionRounds = state.questionRounds.map((r) => {
        const questions = r.questions ?? [];
        const updatedQuestions = [...questions];

        if (r.id !== toRoundId && !questions.length) {
          return r;
        }

        if (r.id === toRoundId) {
          const questionAlreadyExists = questions.findIndex(
            (q) => q.id === action.payload.question.id
          );

          const finalQuestions = updatedQuestions.filter((q) => {
            if (questionAlreadyExists === -1) return true;
            return q.id !== action.payload.question.id;
          });

          const insertIndex = calcIndex(
            action.payload.index,
            questionAlreadyExists,
            finalQuestions.length
          );

          finalQuestions.splice(insertIndex, 0, action.payload.question);
          roundQuestionIds[toRoundId] = finalQuestions.map((q) => q.id);

          return {
            ...r,
            questions: finalQuestions,
          };
        } else {
          if (questions.find((q) => q.id === action.payload.question.id)) {
            roundQuestionIds[r.id] = questions
              .filter((q) => q.id !== action.payload.question.id)
              .map((q) => q.id);
          }
          return {
            ...r,
            questions: questions.filter(
              (q) => q.id !== action.payload.question.id
            ),
          };
        }
      });

      const updatePromises = Object.entries(roundQuestionIds).map(
        ([roundId, question_ids]) => {
          return clientPut(`question_rounds/${roundId}`, { question_ids });
        }
      );

      Promise.all(updatePromises).then(() => {
        queryClient.invalidateQueries({
          queryKey: ["question_rounds", state.questionRounds[0]?.event_id!],
        });
      });

      return {
        ...state,
        usedQuestionIds: [...usedQuestionIds],
        questionRounds,
      };

    case PlanAction.MoveQuestionFromRound:
      sortedQuestions = [state.allQuestions[questionId]];
      sortedRounds = Object.entries(state.sortedRounds).reduce(
        (acc, [roundId, questions]) => {
          if (!acc[toRoundId]) acc[toRoundId] = [];
          if (roundId !== toRoundId) {
            acc[roundId] = questions.filter((q) => q.id !== questionId);
          }
          return acc;
        },
        {} as Record<string, Question[]>
      );
      return { ...state, sortedRounds };
    default:
      return { ...state };
  }
};
