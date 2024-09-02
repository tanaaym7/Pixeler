import { cn } from "@/lib/utils";
import { ActiveTool, editorMethods, FILL_COLOR } from "../types";
import { ChevronsRight } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import ColorPicker from "./color-picker";

interface FillColorSidebarProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: editorMethods | undefined;
}

const FillColorSidebar = ({
  activeTool,
  onChangeActiveTool,
  editor,
}: FillColorSidebarProps) => {
  const value = editor?.getActiveFillColor() || FILL_COLOR;

  const onClose = () => {
    onChangeActiveTool("select");
  };

  const onColorChange = (value: string) => {
    editor?.changeFillColor(value);
  };


  return (
    <aside
      className={cn(
        "flex flex-col w-[280px] h-full border-r relative z-[40]",
        activeTool === "fill"  ? "visible" : "hidden"
      )}
    >
      <header className="h-[62px] p-2 border-b">
        <p className="font-medium">Fill color</p>
        <p className="text-sm text-muted-foreground">
          fill color to your element
        </p>
      </header>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6 ">
          <ColorPicker value={value} onColorChange={onColorChange} />
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

export default FillColorSidebar;
