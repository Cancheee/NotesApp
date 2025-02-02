import { useState } from "react";
import { toast } from "react-hot-toast";
import { BaseDirectory, desktopDir, join } from "@tauri-apps/api/path";
import { writeTextFile } from '@tauri-apps/plugin-fs';
import { useNotesStore } from "@/Store/NotesStore";

import { useDarkModeStore } from "../Store/DarkModeStore";

function NotesForm() {
  const dirFiles = "MyNotes";
  const darkMode = useDarkModeStore((state) => state.darkMode);

  const [NotesName, setNotesName] = useState<string>("");
  const addNotesName = useNotesStore((state) => state.addNoteName);
  const NotesNames = useNotesStore((state) => state.notesNames);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!NotesName || NotesName === "") {
      toast.error("Escribe un nombre para la nota", {
        duration: 2000,
        position: "bottom-right",
        style: {
          background: darkMode ? "#202020" : "#fff",
          color: darkMode ? "#fff" : "#000",
        },
      });
      return;
    }

    // file already exists
    if (NotesNames.includes(NotesName)) {
      toast.error("La nota ya existe", {
        duration: 2000,
        position: "bottom-right",
        style: {
          background: darkMode ? "#202020" : "#fff",
          color: darkMode ? "#fff" : "#000",
        },
      });
      return;
    }

    await writeTextFile(`${dirFiles}\\${NotesName}.txt`, "", {
      baseDir: BaseDirectory.Document,
    });
    addNotesName(NotesName);
    setNotesName("");

    toast.success("Nota guardada", {
      duration: 2000,
      position: "bottom-right",
      style: {
        background: darkMode ? "#202020" : "#fff",
        color: darkMode ? "#fff" : "#000",
      },
    });
  };
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Escribe una nota"
        onChange={(e) => setNotesName(e.target.value)}
        className={`w-full border-none outline-none p-4 rounded-lg ${darkMode ? "text-white bg-zinc-900" : "text-black bg-gray-200"} `}	
        autoFocus
        value={NotesName}
      />
    </form>
  );
}

export default NotesForm;