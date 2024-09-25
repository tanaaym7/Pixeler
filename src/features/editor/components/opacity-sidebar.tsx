import { useEffect, useMemo, useState } from "react";
import { ActiveTool, editorMethods } from "../types";
import { ChevronsRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";

interface OpacityProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: editorMethods | undefined;
}

const OpacitySidebar = ({
  activeTool,
  onChangeActiveTool,
  editor,
}: OpacityProps) => {
  const initialOpacity = editor?.getActiveOpacity() || 1;
  const [opacity, setOpacity] = useState(initialOpacity);

  const selectedObject = useMemo(() => {
    return editor?.selectedObjects[0];
  }, [editor?.selectedObjects]);

  useEffect(() => {
    if (selectedObject) {
      setOpacity(selectedObject.get("opacity") || 1);
    }
  }, [selectedObject]);

  const onClose = () => {
    onChangeActiveTool("select");
  };

  const onOpacityChange = (value: number) => {
    editor?.changeOpacity(value);
    setOpacity(value);
  };

  return (
    <aside
      className={cn(
        "flex flex-col w-[280px] h-full border-r relative z-[40]",
        activeTool === "opacity" ? "visible" : "hidden"
      )}
    >
      <header className="h-[62px] p-2 border-b">
        <p className="font-medium">Opacity</p>
        <p className="text-sm text-muted-foreground">
          Change opacity of selected object
        </p>
      </header>

      <ScrollArea>
        <div className="p-4 space-y-4 border-b ">
          <Slider
            value={[opacity]}
            onValueChange={(values) => onOpacityChange(values[0])}
            max={1}
            min={0}
            step={0.01}
          />
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

export default OpacitySidebar;
