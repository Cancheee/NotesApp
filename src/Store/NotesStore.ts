import { create } from "zustand";

interface NotesState {
    notesNames: string[]
    selectedNote: string | null
    addNoteName: (name: string) => void
    removeNoteName: (name: string) => void
    setNotesNames: (names: string[]) => void
    setSelectedNote: (name: string) => void
}

export const useNotesStore = create<NotesState>((set) => ({
    notesNames: [],
    selectedNote: null,
    addNoteName: (name) => 
        set((state) => ({ 
            notesNames: [...state.notesNames, name] 
        })),
    removeNoteName: (name) => 
        set((state) => ({ 
            notesNames: state.notesNames.filter((note) => note !== name) 
        })),
    setNotesNames: (names) => set({ notesNames: names }),
    setSelectedNote: (name) => set({ selectedNote: name })
}))