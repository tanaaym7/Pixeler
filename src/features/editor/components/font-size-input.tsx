import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus } from "lucide-react";

interface FontSizeInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
}

const FontSizeInput = ({ value, onChange, min = 1 }: FontSizeInputProps) => {
  const increment = () => onChange(value + 1);
  const decrement = () => onChange(Math.max(min, value - 1));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue === "") {
      onChange(min);
    } else {
      const newValue = parseInt(inputValue, 10);
      onChange(isNaN(newValue) ? min : Math.max(min, newValue));
    }
  };

  return (
    <div className="flex items-center">
      <Button
        onClick={decrement}
        variant="outline"
        className="p-2 rounded-r-none border-r-0"
        size="icon"
      >
        <Minus className="size-4" />
      </Button>
      <Input
        onChange={handleChange}
        value={value}
        type="number"
        min={min}
        className="w-[50px] h-8 focus-visible:ring-offset-0 focus-visible:ring-0 rounded-none"
      />
      <Button
        onClick={increment}
        variant="outline"
        className="p-2 rounded-l-none border-l-0"
        size="icon"
      >
        <Plus className="size-4" />
      </Button>
    </div>
  );
};

export default FontSizeInput;
