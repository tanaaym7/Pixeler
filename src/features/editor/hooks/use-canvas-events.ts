import { useEffect } from "react";

interface UseCanvasEventsProps {
  save: () => void;
  canvas: fabric.Canvas | null;
  container: HTMLDivElement | null;
  setSelectedObjects: (objects: fabric.Object[]) => void;
  clearSelectionCallback: () => void;
}

export const useCanvasEvents = ({
  save,
  canvas,
  container,
  setSelectedObjects,
  clearSelectionCallback,
}: UseCanvasEventsProps) => {
  useEffect(() => {
    if (!canvas) return;

    canvas.on("object:added", () => {
      save();
    });
    canvas.on("object:removed", () => {
      save();
    });
    canvas.on("object:modified", () => {
      save();
    });
    canvas.on("selection:created", (event) => {
      setSelectedObjects(event.selected || []);
    });

    canvas.on("selection:updated", (event) => {
      setSelectedObjects(event.selected || []);
    });

    canvas.on("selection:cleared", () => {
      setSelectedObjects([]);
      clearSelectionCallback();
    });

    return () => {
      if (canvas) {
        canvas.off("object:added");
        canvas.off("object:removed");
        canvas.off("object:modified");
        canvas.off("selection:created");
        canvas.off("selection:updated");
        canvas.off("selection:cleared");
      }
    };
  }, [canvas, setSelectedObjects, clearSelectionCallback, save]);
};
