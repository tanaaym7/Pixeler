import { ChromePicker, CirclePicker } from "react-color";
import { colors } from "../types";
import { rgbaObjectToString } from "../utils";

interface ColorPickerProps {
  value: string;
  onColorChange: (color: string) => void;
}

const ColorPicker = ({ value, onColorChange }: ColorPickerProps) => {
  return (
    <div>
      <ChromePicker
        color={value}
        onChange={(color) => {
          const formatedColor = rgbaObjectToString(color.rgb);
          onColorChange(formatedColor);
        }}
      />
      <CirclePicker
        color={value}
        colors={colors}
        onChangeComplete={(color) => {
          const formatedColor = rgbaObjectToString(color.rgb);
          onColorChange(formatedColor);
        }}
      />
    </div>
  );
};

export default ColorPicker;
