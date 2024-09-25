import { useCallback, useRef, useState } from "react";
import { fabric } from "fabric";
import { JSON_KEYS } from "../types";

interface UseHistoryProps {
  canvas: fabric.Canvas | null;
}

export const useHistory = ({ canvas }: UseHistoryProps) => {
  const [historyIndex, setHistoryIndex] = useState<number>(0);
  const canvasHistory = useRef<string[]>([]);
  const globalSkipSave = useRef<boolean>(false);

  const canUndo = useCallback(() => {
    return historyIndex > 0;
  }, [historyIndex]);

  const canRedo = useCallback(() => {
    return historyIndex < canvasHistory.current.length - 1;
  }, [historyIndex]);

  const save = useCallback(
    (skip = false) => {
      if (!canvas) return;
      const currentState = canvas.toJSON(JSON_KEYS);
      const json = JSON.stringify(currentState);

      if (!skip && !globalSkipSave.current) {
        canvasHistory.current.push(json);
        setHistoryIndex(canvasHistory.current.length - 1);
      }
    },
    [canvas]
  );

  const undo = useCallback(() => {
    if (!canvas) return;
    if (canUndo()) {
      globalSkipSave.current = true;
      canvas?.clear().renderAll();
      const previousIndex = historyIndex - 1;
      const previousState = JSON.parse(canvasHistory.current[previousIndex]);

      canvas?.loadFromJSON(previousState, () => {
        canvas.renderAll();
        setHistoryIndex(previousIndex);
        globalSkipSave.current = false;
      });
    }
  }, [canvas, canUndo, historyIndex]);

  const redo = useCallback(() => {
    if (!canvas) return;
    if (canRedo()) {
      globalSkipSave.current = true;
      canvas?.clear().renderAll();
      const nextIndex = historyIndex + 1;
      const nextState = JSON.parse(canvasHistory.current[nextIndex]);

      canvas?.loadFromJSON(nextState, () => {
        canvas.renderAll();
        setHistoryIndex(nextIndex);
        globalSkipSave.current = false;
      });
    }
  }, [canvas, canRedo, historyIndex]);

  return { save, canUndo, canRedo, undo, redo, setHistoryIndex, canvasHistory };
};
