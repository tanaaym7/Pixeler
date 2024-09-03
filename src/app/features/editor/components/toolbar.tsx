import Hint from "@/components/hint";
import { ActiveTool, editorMethods, FILL_COLOR, STROKE_COLOR } from "../types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FaFillDrip } from "react-icons/fa";
import { BsBorderWidth } from "react-icons/bs";

interface ToolbarProps {
  editor: editorMethods | undefined;
  activeTool: string;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

const Toolbar = ({ editor, activeTool, onChangeActiveTool }: ToolbarProps) => {
  if (editor?.selectedObjects.length === 0) {
    return (
      <div className="toolbar h-[52px] w-full border-b shrink-0 flex items-center overflow-x-auto z-[49] p-2 gap-x-2 "></div>
    );
  }

  const fillColor = editor?.getActiveFillColor() || FILL_COLOR;
  const strokeColor = editor?.getActiveStrokeColor() || STROKE_COLOR;

  return (
    <div className="toolbar h-[52px] w-full border-b shrink-0 flex items-center overflow-x-auto z-[49] p-2 gap-x-2">
      {/* Fill color */}
      <div className="flex justify-center items-center h-full ">
        <Hint label="Color" side="bottom" sideOffset={5}>
          <Button
            onClick={() => onChangeActiveTool("fill")}
            size="sm"
            variant="ghost"
            className={cn(activeTool === "fill" && "bg-accent text-primary")}
          >
            <div className="rounded-sm flex items-center justify-center">
              <FaFillDrip
                className="size-5"
                style={{
                  color: fillColor,
                }}
              />
            </div>
          </Button>
        </Hint>
      </div>
      {/* Stroke color */}
      <div className="flex justify-center items-center h-full ">
        <Hint label="Stroke" side="bottom" sideOffset={5}>
          <Button
            onClick={() => onChangeActiveTool("stroke-color")}
            size="sm"
            variant="ghost"
            className={cn(
              activeTool === "stroke-color" && "bg-accent text-primary"
            )}
          >
            <div
              className="rounded-sm size-4 border-[3px] bg-transparent"
              style={{
                borderColor: strokeColor,
              }}
            ></div>
          </Button>
        </Hint>
      </div>
      {/* Stroke width */}
      <div className="flex justify-center items-center h-full ">
        <Hint label="Stroke" side="bottom" sideOffset={5}>
          <Button
            onClick={() => onChangeActiveTool("stroke-width")}
            size="sm"
            variant="ghost"
            className={cn(
              activeTool === "stroke-width" && "bg-accent text-primary"
            )}
          >
            <BsBorderWidth className="size-5" />
          </Button>
        </Hint>
      </div>
    </div>
  );
};

export default Toolbar;
