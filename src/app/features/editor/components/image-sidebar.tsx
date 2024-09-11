import { ActiveTool, editorMethods } from "../types";
import { ChevronsRight, Loader, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetImages } from "@/app/features/images/api/use-get-images";

interface ImageSidebarProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
  editor: editorMethods | undefined;
}

const ImageSidebar = ({
  activeTool,
  onChangeActiveTool,
  editor,
}: ImageSidebarProps) => {
  const { data, isLoading, isError } = useGetImages();

  const onClose = () => {
    onChangeActiveTool("select");
  };

  return (
    <aside
      className={cn(
        "flex flex-col w-[280px] h-full border-r relative z-[40]",
        activeTool === "images" ? "visible" : "hidden"
      )}
    >
      <header className="h-[62px] p-2 border-b">
        <p className="font-medium">Images</p>
        <p className="text-sm text-muted-foreground">
          add images to your canvas
        </p>
      </header>
      {isLoading && (
        <div className="flex items-center justify-center flex-1">
          <Loader className="size-6 animate-spin" />
        </div>
      )}
      {isError && (
        <div className="flex flex-col gap-y-2 items-center justify-center flex-1">
          <TriangleAlert className="size-6" />
          <p className="text-muted-foreground">Error loading images</p>
        </div>
      )}
      <ScrollArea>
        <div className="p-4 space-y-4 border-b"></div>
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

export default ImageSidebar;
