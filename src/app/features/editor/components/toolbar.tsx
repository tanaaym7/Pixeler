import Hint from "@/components/hint";
import { ActiveTool, editorMethods } from "../types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ToolbarProps {
  editor: editorMethods | undefined;
  activeTool: string;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

const Toolbar = ({ editor, activeTool, onChangeActiveTool }: ToolbarProps) => {
const fillColor = editor?.fillColor;

  return (
    <div className="h-[52px] w-full border-b shrink-0 flex items-center overflow-x-auto z-[49] p-2 gap-x-2 ">
      <div className="flex justify-center items-center h-full ">
        <Hint label="Color" side="bottom" sideOffset={5}>
          <Button
            onClick={() => onChangeActiveTool("fill")}
            size="sm"
            variant="ghost"
            className={cn(activeTool === "fill" && "bg-accent text-primary")}
          >
            <div
              className="rounded-sm size-4 border"
              style={{
                backgroundColor: fillColor,
              }}
            ></div>
          </Button>
        </Hint>
      </div>
    </div>
  );
};

export default Toolbar;
