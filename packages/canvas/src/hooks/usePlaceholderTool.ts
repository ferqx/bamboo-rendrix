import { useState } from 'react';

export type Position = 'left' | 'right' | 'top' | 'bottom';

export interface PlaceholderToolState {
  x: number;
  y: number;
  width: number;
  height: number;
  visible: boolean;
  pops: 1 | 0 | -1;
}

/**
 * 拖拽占位符工具
 */
export function usePlaceholderTool() {
  const [state, setState] = useState<PlaceholderToolState>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    pops: 0,
    visible: false,
  });

  const defaultPx = 4;

  const setPlaceholder = (x: number, y: number, width: number, height: number, pops: 1 | 0 | -1) => {
    setState((prevState) => ({
      ...prevState,
      x,
      y,
      width,
      height,
      pops,
      visible: true,
    }));
  };

  const setTargetPlaceholder = (target: HTMLElement, position: Position) => {
    const { left, right, top, bottom, width, height } = target.getBoundingClientRect();

    if (position === 'top') {
      setPlaceholder(left, top - 2, width, defaultPx, 1);
    } else if (position === 'bottom') {
      setPlaceholder(left, bottom, width, defaultPx, -1);
    } else if (position === 'left') {
      setPlaceholder(left - 2, top, defaultPx, height, 1);
    } else if (position === 'right') {
      setPlaceholder(right, top, defaultPx, height, -1);
    }
  };

  const clearPlaceholder = () => {
    setState((prevState) => ({
      ...prevState,
      visible: false,
    }));
  };

  return { state, setPlaceholder, setTargetPlaceholder, clearPlaceholder };
}
