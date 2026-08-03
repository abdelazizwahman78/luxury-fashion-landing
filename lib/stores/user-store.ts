import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type UserState = {
  name: string;
  email: string;
  isAuthenticated: boolean;
};

type UserStore = {
  user: UserState;
  setUser: (user: Partial<UserState>) => void;
  clearUser: () => void;
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

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: {
        name: "",
        email: "",
        isAuthenticated: false,
      },
      setUser: (user) => set((state) => ({ user: { ...state.user, ...user } })),
      clearUser: () => set({ user: { name: "", email: "", isAuthenticated: false } }),
    }),
    {
      name: "aurelia-user",
      storage: createJSONStorage(() => storage),
    },
  ),
);
