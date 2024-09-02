import { cn } from "@/lib/utils";
import { ActiveTool, editorMethods } from "../types";
import {
  ChevronsRight,
  Square,
  Circle,
  Triangle,
  Star,
  Diamond,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import ShapeTool from "./shape-tool";

interface ShapeSidebarProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: editorMethods | undefined;
}

const ShapeSidebar = ({
  activeTool,
  onChangeActiveTool,
  editor,
}: ShapeSidebarProps) => {
  const onClose = () => {
    onChangeActiveTool("select");
  };

  return (
    <aside
      className={cn(
        "flex flex-col w-[280px] h-full border-r relative z-[40]",
        activeTool === "shapes" ? "visible" : "hidden"
      )}
    >
      <header className="h-[62px] p-2 border-b">
        <p className="font-medium">Shapes</p>
        <p className="text-sm text-muted-foreground">
          add shapes to your canvas
        </p>
      </header>

      <ScrollArea className="flex-1">
        <div className="grid grid-cols-3 gap-2">
          <ShapeTool icon={Square} onClick={() => editor?.addSquare()} />
          <ShapeTool icon={Circle} onClick={() => editor?.addCircle()} />
          <ShapeTool icon={Triangle} onClick={() => editor?.addTriangle()} />
          <ShapeTool icon={Star} onClick={() => editor?.addStar()} />
          <ShapeTool icon={Diamond} onClick={() => editor?.addDiamond()} />
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

export default ShapeSidebar;
