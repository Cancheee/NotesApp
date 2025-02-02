import { twMerge } from "tailwind-merge";
import { useNotesStore } from "../Store/NotesStore";
import { readTextFile, remove, rename, copyFile, BaseDirectory } from "@tauri-apps/plugin-fs";
import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { useDarkModeStore } from "../Store/DarkModeStore";
import { useColorStore } from "../Store/ColorStore";
import { IconTrash } from '@tabler/icons-react';
import { IconPencil } from '@tabler/icons-react';
import { IconCopy } from '@tabler/icons-react';
import { toast } from "react-hot-toast";


interface Props {
  name: string;
}

function NotesItem({ name }: Props) {
  const dirFiles = "MyNotes";

  const darkMode = useDarkModeStore((state) => state.darkMode);
  const color = useColorStore((state) => state.color);

  const setSelectedNote = useNotesStore((state) => state.setSelectedNote);
  const selectedNote = useNotesStore((state) => state.selectedNote);
  const removeNoteName = useNotesStore((state) => state.removeNoteName);
  const addNoteName = useNotesStore((state) => state.addNoteName);

  useEffect(() => {
    async function getText() {
      if (selectedNote) {
        const text = await readTextFile(`${dirFiles}\\${selectedNote}.txt`, {
          baseDir: BaseDirectory.Document,
        });
      }
    }
    getText();
  }, [selectedNote]);

  const onDelete = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    await remove(`${dirFiles}\\${name}.txt`, { baseDir: BaseDirectory.Document }) 
    removeNoteName(name);
    setSelectedNote(null);

    toast.success("Nota Eliminada", {
      duration: 2000,
      position: "bottom-right",
      style: {
        background: darkMode ? "#202020" : "#fff",
        color: darkMode ? "#fff" : "#000",
      },
    });
  };

  const onCopy = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    await copyFile(`${dirFiles}\\${name}.txt`, `${dirFiles}\\${name}_copy.txt`, {
      fromPathBaseDir: BaseDirectory.Document,
      toPathBaseDir: BaseDirectory.Document,
    });
    addNoteName(`${name}_copy`);
    toast.success("Nota Duplicada", {
      duration: 2000,
      position: "bottom-right",
      style: {
        background: darkMode ? "#202020" : "#fff",
        color: darkMode ? "#fff" : "#000",
      },
    });
  }

  

  const onRename = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    let onEdit:boolean = true;
    e.preventDefault();
    await rename(`${dirFiles}\\${name}.txt`, `${dirFiles}\\${name}_nuevo.txt`, { 
      oldPathBaseDir: BaseDirectory.Document, 
      newPathBaseDir: BaseDirectory.Document 
    });
    removeNoteName(name);
    addNoteName(`${name}_nuevo`);
  }
  
  const colorClasses = {
    red: "from-red-600 to-red-900 hover:from-red-400 hover:to-red-600",
    orange: "from-orange-600 to-orange-900 hover:from-orange-400 hover:to-orange-600",
    yellow: "from-yellow-600 to-yellow-900 hover:from-yellow-400 hover:to-yellow-600",
    emerald: "from-emerald-600 to-emerald-900 hover:from-emerald-400 hover:to-emerald-600",
    blue: "from-blue-600 to-blue-900 hover:from-blue-400 hover:to-blue-600",
    purple: "from-purple-600 to-purple-900 hover:from-purple-400 hover:to-purple-600",
    rose: "from-rose-600 to-rose-900 hover:from-rose-400 hover:to-rose-600",
  };
  
  return (
    <Card
      className={twMerge(
        "py-4 px-5 rounded-lg shadow-lg cursor-pointer active:scale-95 outline-none border-none flex justify-between",
        darkMode
          ? selectedNote === name
            ? `bg-gradient-to-r ${colorClasses[color]} text-white font-semibold shadow-xl`
            : `hover:text-white bg-zinc-900 text-gray-300 hover:bg-gradient-to-r ${colorClasses[color] || ""}`
          : selectedNote === name
          ? `bg-gradient-to-r ${colorClasses[color]} text-white font-semibold shadow-xl`
          : `hover:text-black bg-gray-200 text-black hover:bg-gradient-to-r ${colorClasses[color] || ""}`
      )}
      onClick={() => setSelectedNote(name)}
    >
     
      <h1 className="text-sm font-medium truncate">{name}</h1>
      <div className="flex gap-2">
        <button onClick={onDelete}>
          <IconTrash stroke={2} size={20}  className={`hover:scale-110 ${darkMode ? "text-white" : "text-black"}`} />	
        </button>
        <button onClick={onCopy}>
          <IconCopy stroke={2} size={20}  className={`hover:scale-110 ${darkMode ? "text-white" : "text-black"}`} />	
        </button>
        {/* <button onClick={onRename}>
          <IconPencil stroke={2} size={20}  className={`hover:scale-110 ${darkMode ? "text-white" : "text-black"}`}/>
        </button> */}
      </div>
    </Card>
  );

}

export default NotesItem;
