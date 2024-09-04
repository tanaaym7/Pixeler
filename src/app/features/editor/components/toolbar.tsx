import Hint from "@/components/hint";
import { ActiveTool, editorMethods, FILL_COLOR, STROKE_COLOR } from "../types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FaFillDrip } from "react-icons/fa";
import { BsBorderWidth } from "react-icons/bs";
import { RiSendToBack, RiBringToFront } from "react-icons/ri";
import { RxTransparencyGrid, RxBorderAll } from "react-icons/rx";
import { isTextType } from "../utils";
import { ChevronDown } from "lucide-react";

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

  const selectedObjectType = editor?.selectedObjects[0].type;

  const fillColor = editor?.getActiveFillColor() || FILL_COLOR;
  const strokeColor = editor?.getActiveStrokeColor() || STROKE_COLOR;

  const isText = isTextType(selectedObjectType);

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
      {!isText && (
        <>
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
                <div className="relative w-5 h-5 flex items-center justify-center">
                  <RxBorderAll className="absolute inset-0 text-gray-400 w-full h-full" />
                  <RxBorderAll
                    className="absolute inset-0 w-full h-full"
                    style={{
                      color: strokeColor,
                      clipPath: "inset(25% 25% 0 0)",
                    }}
                  />
                </div>
              </Button>
            </Hint>
          </div>
          <div className="flex justify-center items-center h-full ">
            <Hint label="Stroke style" side="bottom" sideOffset={5}>
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
        </>
      )}
      {isText && (
        <div className="flex justify-center items-center h-full ">
          <Hint label="Font" side="bottom" sideOffset={5}>
            <Button
              onClick={() => onChangeActiveTool("font")}
              size="sm"
              variant="ghost"
              className={cn("w-auto px-2",activeTool === "font" && "bg-accent text-primary")}
            >
              <div className="max-w-[100px] truncate">Arial</div>
              <ChevronDown className="size-5" />
            </Button>
          </Hint>
        </div>
      )}
      {/* layer options */}
      <div className="flex justify-center items-center h-full ">
        <Hint label="Bring to front" side="bottom" sideOffset={5}>
          <Button
            onClick={() => editor?.bringForward()}
            size="sm"
            variant="ghost"
          >
            <RiBringToFront className="size-5" />
          </Button>
        </Hint>
      </div>
      <div className="flex justify-center items-center h-full ">
        <Hint label="Send to back" side="bottom" sideOffset={5}>
          <Button
            onClick={() => editor?.sendBackward()}
            size="sm"
            variant="ghost"
          >
            <RiSendToBack className="size-5" />
          </Button>
        </Hint>
      </div>
      {/* opacity*/}
      <div className="flex justify-center items-center h-full ">
        <Hint label="Send to back" side="bottom" sideOffset={5}>
          <Button
            onClick={() => onChangeActiveTool("opacity")}
            size="sm"
            variant="ghost"
          >
            <RxTransparencyGrid className="size-5" />
          </Button>
        </Hint>
      </div>
    </div>
  );
};

export default Toolbar;
