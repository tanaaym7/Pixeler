import Hint from "@/components/hint";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface SidebarItemProps {
  icon: LucideIcon;
  disabled?: boolean;
  label: string;
  isActive?: boolean;
  onClick: () => void;
}

const SidebarItem = ({
  icon: Icon,
  label,
  disabled = false,
  isActive,
  onClick,
}: SidebarItemProps) => {
  return (
    <Hint label={disabled ? `${label} (coming soon)` : label} side="right">
      <Button
        variant="ghost"
        size="sm"
        disabled={disabled}
        onClick={onClick}
        className={cn(
          "w-full h-full aspect-video p-3 py-4 flex flex-col rounded-none",
          isActive && "bg-accent text-primary",
          disabled && "opacity-30 cursor-not-allowed"
        )}
      >
        <Icon className="shrink-0" />
        <span>{label}</span>
      </Button>
    </Hint>
  );
};

export default SidebarItem;
