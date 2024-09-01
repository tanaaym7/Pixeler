import { fabric } from "fabric";

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
export type BuildEditorProps = {
  canvas: fabric.Canvas;
};

export interface editorMethods {
  addCircle: () => void;
  addSquare: () => void;
  addTriangle: () => void;
  addDiamond: () => void;
  addStar: () => void;
}
