import { useEffect } from "react";

interface UseCanvasEventsProps {
  canvas: fabric.Canvas | null;
  container: HTMLDivElement | null;
  setSelectedObjects: (objects: fabric.Object[]) => void;
}

export const useCanvasEvents = ({
  canvas,
  container,
  setSelectedObjects,
}: UseCanvasEventsProps) => {
  useEffect(() => {
    if (!canvas) return;

    canvas.on("selection:created", (event) => {
      setSelectedObjects(event.selected || []);
    });

    canvas.on("selection:updated", (event) => {
      setSelectedObjects(event.selected || []);
    });

    canvas.on("selection:cleared", (event) => {
      setSelectedObjects([]);
    });

    return () => {
      if (canvas) {
        canvas.off("selection:created");
        canvas.off("selection:updated");
        canvas.off("selection:cleared");
      }
    };
  }, [canvas, setSelectedObjects]);
};
