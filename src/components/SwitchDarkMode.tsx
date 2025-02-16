import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useDarkModeStore } from "../Store/DarkModeStore";
import { useEffect } from "react";
import { Store } from '@tauri-apps/plugin-store';

const store = await Store.load(".settings.dat");

export function SwitchDarkMode() {
  const darkMode = useDarkModeStore((state) => state.darkMode);
  const setDarkMode = useDarkModeStore((state) => state.setDarkMode);

  useEffect(() => {
    const loadColor = async () => {
      const storedDarkMode = await store.get<boolean>("darkMode");
      if (storedDarkMode !== null) {
        setDarkMode(storedDarkMode);
      }
    };
    loadColor();
  }, [setDarkMode]);

  const handleChange = async () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    await store.set("darkMode", newDarkMode);
    await store.save();
  };

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="dark-mode"
        checked={darkMode}
        onCheckedChange={handleChange}
      />
      <Label htmlFor="dark-mode" className={`${darkMode ? "text-white" : "text-black"}`}>
        Modo Oscuro
      </Label>
    </div>
  );
}
