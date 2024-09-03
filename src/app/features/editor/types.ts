import { fabric } from "fabric";
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
  material.blueGrey["500"],
  "transparent",
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
  fillColor: string;
  selectedObjects: fabric.Object[];
  setFillColor: (value: string) => void;
  setStrokeColor: (value: string) => void;
  setStrokeDashArray: (value: number[]) => void;
  setStrokeWidth: (value: number) => void;
  strokeColor: string;
  strokeDashArray: number[];
  strokeWidth: number;
};

export interface editorMethods {
  canvas: fabric.Canvas;
  selectedObjects: fabric.Object[];
  addCircle: () => void;
  addDiamond: () => void;
  addSquare: () => void;
  addStar: () => void;
  addTriangle: () => void;
  bringForward: () => void;
  sendBackward: () => void;
  changeFillColor: (value: string) => void;
  changeStrokeColor: (value: string) => void;
  changeStrokeDashArray: (value: number[]) => void;
  changeStrokeWidth: (value: number) => void;
  getActiveFillColor: () => string;
  getActiveStrokeColor: () => string;
  getActiveStrokeDashArray: () => number[];
  getActiveStrokeWidth: () => number;
}
