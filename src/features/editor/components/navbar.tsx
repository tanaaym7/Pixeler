"use client";

import Image from "next/image";
import { useFilePicker } from "use-file-picker";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  FilePlus2,
  SquareDashedMousePointer,
  Undo2,
  Redo2,
  HardDriveDownload,
  Download,
  FileImage,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Hint from "@/components/hint";
import { ActiveTool, editorMethods } from "../types";
import { cn } from "@/lib/utils";
import { UserButton } from "@/features/auth/components/user-button";

interface NavbarProps {
  editor: editorMethods | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

const Navbar = ({ editor, activeTool, onChangeActiveTool }: NavbarProps) => {
  const { openFilePicker } = useFilePicker({
    accept: ".json",
    onFilesSuccessfullySelected: ({ plainFiles }: any) => {
      if (plainFiles && plainFiles.length > 0) {
        const file = plainFiles[0];
        const reader = new FileReader();
        reader.readAsText(file, "utf-8");
        reader.onload = () => {
          editor?.loadJson(reader.result as string);
        };
      }
    },
  });

  return (
    <nav className="navbar w-full flex items-center p-4 h-[68px] gap-x-8 border-b lg:pl-[34px]">
      <Image src="/logo.png" alt="Logo" width={38} height={38} priority />
      <div className="w-full flex items-center gap-x-1 h-full">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="bg-transparent">
              File
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="min-w-60">
            <DropdownMenuItem
              className="flex items-center gap-x-2"
              onClick={() => openFilePicker()}
            >
              <FilePlus2 className="size-8" />
              <div>
                <p>Open</p>
                <p className="text-xs text-muted-foreground">
                  Open a JSON file
                </p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Separator orientation="vertical" className="mx-2 bg-zinc-200" />

        <Hint label="Select" side="bottom" sideOffset={8}>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onChangeActiveTool("select")}
            className={cn(activeTool === "select" && "bg-accent text-primary")}
          >
            <SquareDashedMousePointer className="size-4" />
          </Button>
        </Hint>
        <Hint label="Undo" side="bottom" sideOffset={8}>
          <Button
            disabled={!editor?.canUndo()}
            variant="ghost"
            size="sm"
            onClick={() => editor?.onUndo()}
          >
            <Undo2 className="size-4" />
          </Button>
        </Hint>
        <Hint label="Redo" side="bottom" sideOffset={8}>
          <Button
            disabled={!editor?.canRedo()}
            variant="ghost"
            size="sm"
            onClick={() => editor?.onRedo()}
          >
            <Redo2 className="size-4" />
          </Button>
        </Hint>
        <Separator orientation="vertical" className="mx-2 bg-zinc-200" />

        <div className="flex items-center gap-x-3">
          <HardDriveDownload className="size-5" />
          <p className="text-sm font-medium text-muted-foreground">Saved</p>
        </div>
        <div className="ml-auto flex items-center gap-x-4">
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant="syntax">
                Export
                <Download className="size-4 ml-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-60">
              <DropdownMenuItem
                className="flex items-center gap-x-2"
                onClick={() => editor?.savePng()}
              >
                <FileImage className="size-8" />
                <div>
                  <p>PNG</p>
                  <p className="text-xs text-muted-foreground">Best for web</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-x-2"
                onClick={() => editor?.saveJpg()}
              >
                <FileImage className="size-8" />
                <div>
                  <p>JPEG</p>
                  <p className="text-xs text-muted-foreground">
                    Best for print
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-x-2"
                onClick={() => editor?.saveSvg()}
              >
                <FileImage className="size-8" />
                <div>
                  <p>SVG</p>
                  <p className="text-xs text-muted-foreground">
                    Best for vector
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-x-2"
                onClick={() => editor?.saveJson()}
              >
                <FilePlus2 className="size-8" />
                <div>
                  <p>JSON</p>
                  <p className="text-xs text-muted-foreground">
                    save for editing later
                  </p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <UserButton />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
