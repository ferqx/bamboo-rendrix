import type { RenderNode } from '@bamboo-code/renderer';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';

export interface SelectorToolState {
  x: number;
  y: number;
  width: number;
  height: number;
  visible: boolean;
  settingVisible: false;
  selectedNode?: RenderNode;
}

export type IconFunction = (node: RenderNode) => React.ComponentType;

export type IconType = IconFunction | React.ComponentType;

export type QuickSettingContentFunction = (node: RenderNode) => React.ComponentType;

export interface SelectorToolOptions {
  /**
   * 快捷设置
   */
  quickSetting?: {
    /**
     * 自定义快捷设置容器 - 该api不稳定，未来版本可能会有变化
     */
    content?: React.ComponentType | QuickSettingContentFunction;
  };
  /**
   * 是否覆盖原有的动作
   */
  isCoverAction?: boolean;
  /**
   * 自定义动作
   */
  customActions?: Array<{
    icon: IconType;
    click: (node: RenderNode) => void;
  }>;
}

export function contentIsFunction(value: unknown): value is IconFunction {
  return typeof value === 'function';
}

/**
 * 选择工具
 */
export function useSelectorTool(options?: SelectorToolOptions) {
  const [state, setState] = useState<SelectorToolState>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    visible: false,
    settingVisible: false,
    selectedNode: undefined,
  });

  // 保存state
  const stateRef = useRef(state);
  stateRef.current = state;

  useEffect(() => {
    updateSelectorTool();
    watchElementResizeObserve();
  }, [state.selectedNode]);

  let mutationObserver: MutationObserver;

  const setSelectorTool = (node: RenderNode) => {
    mutationObserver?.disconnect();
    // 重新设置
    setState((prevState) => ({
      ...prevState,
      selectedNode: node,
    }));
  };

  /**
   * 更新选择工具坐标
   */
  const updateSelectorTool = () => {
    const targetElement = stateRef.current.selectedNode?.el as HTMLElement;

    if (!targetElement) {
      return;
    }

    const rect = targetElement.getBoundingClientRect();

    const { x, y, height } = rect;

    let { width } = rect;

    const _x = x < 0 ? 0 : x;

    const _y = y > targetElement.ownerDocument.body.offsetWidth ? targetElement.ownerDocument.body.offsetWidth : y;

    if (x < 0) {
      width = x < 0 ? width + x : width;
    } else if (x + width > targetElement.ownerDocument.body.offsetWidth) {
      width =
        x + width > targetElement.ownerDocument.body.offsetWidth
          ? targetElement.ownerDocument.body.offsetWidth - x
          : width;
    }

    setState((prevState) => ({
      ...prevState,
      x: _x,
      y: _y,
      width,
      height,
      visible: true,
    }));
  };

  /**
   * 监听所选择的元素大小变化
   */
  const watchElementResizeObserve = () => {
    const targetElement = stateRef.current.selectedNode?.el;
    if (!targetElement) {
      return;
    }
    mutationObserver = new MutationObserver(updateSelectorTool);
    mutationObserver.observe(targetElement, { attributes: true, subtree: true, childList: true });
  };

  const clearSelectorTool = () => {
    setState({
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      visible: false,
      settingVisible: false,
      selectedNode: undefined,
    });
    mutationObserver?.disconnect();
  };

  return { state, options, setSelectorTool, watchElementResizeObserve, updateSelectorTool, clearSelectorTool };
}
