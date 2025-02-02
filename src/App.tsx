import { Toaster, toast } from "react-hot-toast";
import "./App.css";
import NotesForm from "./components/NotesForm";
import NotesList from "./components/NotesList";
import NotesEditor from "./components/NotesEditor";
import { SwitchDarkMode } from "./components/SwitchDarkMode";
import { useDarkModeStore } from "./Store/DarkModeStore";
import { SelectColor } from "./components/SelectorColor";



function App() {
  const darkMode = useDarkModeStore((state) => state.darkMode);

  return (
    <div className={`h-screen grid grid-cols-12 ${darkMode ? "bg-neutral-950" : "bg-white"}`}>	
      {/* Sidebar */}
      <div className="col-span-3  h-screen p-6 space-y-2 flex flex-col">
        <h1 className={`text-2xl font-bold ${darkMode ? "text-white" : "text-black" }`}>Notas</h1>
        <div className="text-gray-400">Administra tus notas fácilmente</div>
        
        <div className="space-y-4 flex-1">
          <NotesForm />
          <NotesList />
        </div>

        {/* Switch Black Mode at the bottom */}
        <div className="mt-auto flex items-center space-x-2">
          <SwitchDarkMode />
          <SelectColor />
        </div>
      </div>

      {/* Main Content (Editor) */}
      <div className=" col-span-9 flex justify-center items-center p-6">
        <NotesEditor />
      </div>

      <Toaster />
    </div>
  );
}


export default App;
