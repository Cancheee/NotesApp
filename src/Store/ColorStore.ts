import { create } from "zustand";

interface ColorState {
  color: string;
  setColor: (color: string) => void;
}

export const useColorStore = create<ColorState>((set) => ({
  color: "red",
  setColor: (color) => set({ color }),
}));
