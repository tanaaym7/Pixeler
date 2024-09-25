import { ActiveTool, editorMethods } from "../types";
import { ChevronsRight, Loader, TriangleAlert, Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetImages } from "@/features/images/api/use-get-images";
import Image from "next/image";
import Link from "next/link";
import { UploadButton } from "@/lib/uploadthing";

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
      <div className="p-4 border-b">
        <UploadButton
          appearance={{
            button:
              "w-full rounded-md bg-gradient-to-tr from-slate-800 to-slate-700 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none",
            allowedContent: "hidden",
          }}
          content={{
            button({ ready }) {
              return (
                <div className="flex items-center justify-center gap-2">
                  <Upload className="w-4 h-4" />
                  <span>Upload Image</span>
                </div>
              );
            },
          }}
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            editor?.addImage(res[0].url);
          }}
        />
      </div>
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
        <div className="p-4">
          <div className="grid grid-cols-2 gap-4">
            {data &&
              data.map((image) => {
                return (
                  <button
                    onClick={() => editor?.addImage(image.urls.regular)}
                    key={image.id}
                    className="relative w-full h-[100px] group hover:opacity-75 transition bg-muted rounded-sm overflow-hidden border"
                  >
                    <Image
                      fill
                      src={image.urls.small}
                      alt={image.alt_description || "Image"}
                      className="object-cover"
                    />
                    <Link
                      target="_blank"
                      href={image.links.html}
                      className="opacity-0 group-hover:opacity-100 absolute left-0 bottom-0 w-full text-[10px] truncate text-white hover:underline p-1 bg-black/50 text-left"
                    >
                      {image.user.name}
                    </Link>
                  </button>
                );
              })}
          </div>
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

export default ImageSidebar;
