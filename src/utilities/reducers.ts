import { createContext } from "react";
import { Tag, QuestionType } from "./types";

export type Action = { type: string | UserActions | FilterActions; payload: any };

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

export const LoginContext = createContext<IContextProps>({ state: defaultLoginState, dispatch: () => {} });
