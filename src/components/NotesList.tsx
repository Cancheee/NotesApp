import React, { useState, useEffect } from "react";
import { writeTextFile, readDir, BaseDirectory } from "@tauri-apps/plugin-fs";
import NotesItem from "./NotesItem";
import { useNotesStore } from "../Store/NotesStore";
import { useDarkModeStore } from "../Store/DarkModeStore";

function NotesForm() {

  const darkMode = useDarkModeStore((state) => state.darkMode);
  

  const dirFiles = "MyNotes";
  const [fileName, setFileName] = useState("");
  const setNotesNames = useNotesStore((state) => state.setNotesNames);
  const notesNames = useNotesStore((state) => state.notesNames);

  useEffect(() => {
    async function getFiles() {
      try {
        const result = await readDir(dirFiles, {
          baseDir: BaseDirectory.Document,
        });
        const filenames = result.map((file) => file.name.split(".")[0]);
        setNotesNames(filenames);
      } catch (error) {
        console.error("Error al leer las notas:", error);
      }
    }
    getFiles();
  }, [setNotesNames]);

  return (
    <div>
      {notesNames.length > 0 ? (
        <div className="space-y-2 max-h-[470px] overflow-y-auto scrollbar-hide">
          {notesNames.map((name) => (
            <NotesItem name={name} key={name} />
          ))}
        </div>
      ) : (
        <p className={`text-center items-center ${darkMode ? "text-white" : "text-black"}`}>No hay notas aún.</p>
      )}
    </div>
  );
}

export default NotesForm;
