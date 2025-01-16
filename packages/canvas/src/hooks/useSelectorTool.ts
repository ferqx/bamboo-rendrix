import type { RenderNode } from '@bamboo-rendrix/renderer';
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

  let mutationObserver: MutationObserver;

  const setSelectorTool = (node: RenderNode) => {
    if (!node.el) {
      return;
    }
    const rect = getElementRect(node.el);
    setState({
      x: rect.x,
      y: rect.y,
      width: rect.width,
      height: rect.height,
      visible: true,
      settingVisible: false,
      selectedNode: node,
    });
    watchElementResizeObserve(node.el);
  };

  /**
   * 获取元素的坐标和宽高
   */
  const getElementRect = (el: HTMLElement) => {
    const rect = el.getBoundingClientRect();

    const { x, y, height } = rect;

    let { width } = rect;

    const _x = x < 0 ? 0 : x;

    const _y = y > el.ownerDocument.body.offsetWidth ? el.ownerDocument.body.offsetWidth : y;

    if (x < 0) {
      width = x < 0 ? width + x : width;
    } else if (x + width > el.ownerDocument.body.offsetWidth) {
      width = x + width > el.ownerDocument.body.offsetWidth ? el.ownerDocument.body.offsetWidth - x : width;
    }

    return {
      x: _x,
      y: _y,
      width,
      height,
    };
  };

  /**
   * 更新选择工具
   * @param node
   * @returns
   */
  const updateSelectorTool = () => {
    const targetElement = stateRef.current.selectedNode?.el as HTMLElement;

    if (!targetElement) {
      return;
    }

    const rect = getElementRect(targetElement);

    setState((prevState) => ({
      ...prevState,
      ...rect,
      visible: true,
    }));
  };

  /**
   * 监听所选择的元素大小变化
   */
  const watchElementResizeObserve = (el: HTMLElement) => {
    mutationObserver?.disconnect();
    mutationObserver = new MutationObserver(() => updateSelectorTool());
    mutationObserver.observe(el, { attributes: true, subtree: true, childList: true });
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

  return {
    get state() {
      return stateRef.current;
    },
    options,
    setSelectorTool,
    updateSelectorTool,
    clearSelectorTool,
  };
}
