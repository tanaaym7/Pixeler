import { fabric } from "fabric";
import { useCallback, useMemo, useState } from "react";
import { useAutoResize } from "./use-auto-resize";
import {
  BuildEditorProps,
  CIRCLE_OPTIONS,
  editorMethods,
  FILL_COLOR,
  SQUARE_OPTIONS,
  STROKE_COLOR,
  STROKE_DASH_ARRAY,
  STROKE_WIDTH,
  TRIANGLE_OPTIONS,
  DIAMOND_OPTIONS,
  STAR_OPTIONS,
} from "../types";

const buildEditor = ({ canvas }: BuildEditorProps) => {
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
    addCircle: () => {
      const object = new fabric.Circle({
        ...CIRCLE_OPTIONS,
      });

      addToCanvas(object);
    },

    addSquare: () => {
      const object = new fabric.Rect({
        ...SQUARE_OPTIONS,
      });

      addToCanvas(object);
    },

    addTriangle: () => {
      const object = new fabric.Triangle({
        ...TRIANGLE_OPTIONS,
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
      });

      addToCanvas(object);
    },
  };
};

export const useEditor = () => {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  useAutoResize({ canvas, container });

  const editor = useMemo(() => {
    if (canvas) {
      return buildEditor({ canvas });
    }
    return undefined;
  }, [canvas]);

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

      const initialWorksapce = new fabric.Rect({
        width: 900,
        height: 1200,
        name: "clip",
        fill: "#777777",
        selectable: false,
        hasControls: false,
        shadow: new fabric.Shadow({
          color: "rgba(0,0,0,0.8)",
          blur: 5,
        }),
      });

      initialCanvas.setWidth(initialContainer.offsetWidth);
      initialCanvas.setHeight(initialContainer.offsetHeight);
      initialCanvas.add(initialWorksapce);
      initialCanvas.centerObject(initialWorksapce);
      initialCanvas.clipPath = initialWorksapce;

      setCanvas(initialCanvas);
      setContainer(initialContainer);
    },
    []
  );

  return { init, editor };
};
