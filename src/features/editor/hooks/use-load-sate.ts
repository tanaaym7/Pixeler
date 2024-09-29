import { useEffect, useRef } from "react";
import { fabric } from "fabric";
import { JSON_KEYS } from "@/features/editor/types";

type UseLoadStateProps = {
  autoZoom: () => void;
  canvas: fabric.Canvas | null;
  initialState: React.MutableRefObject<string | undefined>;
  canvasHistory: React.MutableRefObject<string[]>;
  setHistoryIndex: React.Dispatch<React.SetStateAction<number>>;
};

export const useLoadState = ({
  autoZoom,
  canvas,
  initialState,
  canvasHistory,
  setHistoryIndex,
}: UseLoadStateProps) => {
  const initialzed = useRef(false);

  useEffect(() => {
    if (!initialzed.current && initialState?.current && canvas) {
      const data = JSON.parse(initialState.current);
      canvas.loadFromJSON(data, () => {
        const currentState = JSON.stringify(canvas.toJSON(JSON_KEYS));

        canvasHistory.current = [currentState];
        setHistoryIndex(0);
        autoZoom();
      });
      initialzed.current = true;
    }
  }, [autoZoom, canvas, initialState, canvasHistory, setHistoryIndex]);
};