import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDarkModeStore } from "../Store/DarkModeStore";
import { useColorStore } from "../Store/ColorStore";
import { load, Store } from "@tauri-apps/plugin-store";

export function SelectColor() {
  const darkMode = useDarkModeStore((state) => state.darkMode);
  const setColor = useColorStore((state) => state.setColor);
  const [selectedColor, setSelectedColor] = useState<string>("");
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
      const loadColor = async () => {
        const storedColor = await store.get<string>("appColor");
        if (storedColor) {
          setColor(storedColor);
          setSelectedColor(storedColor);
        }
      };
      loadColor();
    }
  }, [store, setColor]);

  const handleChange = async (value: string) => {
    if (store) {
      setSelectedColor(value);
      setColor(value);
      await store.set("appColor", value);
      await store.save();
    }
  };

  return (
    <Select value={selectedColor} onValueChange={handleChange}>
      <SelectTrigger
        className={`w-[180px] ${
          darkMode ? "bg-neutral-950 text-white" : "bg-white text-black"
        } border-none ${darkMode ? "border-gray-200" : "border-black"}`}
      >
        <SelectValue placeholder="Selecciona un color" />
      </SelectTrigger>
      <SelectContent
        className={`${
          darkMode ? "bg-neutral-950 text-white" : "bg-white text-black"
        }`}
      >
        <SelectGroup>
          <SelectLabel>Color</SelectLabel>
          <SelectItem value="red">Rojo</SelectItem>
          <SelectItem value="orange">Naranja</SelectItem>
          <SelectItem value="yellow">Amarillo</SelectItem>
          <SelectItem value="emerald">Verde</SelectItem>
          <SelectItem value="blue">Azul</SelectItem>
          <SelectItem value="purple">Morado</SelectItem>
          <SelectItem value="rose">Rosa</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
