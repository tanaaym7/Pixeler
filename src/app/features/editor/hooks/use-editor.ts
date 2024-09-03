import { fabric } from "fabric";
import { useCallback, useMemo, useState } from "react";
import {
  BuildEditorProps,
  CIRCLE_OPTIONS,
  DIAMOND_OPTIONS,
  EditorHookProps,
  editorMethods,
  FILL_COLOR,
  SQUARE_OPTIONS,
  STAR_OPTIONS,
  STROKE_COLOR,
  STROKE_DASH_ARRAY,
  STROKE_WIDTH,
  TRIANGLE_OPTIONS,
} from "../types";
import { isTextType } from "../utils";
import { useAutoResize } from "./use-auto-resize";
import { useCanvasEvents } from "./use-canvas-events";

const buildEditor = ({
  canvas,
  fillColor,
  selectedObjects,
  setFillColor,
  setStrokeColor,
  setStrokeDashArray,
  setStrokeWidth,
  strokeColor,
  strokeDashArray,
  strokeWidth,
}: BuildEditorProps) => {
  const shapeWidth = 300;
  const shapeHeight = 300;

  const getWorkspace = () => {
    return canvas.getObjects().find((object) => object.name === "clip");
  };

  const center = (object: fabric.Object) => {
    const workspace = getWorkspace();
    const center = workspace?.getCenterPoint();
    if (!center) return;
    // @ts-ignore
    canvas._centerObject(object, center);
  };

  const addToCanvas = (object: fabric.Object) => {
    center(object);
    canvas.add(object);
    canvas.setActiveObject(object);
  };

  return {
    changeFillColor: (value: string) => {
      setFillColor(value);
      canvas.getActiveObjects().forEach((object) => {
        object.set({ fill: value });
      });
      canvas.renderAll();
    },

    changeStrokeColor: (value: string) => {
      setStrokeColor(value);
      canvas.getActiveObjects().forEach((object) => {
        if (isTextType(object.type)) {
          object.set({ fill: value });
        }
        object.set({ stroke: value });
      });
      canvas.renderAll();
    },

    changeStrokeWidth: (value: number) => {
      setStrokeWidth(value);
      canvas.getActiveObjects().forEach((object) => {
        object.set({ strokeWidth: value });
      });
      canvas.renderAll();
    },
    changeStrokeDashArray: (value: number[]) => {
      setStrokeDashArray(value);
      canvas.getActiveObjects().forEach((object) => {
        object.set({ strokeDashArray: value });
      });
      canvas.renderAll();
    },
    addCircle: () => {
      const object = new fabric.Circle({
        ...CIRCLE_OPTIONS,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
        strokeDashArray: strokeDashArray,
      });

      addToCanvas(object);
    },

    addSquare: () => {
      const object = new fabric.Rect({
        ...SQUARE_OPTIONS,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
        strokeDashArray: strokeDashArray,
      });

      addToCanvas(object);
    },

    addTriangle: () => {
      const object = new fabric.Triangle({
        ...TRIANGLE_OPTIONS,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
        strokeDashArray: strokeDashArray,
      });

      addToCanvas(object);
    },
    addDiamond: () => {
      const object = new fabric.Polygon(
        [
          { x: shapeWidth / 2, y: 0 },
          { x: shapeWidth, y: shapeHeight / 2 },
          { x: shapeWidth / 2, y: shapeHeight },
          { x: 0, y: shapeHeight / 2 },
        ],
        {
          ...DIAMOND_OPTIONS,
          fill: fillColor,
          stroke: strokeColor,
          strokeWidth: strokeWidth,
          strokeDashArray: strokeDashArray,
        }
      );
      addToCanvas(object);
    },

    addStar: () => {
      const width = 400;
      const height = 400;
      const centerX = width / 2;
      const centerY = height / 2;
      const outerRadius = width / 2;
      const innerRadius = outerRadius * 0.4;
      const numPoints = 5;

      var points = [];
      for (let i = 0; i < numPoints * 2; i++) {
        const radius = i % 2 === 0 ? outerRadius : innerRadius;
        const angle = (Math.PI / numPoints) * i;
        points.push({
          x: centerX + radius * Math.sin(angle),
          y: centerY - radius * Math.cos(angle),
        });
      }
      const object = new fabric.Polygon(points, {
        ...STAR_OPTIONS,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
        strokeDashArray: strokeDashArray,
      });

      addToCanvas(object);
    },

    getActiveFillColor: () => {
      const activeObject = selectedObjects[0];
      if (!activeObject) {
        return fillColor;
      }
      const fillValue = activeObject.get("fill") || fillColor;

      //we converted rgba object to string (refer utils) so we know type will be as string only
      return fillValue as string;
    },

    getActiveStrokeColor: () => {
      const activeObject = selectedObjects[0];
      if (!activeObject) {
        return strokeColor;
      }
      const strokeValue = activeObject.get("stroke") || strokeColor;
      return strokeValue;
    },

    getActiveStrokeWidth: () => {
      const activeObject = selectedObjects[0];
      if (!activeObject) {
        return strokeWidth;
      }
      const strokeValue = activeObject.get("strokeWidth") || strokeWidth;
      return strokeValue;
    },
    getActiveStrokeDashArray: () => {
      const activeObject = selectedObjects[0];
      if (!activeObject) {
        return strokeDashArray;
      }
      const strokeValue = activeObject.get("strokeDashArray") || strokeDashArray;
      return strokeValue;
    },
    canvas,
    selectedObjects,
  };
};

