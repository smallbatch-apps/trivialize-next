import { create } from "zustand";

import { Question, User, Series, Tag } from "@/utilities/types";

export interface UserSlice {
  user: User;
  loggedIn: boolean;
  setUser: (user: User) => void;
  login: () => void;
  logout: () => void;
}

export const useUserStore = create<UserSlice>((set) => {
  return {
    user: {} as User,
    loggedIn: false,
    setUser: (user) => set({ user }),
    login: () => set({ loggedIn: true }),
    logout: () => set({ loggedIn: true }),
  };
});

export interface DataSlice {
  questions: Question[];
  series: Series[];
  tags: Tag[];
  setQuestions: (questions: Question[]) => void;
  setSeries: (series: Series[]) => void;
  setTags: (tags: Tag[]) => void;
}

export const useQuestionStore = create<DataSlice>((set) => {
  return {
    questions: [],
    series: [],
    tags: [],
    setQuestions: (questions) => set({ questions }),
    setSeries: (series) => set({ series }),
    setTags: (tags) => set({ tags }),
  };
});
