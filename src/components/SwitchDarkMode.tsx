import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useDarkModeStore } from "../Store/DarkModeStore";
import { useEffect, useState } from "react";
import { Store } from "@tauri-apps/plugin-store";

export function SwitchDarkMode() {
  const darkMode = useDarkModeStore((state) => state.darkMode);
  const setDarkMode = useDarkModeStore((state) => state.setDarkMode);
  const [store, setStore] = useState<Store | null>(null);

  useEffect(() => {
    const loadStore = async () => {
      const storeInstance = await Store.load(".settings.dat");
      setStore(storeInstance);
    };
    loadStore();
  }, []);

  useEffect(() => {
    if (store) {
      const loadDarkMode = async () => {
        const storedDarkMode = await store.get<boolean>("darkMode");
        if (storedDarkMode !== null) {
          setDarkMode(storedDarkMode);
        }
      };
      loadDarkMode();
    }
  }, [store, setDarkMode]);

  const handleChange = async () => {
    if (store) {
      setDarkMode(!darkMode);
      await store.set("darkMode", !darkMode);
      await store.save();
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="dark-mode"
        checked={darkMode}
        onCheckedChange={handleChange}
      />
      <Label
        htmlFor="dark-mode"
        className={`${darkMode ? "text-white" : "text-black"}`}
      >
        Modo Oscuro
      </Label>
    </div>
  );
}
