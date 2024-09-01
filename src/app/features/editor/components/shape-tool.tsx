import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface ShapeToolProps {
  icon: LucideIcon;
  onClick: () => void;
  iconClassName?: string;
  fill?: string;
}

const ShapeTool = ({
  icon: Icon,
  iconClassName,
  onClick,
  ...props
}: ShapeToolProps) => {
  return (
    <button
      onClick={onClick}
      className="aspect-square border rounded-md p-3"
      {...props}
    >
      <Icon className={cn("size-full", iconClassName)} />
    </button>
  );
};

export default ShapeTool;
