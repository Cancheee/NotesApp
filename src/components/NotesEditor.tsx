import Editor from "@monaco-editor/react";
import { useNotesStore } from "../Store/NotesStore";
import { useEffect, useState } from "react";
import { writeTextFile, BaseDirectory, readTextFile } from "@tauri-apps/plugin-fs";
import { useDarkModeStore } from "../Store/DarkModeStore";

function NotesEditor() {
  const darkMode = useDarkModeStore((state) => state.darkMode);

  const dirFiles = "MyNotes";
  const selectedNote = useNotesStore((state) => state.selectedNote);
  const [text, setText] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (selectedNote) {
      const loadText = async () => {
        const fileText = await readTextFile(`${dirFiles}\\${selectedNote}.txt`,{baseDir: BaseDirectory.Document,});
        setText(fileText);
      };
      loadText();
    }
  }, [selectedNote]);

  useEffect(() => {
    if (selectedNote && text) {
      const saveText = setTimeout(async () => {
        setIsSaving(true);
        await writeTextFile(`${dirFiles}\\${selectedNote}.txt`, text, {
          baseDir: BaseDirectory.Document,
        });
        setIsSaving(false);
      }, 500);
      return () => clearTimeout(saveText);
    }
  }, [text, selectedNote, dirFiles]);

  return (
    <div className="w-full h-full p-1 rounded-lg shadow-xl backdrop-blur-lg transition-all duration-300">
      {selectedNote ? (
        <div className="relative w-full h-full">
          <Editor
            theme={darkMode ? "vs-dark" : "vs"}
            value={text}
            language="markdown"
            className={`w-full h-full rounded-md overflow-hidden`}
            options={{
              fontSize: 16,
              fontFamily: "Monaco",
              wordWrap: "on",
              scrollBeyondLastLine: false,
              minimap: { enabled: false },
              padding: { top: 16, bottom: 16 },
            }}
            onChange={(value) => setText(value || "")}
          />
          {isSaving && (
            <div className="absolute top-4 right-4 text-yellow-400 text-sm">
              Guardando...
            </div>
          )}
        </div>
      ) : (
        <div
          className={`flex flex-col items-center justify-center h-full ${
            darkMode ? "text-gray-300" : "text-black"
          }`}
        >
          <span className="text-5xl opacity-50 mb-3 transition-opacity hover:opacity-80">
            📄
          </span>
          <h1 className="text-lg font-medium opacity-75 transition-opacity hover:opacity-100">
            Selecciona una nota para empezar a editar
          </h1>
        </div>
      )}
    </div>
  );
}

export default NotesEditor;
