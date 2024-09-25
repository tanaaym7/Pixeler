import { cn } from "@/lib/utils";
import {
  ActiveTool,
  editorMethods,
  STROKE_DASH_ARRAY,
  STROKE_WIDTH,
} from "../types";
import { ChevronsRight } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface StrokeWidthProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: editorMethods | undefined;
}

const StrokeWidthSidebar = ({
  activeTool,
  onChangeActiveTool,
  editor,
}: StrokeWidthProps) => {
  const stroke_width = editor?.getActiveStrokeWidth() || STROKE_WIDTH;

  const stroke_type = editor?.getActiveStrokeDashArray() || STROKE_DASH_ARRAY;

  const onClose = () => {
    onChangeActiveTool("select");
  };

  const onStrokeChange = (value: number) => {
    editor?.changeStrokeWidth(value);
  };

  const onStrokeTypeChange = (value: number[]) => {
    editor?.changeStrokeDashArray(value);
  };

  return (
    <aside
      className={cn(
        "flex flex-col w-[280px] h-full border-r relative z-[40]",
        activeTool === "stroke-width" ? "visible" : "hidden"
      )}
    >
      <header className="h-[62px] p-2 border-b">
        <p className="font-medium">Stroke options</p>
        <p className="text-sm text-muted-foreground">Change the stroke width</p>
      </header>

      <ScrollArea>
        <div className="p-4 space-y-4 border-b ">
          <Label>Stroke width</Label>
          <Slider
            value={[stroke_width]}
            onValueChange={(values) => onStrokeChange(values[0])}
          />
        </div>
        <div className="p-4 space-y-4 border-b ">
          <Label>Stroke type</Label>
          <Button
            variant="secondary"
            className={cn(
              "w-full",
              JSON.stringify(stroke_type) === `[]` && "border-2 border-blue-600"
            )}
            onClick={() => onStrokeTypeChange([])}
          >
            <div className="w-full rounded-full border-black border-[3px]" />
          </Button>

          <Button
            variant="secondary"
            className={cn(
              "w-full",
              JSON.stringify(stroke_type) === `[5,5]` &&
                "border-2 border-blue-600"
            )}
            onClick={() => onStrokeTypeChange([5, 5])}
          >
            <div className="w-full rounded-full border-black border-dashed border-[3px]" />
          </Button>
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

export default StrokeWidthSidebar;
