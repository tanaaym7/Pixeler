import SidebarItem from "./sidebar-item";

import {
  LayoutTemplate,
  Image,
  Type,
  Shapes,
  Pencil,
  Sparkles,
  Settings,
} from "lucide-react";

import { ActiveTool } from "../types";

interface SidebarProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

const Sidebar = ({ activeTool, onChangeActiveTool }: SidebarProps) => {
  return (
    <aside className="bg-white flex flex-col w-[100px] h-full border-r overflow-y-auto">
      <ul className="flex flex-col">
        <SidebarItem
          icon={LayoutTemplate}
          label="Design"
          isActive={activeTool === "templates"}
          onClick={() => {
            onChangeActiveTool("templates");
          }}
        />
        <SidebarItem
          icon={Image}
          label="Image"
          isActive={activeTool === "images"}
          onClick={() => {
            onChangeActiveTool("images");
          }}
        />
        <SidebarItem
          icon={Type}
          label="Text"
          isActive={activeTool === "text"}
          onClick={() => {
            onChangeActiveTool("text");
          }}
        />
        <SidebarItem
          icon={Shapes}
          label="Shape"
          isActive={activeTool === "shapes"}
          onClick={() => {
            onChangeActiveTool("shapes");
          }}
        />

        <SidebarItem
          icon={Pencil}
          label="Pen"
          isActive={activeTool === "draw"}
          onClick={() => {
            onChangeActiveTool("draw");
          }}
        />
        <SidebarItem
          icon={Sparkles}
          label="Effect"
          isActive={activeTool === "ai"}
          onClick={() => {
            onChangeActiveTool("ai");
          }}
        />
        <SidebarItem
          icon={Settings}
          label="Settings"
          isActive={activeTool === "settings"}
          onClick={() => {
            onChangeActiveTool("settings");
          }}
        />
      </ul>
    </aside>
  );
};

export default Sidebar;