export const useEditor = ({ clearSelectionCallback }: EditorHookProps) => {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [selectedObjects, setSelectedObjects] = useState<fabric.Object[]>([]);
  const [fillColor, setFillColor] = useState<string>(FILL_COLOR);
  const [strokeColor, setStrokeColor] = useState<string>(STROKE_COLOR);
  const [strokeWidth, setStrokeWidth] = useState<number>(STROKE_WIDTH);
  const [strokeDashArray, setStrokeDashArray] =
    useState<number[]>(STROKE_DASH_ARRAY);

  // auto resize canvas
  useAutoResize({ canvas, container });

  // canvas events
  useCanvasEvents({
    canvas,
    container,
    setSelectedObjects,
    clearSelectionCallback,
  });

  // editor methods
  const editor = useMemo(() => {
    if (canvas) {
      return buildEditor({
        canvas,
        selectedObjects,
        fillColor,
        strokeColor,
        strokeWidth,
        strokeDashArray,
        setFillColor,
        setStrokeColor,
        setStrokeWidth,
        setStrokeDashArray,
      });
    }
    return undefined;
  }, [canvas, fillColor, strokeColor, strokeWidth, selectedObjects]);

  // initialize editor
  const init = useCallback(
    ({
      initialCanvas,
      initialContainer,
    }: {
      initialCanvas: fabric.Canvas;
      initialContainer: HTMLDivElement;
    }) => {
      fabric.Object.prototype.set({
        cornerColor: "#fff",
        cornerStyle: "circle",
        borderColor: "#3b82f6",
        borderScaleFactor: 1.5,
        transparentCorners: false,
        borderOpacityWhenMoving: 1,
        cornerStrokeColor: "#3b82f6",
      });

      const initialWorkspace = new fabric.Rect({
        width: 900,
        height: 1200,
        name: "clip",
        fill: "white",
        selectable: false,
        hasControls: false,
        shadow: new fabric.Shadow({
          color: "rgba(0,0,0,0.8)",
          blur: 5,
        }),
      });
      initialCanvas.setWidth(initialContainer.offsetWidth);
      initialCanvas.setHeight(initialContainer.offsetHeight);
      initialCanvas.add(initialWorkspace);
      initialCanvas.centerObject(initialWorkspace);
      initialCanvas.clipPath = initialWorkspace;

      setCanvas(initialCanvas);
      setContainer(initialContainer);
    },
    []
  );

  return { init, editor };
};
