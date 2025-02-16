import { create } from "zustand";

interface DarkModeState {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

export const useDarkModeStore = create<DarkModeState>((set) => ({
  darkMode: false,
  setDarkMode: (value) => set({ darkMode: value }),
}));
