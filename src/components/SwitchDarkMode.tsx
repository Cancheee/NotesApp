import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useDarkModeStore } from "../Store/DarkModeStore";
import { useEffect } from "react";

export function SwitchDarkMode() {
  const darkMode = useDarkModeStore((state) => state.darkMode);
  const changeDarkMode = useDarkModeStore((state) => state.changeDarkMode);

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="dark-mode"
        checked={darkMode}
        onCheckedChange={changeDarkMode}
      />
      <Label htmlFor="dark-mode" className={`${darkMode ? "text-white" : "text-black"}`}>	
        Modo Oscuro
      </Label>
    </div>
  );
}
