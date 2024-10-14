import { useState } from 'react';

export interface HoverToolState {
  x: number;
  y: number;
  width: number;
  height: number;
  visible: boolean;
  target?: HTMLElement;
}

/**
 * hover工具
 */
export function useHoverTool() {
  const [state, setState] = useState<HoverToolState>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    visible: false,
    target: undefined,
  });

  const clearHoverTool = () => {
    setState((pervState) => ({ ...pervState, visible: false, target: undefined }));
  };

  /**
   * 更新hover工具坐标
   */
  const updateHoverTool = () => {
    if (!state.target) {
      clearHoverTool();
      return;
    }

    let { y, x, height, width } = state.target.getBoundingClientRect();

    const _x = x < 0 ? 0 : x;

    const _y = y > state.target.ownerDocument.body.offsetWidth ? state.target.ownerDocument.body.offsetWidth : y;

    if (x < 0) {
      // 超出最左
      width = x < 0 ? width + x : width;
    } else if (x + width > state.target.ownerDocument.body.offsetWidth) {
      // 超出最右
      width =
        x + width > state.target.ownerDocument.body.offsetWidth
          ? state.target.ownerDocument.body.offsetWidth - x
          : width;
    } else {
      width = width;
    }

    setState((pervState) => ({ ...pervState, x: _x, y: _y, width, height, visible: true }));
  };

  return { state, updateHoverTool, clearHoverTool };
}
