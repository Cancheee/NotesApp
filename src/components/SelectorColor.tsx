import * as React from "react";
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

export function SelectColor() {
  const darkMode = useDarkModeStore((state) => state.darkMode);
  const setColor = useColorStore((state) => state.setColor);
  const [selectedColor, setSelectedColor] = React.useState<string>("");

  const handleChange = (value: string) => {
    setSelectedColor(value);
    setColor(value);
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
