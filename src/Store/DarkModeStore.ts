import { create } from "zustand";

interface DarkModeState {
  darkMode: boolean;
  changeDarkMode: () => void;
}

export const useDarkModeStore = create<DarkModeState>((set) => ({
  darkMode: false,
  changeDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
}));
