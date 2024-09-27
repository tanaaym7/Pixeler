import { fabric } from "fabric";
import { ITextOptions } from "fabric/fabric-impl";
import * as material from "material-colors";

export const colors = [
  material.red["500"],
  material.pink["500"],
  material.purple["500"],
  material.deepPurple["500"],
  material.indigo["500"],
  material.blue["500"],
  material.lightBlue["500"],
  material.cyan["500"],
  material.teal["500"],
  material.green["500"],
  material.lightGreen["500"],
  material.lime["500"],
  material.yellow["500"],
  material.amber["500"],
  material.orange["500"],
  material.deepOrange["500"],
  material.brown["500"],
  material.grey["500"],
];

export const filters = [
  "none",
  "polaroid",
  "sepia",
  "kodachrome",
  "contrast",
  "brightness",
  "greyscale",
  "brownie",
  "vintage",
  "technicolor",
  "pixelate",
  "invert",
  "blur",
  "sharpen",
  "emboss",
  "removecolor",
  "blacknwhite",
  "vibrance",
  "blendcolor",
  "huerotate",
  "saturation",
  "gamma",
];
export const fonts = [
  "Arial",
  "Arial Black",
  "Verdana",
  "Helvetica",
  "Tahoma",
  "Trebuchet MS",
  "Times New Roman",
  "Georgia",
  "Garamond",
  "Courier New",
  "Brush Script MT",
  "Palatino",
  "Bookman",
  "Comic Sans MS",
  "Impact",
  "Lucida Sans Unicode",
  "Geneva",
  "Lucida Console",
];

export const JSON_KEYS = [
  "name",
  "gradientAngle",
  "selectable",
  "hasControls",
  "linkData",
  "editable",
  "extensionType",
  "extension",
];

export type ActiveTool =
  | "select"
  | "shapes"
  | "text"
  | "images"
  | "draw"
  | "fill"
  | "stroke-color"
  | "stroke-width"
  | "font"
  | "opacity"
  | "filter"
  | "settings"
  | "ai"
  | "remove-bg"
  | "templates";

export const selectionDependentTool = [
  "fill",
  "font",
  "filter",
  "opacity",
  "remove-bg",
  "stroke-color",
  "stroke-width",
];

export const FILL_COLOR = "rgba(0,0,0,1)";
export const STROKE_COLOR = "rgba(0,0,0,1)";
export const STROKE_WIDTH = 2;
export const STROKE_DASH_ARRAY = [];
export const FONT_FAMILY = "Arial";
export const FONT_SIZE = 32;
export const FONT_WEIGHT = 400;

export const TEXT_OPTIONS = {
  type: "textbox",
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  fontSize: FONT_SIZE,
  fontFamily: FONT_FAMILY,
};

export const CIRCLE_OPTIONS = {
  radius: 180,
  angle: 0,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
};
export const SQUARE_OPTIONS = {
  width: 300,
  height: 300,
  angle: 0,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
};
export const TRIANGLE_OPTIONS = {
  width: 300,
  height: 300,
  angle: 0,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
};
export const DIAMOND_OPTIONS = {
  width: 300,
  height: 300,
  angle: 0,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
};

export const STAR_OPTIONS = {
  width: 300,
  height: 300,
  angle: 0,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
};

export type EditorHookProps = {
  clearSelectionCallback: () => void;
};

export type BuildEditorProps = {
  canvas: fabric.Canvas;
  save: (skip?: boolean) => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
  undo: () => void;
  redo: () => void;
  copy: () => void;
  paste: () => void;
  autoZoom: () => void;
  fillColor: string;
  selectedObjects: fabric.Object[];
  setFillColor: (value: string) => void;
  setStrokeColor: (value: string) => void;
  setStrokeDashArray: (value: number[]) => void;
  setStrokeWidth: (value: number) => void;
  strokeColor: string;
  strokeDashArray: number[];
  strokeWidth: number;
  fontFamily: string;
  setFontFamily: (value: string) => void;
};

export interface editorMethods {
  savePng: () => void;
  saveSvg: () => void;
  saveJpg: () => void;
  saveJson: () => void;
  loadJson: (json: string) => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
  onUndo: () => void;
  onRedo: () => void;
  canvas: fabric.Canvas;
  selectedObjects: fabric.Object[];
  getWorkspace: () => fabric.Object | undefined;
  deleteObject: () => void;
  onCopy: () => void;
  onPaste: () => void;
  autoZoom: () => void;
  zoomIn: () => void;
  zoomOut: () => void;
  enableDrawMode: () => void;
  disableDrawMode: () => void;
  addImage: (value: string) => void;
  addText: (value: string, options?: ITextOptions) => void;
  addCircle: () => void;
  addDiamond: () => void;
  addSquare: () => void;
  addStar: () => void;
  addTriangle: () => void;
  bringForward: () => void;
  sendBackward: () => void;
  changeCanvasSize: (value: { width: number; height: number }) => void;
  changeCanvasBg: (value: string) => void;
  changeImageFilter: (value: string) => void;
  changeFillColor: (value: string) => void;
  changeStrokeColor: (value: string) => void;
  changeStrokeDashArray: (value: number[]) => void;
  changeStrokeWidth: (value: number) => void;
  changeOpacity: (value: number) => void;
  changeFontFamily: (value: string) => void;
  changeFontStyle: (value: string) => void;
  changeFontStrikethrough: (value: boolean) => void;
  changeFontSize: (value: number) => void;
  changeFontWeight: (value: number) => void;
  changeFontUnderline: (value: boolean) => void;
  changeFontAlign: (value: string) => void;
  getActiveFillColor: () => string;
  getActiveStrokeColor: () => string;
  getActiveStrokeDashArray: () => number[];
  getActiveStrokeWidth: () => number;
  getActiveOpacity: () => number;
  getActiveFontFamily: () => string;
  getActiveFontWeight: () => number;
  getActiveFontStyle: () => string;
  getActiveFontStrikethrough: () => string;
  getActiveFontUnderline: () => string;
  getActiveFontAlign: () => string;
  getActiveFontSize: () => number;
}
