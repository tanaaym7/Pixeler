import { cn } from "@/lib/utils";
import {
  ActiveTool,
  editorMethods,
  FILL_COLOR,
  STROKE_COLOR,
  STROKE_WIDTH,
} from "../types";
import { ChevronsRight } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import ColorPicker from "./color-picker";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

interface DrawSidebarProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: editorMethods | undefined;
}

const DrawSidebar = ({
  activeTool,
  onChangeActiveTool,
  editor,
}: DrawSidebarProps) => {
  const colorValue = editor?.getActiveStrokeColor() || STROKE_COLOR;
  const widthValue = editor?.getActiveStrokeWidth() || STROKE_WIDTH;

  const onClose = () => {
    editor?.disableDrawMode();
    onChangeActiveTool("select");
  };
  const onColorChange = (value: string) => {
    editor?.changeStrokeColor(value);
  };

  const onWidthChange = (value: number) => {
    editor?.changeStrokeWidth(value);
  };

  return (
    <aside
      className={cn(
        "flex flex-col w-[280px] h-full border-r relative z-[40]",
        activeTool === "draw" ? "visible" : "hidden"
      )}
    >
      <header className="h-[62px] p-2 border-b">
        <p className="font-medium">Modify brush settings</p>
      </header>

      <ScrollArea>
        <div className="p-4 space-y-6 border-b">
          <Label className="text-sm">Brush width</Label>
          <Slider
            value={[widthValue]}
            onValueChange={(values) => onWidthChange(values[0])}
          />
        </div>
        <div className="p-4 space-y-6">
          <ColorPicker value={colorValue} onColorChange={onColorChange} />
        </div>
      </ScrollArea>
      <button
        onClick={onClose}
        className="absolute top-1/2 -translate-y-1/2 -right-[1.80rem] w-[30px] h-[50px] bg-white rounded-tr-2xl rounded-br-2xl  group border-y flex items-center justify-center"
      >
        <ChevronsRight className="size-4 text-black group-hover:opacity-75 transition" />
      </button>
    </aside>
  );
};

export default DrawSidebar;
