import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type LanguageStore = {
  language: string;
  setLanguage: (language: string) => void;
  toggleLanguage: () => void;
};

const storage = {
  getItem: (name: string) => {
    if (typeof window === "undefined") {
      return null;
    }

    const value = window.localStorage.getItem(name);
    return value ? JSON.parse(value) : null;
  },
  setItem: (name: string, value: string) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(name, value);
    }
  },
  removeItem: (name: string) => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(name);
    }
  },
};

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set, get) => ({
      language: "en",
      setLanguage: (language) => set({ language }),
      toggleLanguage: () => set({ language: get().language === "en" ? "fr" : "en" }),
    }),
    {
      name: "aurelia-language",
      storage: createJSONStorage(() => storage),
    },
  ),
);
