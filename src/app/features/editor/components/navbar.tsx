import Image from "next/image";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
import { ActiveTool } from "../types";
import { cn } from "@/lib/utils";

interface NavbarProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

const Navbar = ({ activeTool, onChangeActiveTool }: NavbarProps) => {
  return (
    <nav className="flex items-center p-4 h-[68px] bg-white border-b lg:pl-[34px] shadow-md gap-x-8">
      <Image src="/logo.png" alt="Logo" width={38} height={38} />
      <div className="w-full flex items-center gap-x-1 h-full">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              File
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="min-w-60">
            <DropdownMenuItem className="flex items-center gap-x-2">
              <FilePlus2 className="size-8" />
              <div>
                <p>Open</p>
                <p className="text-xs text-muted-foreground">Open a file</p>
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
          <Button variant="ghost" size="sm">
            <Undo2 className="size-4" />
          </Button>
        </Hint>
        <Hint label="Redo" side="bottom" sideOffset={8}>
          <Button variant="ghost" size="sm">
            <Redo2 className="size-4" />
          </Button>
        </Hint>
        <Separator orientation="vertical" className="mx-2 bg-zinc-200" />

        <div className="flex items-center gap-x-3">
          <HardDriveDownload className="size-5" />
          <p className="text-sm text-muted-foreground">Saved</p>
        </div>
        <div className="ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                Export
                <Download className="size-4 ml-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-60">
              <DropdownMenuItem className="flex items-center gap-x-2">
                <FileImage className="size-8" />
                <div>
                  <p>PNG</p>
                  <p className="text-xs text-muted-foreground">Best for web</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-x-2">
                <FileImage className="size-8" />
                <div>
                  <p>JPEG</p>
                  <p className="text-xs text-muted-foreground">
                    Best for print
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-x-2">
                <FileImage className="size-8" />
                <div>
                  <p>SVG</p>
                  <p className="text-xs text-muted-foreground">
                    Best for vector
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-x-2">
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
