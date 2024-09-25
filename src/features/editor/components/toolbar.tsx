import { useState } from "react";
import Hint from "@/components/hint";
import {
  ActiveTool,
  editorMethods,
  FILL_COLOR,
  FONT_FAMILY,
  FONT_SIZE,
  FONT_WEIGHT,
  STROKE_COLOR,
} from "../types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  FaAlignCenter,
  FaAlignLeft,
  FaAlignRight,
  FaBold,
  FaFillDrip,
  FaItalic,
  FaStrikethrough,
  FaUnderline,
} from "react-icons/fa6";
import FontSizeInput from "./font-size-input";
import { BsBorderWidth } from "react-icons/bs";
import { TbColorFilter } from "react-icons/tb";
import { RiSendToBack, RiBringToFront } from "react-icons/ri";
import { RxTransparencyGrid, RxBorderAll } from "react-icons/rx";
import { isTextType } from "../utils";
import { ChevronDown, ClipboardCopy, Trash2 } from "lucide-react";

interface ToolbarProps {
  editor: editorMethods | undefined;
  activeTool: string;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

const Toolbar = ({ editor, activeTool, onChangeActiveTool }: ToolbarProps) => {
  const initialFillColor = editor?.getActiveFillColor() || FILL_COLOR;
  const initialStrokeColor = editor?.getActiveStrokeColor() || STROKE_COLOR;
  const initialFontFamily = editor?.getActiveFontFamily() || FONT_FAMILY;
  const initialFontWeight = editor?.getActiveFontWeight() || FONT_WEIGHT;
  const initialFontStyle = editor?.getActiveFontStyle() || "normal";
  const initialFontStrikethrough =
    editor?.getActiveFontStrikethrough() || false;
  const initialFontUnderline = editor?.getActiveFontUnderline() || false;
  const initialFontAlign = editor?.getActiveFontAlign() || "left";
  const initialFontSize = editor?.getActiveFontSize() || FONT_SIZE;

  const [properties, setProperties] = useState({
    fillColor: initialFillColor,
    strokeColor: initialStrokeColor,
    fontFamily: initialFontFamily,
    fontWeight: initialFontWeight,
    fontStyle: initialFontStyle,
    fontStrikethrough: initialFontStrikethrough,
    fontUnderline: initialFontUnderline,
    fontAlign: initialFontAlign,
    fontSize: initialFontSize,
  });

  if (editor?.selectedObjects.length === 0) {
    return (
      <div className="toolbar h-[52px] w-full border-b shrink-0 flex items-center overflow-x-auto z-[49] p-2 gap-x-2 "></div>
    );
  }

  const selectedObject = editor?.selectedObjects[0];
  const selectedObjectType = editor?.selectedObjects[0].type;
  const isText = isTextType(selectedObjectType);
  const isImage = selectedObjectType === "image";

  const toggleBold = () => {
    if (!selectedObject) return;

    const newValue = properties.fontWeight > 500 ? 500 : 700;
    editor?.changeFontWeight(newValue);
    setProperties((prev) => ({ ...prev, fontWeight: newValue }));
  };

  const toggleItalic = () => {
    if (!selectedObject) return;
    const newValue = properties.fontStyle === "normal" ? "italic" : "normal";
    editor?.changeFontStyle(newValue);
    setProperties((prev) => ({ ...prev, fontStyle: newValue }));
  };

  const toggleStrikethrough = () => {
    if (!selectedObject) return;
    const newValue = !properties.fontStrikethrough;
    editor?.changeFontStrikethrough(newValue);
    setProperties((prev) => ({ ...prev, fontStrikethrough: newValue }));
  };

  const toggleUnderline = () => {
    if (!selectedObject) return;

    const newValue = !properties.fontUnderline;
    editor?.changeFontUnderline(newValue);
    setProperties((prev) => ({ ...prev, fontUnderline: newValue }));
  };

  const toggleFontAlign = (align: string) => {
    if (!selectedObject) return;
    editor?.changeFontAlign(align);
    setProperties((prev) => ({ ...prev, fontAlign: align }));
  };

  const onChangeFontSize = (value: number) => {
    if (!selectedObject) return;
    editor?.changeFontSize(value);
    setProperties((prev) => ({ ...prev, fontSize: value }));
  };
  return (
    <div className="toolbar h-[52px] w-full border-b shrink-0 flex items-center overflow-x-auto z-[49] p-2 gap-x-2">
      {/* Fill color */}
      {!isImage && (
        <>
          <div className="flex justify-center items-center h-full ">
            <Hint label="Color" side="bottom" sideOffset={5}>
              <Button
                onClick={() => onChangeActiveTool("fill")}
                size="sm"
                variant="ghost"
                className={cn(
                  activeTool === "fill" && "bg-accent text-primary"
                )}
              >
                <div className="rounded-sm flex items-center justify-center">
                  <FaFillDrip
                    className="size-5"
                    style={{
                      color: properties.fillColor,
                    }}
                  />
                </div>
              </Button>
            </Hint>
          </div>
        </>
      )}
      {isImage && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Filters" side="bottom" sideOffset={5}>
            <Button
              onClick={() => onChangeActiveTool("filter")}
              size="icon"
              variant="ghost"
              className={cn(
                activeTool === "filter" && "bg-accent text-primary"
              )}
            >
              <TbColorFilter className="size-5" />
            </Button>
          </Hint>
        </div>
      )}
      {/* stroke style */}
      {!isText && (
        <>
          <div className="flex justify-center items-center h-full ">
            <Hint label="Stroke" side="bottom" sideOffset={5}>
              <Button
                onClick={() => onChangeActiveTool("stroke-color")}
                size="sm"
                variant="ghost"
                className={cn(
                  activeTool === "stroke-color" && "bg-accent text-primary"
                )}
              >
                <div className="relative w-5 h-5 flex items-center justify-center">
                  <RxBorderAll className="absolute inset-0 text-gray-400 w-full h-full" />
                  <RxBorderAll
                    className="absolute inset-0 w-full h-full"
                    style={{
                      color: properties.strokeColor,
                      clipPath: "inset(25% 25% 0 0)",
                    }}
                  />
                </div>
              </Button>
            </Hint>
          </div>
          <div className="flex justify-center items-center h-full ">
            <Hint label="Stroke style" side="bottom" sideOffset={5}>
              <Button
                onClick={() => onChangeActiveTool("stroke-width")}
                size="sm"
                variant="ghost"
                className={cn(
                  activeTool === "stroke-width" && "bg-accent text-primary"
                )}
              >
                <BsBorderWidth className="size-5" />
              </Button>
            </Hint>
          </div>
        </>
      )}
      {/* font style */}
      {isText && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Font" side="bottom" sideOffset={5}>
            <Button
              onClick={() => onChangeActiveTool("font")}
              size="icon"
              variant="ghost"
              className={cn(
                "w-auto px-2 text-sm",
                activeTool === "font" && "bg-accent text-primary"
              )}
            >
              <div
                className="max-w-[80px] truncate"
                style={{
                  fontFamily: properties.fontFamily,
                }}
              >
                {properties.fontFamily}
              </div>
              <ChevronDown className="size-4 ml-2 shrink-0" />
            </Button>
          </Hint>
        </div>
      )}
      {isText && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Bold" side="bottom" sideOffset={5}>
            <Button
              onClick={toggleBold}
              size="icon"
              variant="ghost"
              className={cn(
                properties.fontWeight > 500 && "bg-accent text-primary"
              )}
            >
              <FaBold className="size-4 shrink-0" />
            </Button>
          </Hint>
        </div>
      )}
      {isText && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Italic" side="bottom" sideOffset={5}>
            <Button
              onClick={toggleItalic}
              size="icon"
              variant="ghost"
              className={cn(
                properties.fontStyle === "italic" && "bg-accent text-primary"
              )}
            >
              <FaItalic className="size-4 shrink-0" />
            </Button>
          </Hint>
        </div>
      )}
      {isText && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Underline" side="bottom" sideOffset={5}>
            <Button
              onClick={toggleUnderline}
              size="icon"
              variant="ghost"
              className={cn(
                properties.fontUnderline && "bg-accent text-primary"
              )}
            >
              <FaUnderline className="size-4 shrink-0" />
            </Button>
          </Hint>
        </div>
      )}
      {isText && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Strikethrough" side="bottom" sideOffset={5}>
            <Button
              onClick={toggleStrikethrough}
              size="icon"
              variant="ghost"
              className={cn(
                properties.fontStrikethrough && "bg-accent text-primary"
              )}
            >
              <FaStrikethrough className="size-4 shrink-0" />
            </Button>
          </Hint>
        </div>
      )}
      {isText && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Align left" side="bottom" sideOffset={5}>
            <Button
              onClick={() => toggleFontAlign("left")}
              size="icon"
              variant="ghost"
              className={cn(
                properties.fontAlign === "left" && "bg-accent text-primary"
              )}
            >
              <FaAlignLeft className="size-4 shrink-0" />
            </Button>
          </Hint>
        </div>
      )}
      {isText && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Align center" side="bottom" sideOffset={5}>
            <Button
              onClick={() => toggleFontAlign("center")}
              size="icon"
              variant="ghost"
              className={cn(
                properties.fontAlign === "center" && "bg-accent text-primary"
              )}
            >
              <FaAlignCenter className="size-4 shrink-0" />
            </Button>
          </Hint>
        </div>
      )}
      {isText && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Align right" side="bottom" sideOffset={5}>
            <Button
              onClick={() => toggleFontAlign("right")}
              size="icon"
              variant="ghost"
              className={cn(
                properties.fontAlign === "right" && "bg-accent text-primary"
              )}
            >
              <FaAlignRight className="size-4 shrink-0" />
            </Button>
          </Hint>
        </div>
      )}
      {isText && (
        <div className="flex items-center h-full justify-center">
          <FontSizeInput
            value={properties.fontSize}
            onChange={onChangeFontSize}
          />
        </div>
      )}
      {/* clipboard */}
      <div className="flex justify-center items-center h-full ">
        <Hint label="Duplicate" side="bottom" sideOffset={5}>
          <Button
            onClick={() => {
              editor?.onCopy();
              editor?.onPaste();
            }}
            size="sm"
            variant="ghost"
          >
            <ClipboardCopy className="size-5" />
          </Button>
        </Hint>
      </div>
      {/* layer options */}
      <div className="flex justify-center items-center h-full ">
        <Hint label="Bring to front" side="bottom" sideOffset={5}>
          <Button
            onClick={() => editor?.bringForward()}
            size="sm"
            variant="ghost"
          >
            <RiBringToFront className="size-5" />
          </Button>
        </Hint>
      </div>
      <div className="flex justify-center items-center h-full ">
        <Hint label="Send to back" side="bottom" sideOffset={5}>
          <Button
            onClick={() => editor?.sendBackward()}
            size="sm"
            variant="ghost"
          >
            <RiSendToBack className="size-5" />
          </Button>
        </Hint>
      </div>
      {/* opacity*/}
      <div className="flex justify-center items-center h-full ">
        <Hint label="Opacity" side="bottom" sideOffset={5}>
          <Button
            onClick={() => onChangeActiveTool("opacity")}
            size="sm"
            variant="ghost"
          >
            <RxTransparencyGrid className="size-5" />
          </Button>
        </Hint>
      </div>
      <div className="flex justify-center items-center h-full ">
        <Hint label="Delete" side="bottom" sideOffset={5}>
          <Button
            onClick={() => editor?.deleteObject()}
            size="sm"
            variant="ghost"
          >
            <Trash2 className="size-5" />
          </Button>
        </Hint>
      </div>
    </div>
  );
};

export default Toolbar;
