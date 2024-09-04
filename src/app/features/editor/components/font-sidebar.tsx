import { ActiveTool, editorMethods } from "../types";
import { ChevronsRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

interface FontSidebarProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: editorMethods | undefined;
}

const FontSidebar = ({
  activeTool,
  onChangeActiveTool,
  editor,
}: FontSidebarProps) => {
  const onClose = () => {
    onChangeActiveTool("select");
  };

  return (
    <aside
      className={cn(
        "flex flex-col w-[280px] h-full border-r relative z-[40]",
        activeTool === "font" ? "visible" : "hidden"
      )}
    >
      <header className="h-[62px] p-2 border-b">
        <p className="font-medium">Font</p>
        <p className="text-sm text-muted-foreground">Select font style</p>
      </header>

      <ScrollArea>
        <div className="p-4 space-y-4 border-b">
          <Button
            variant="secondary"
            className="w-full"
            onClick={() =>
              editor?.addText("Heading", { fontSize: 78, fontWeight: 700 })
            }
          >
            <span className="text-2xl font-extrabold">Heading</span>
          </Button>
          <Button
            variant="secondary"
            className="w-full"
            onClick={() =>
              editor?.addText("Sub-heading", { fontSize: 56, fontWeight: 500 })
            }
          >
            <span className="text-xl font-bold">Sub-heading</span>
          </Button>
          <Button
            variant="secondary"
            className="w-full"
            onClick={() =>
              editor?.addText("Paragraph", { fontSize: 44, fontWeight: 400 })
            }
          >
            <span className="text-lg font-medium">Paragraph</span>
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

export default FontSidebar;
