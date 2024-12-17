import type { RenderSchema } from '@bamboo-rendrix/types';
import type { Renderer } from '@bamboo-rendrix/renderer';
import { ChangeType, DRAG_DATA, RenderNode } from '@bamboo-rendrix/renderer';
import { usePlaceholderTool } from './usePlaceholderTool';
import type { SelectorToolOptions } from './useSelectorTool';
import { useSelectorTool } from './useSelectorTool';
import { useHoverTool } from './useHoverTool';
import { isChildByElement, nearestNode, isEqualNode } from '../utils';

export interface CanvasToolOptions extends SelectorToolOptions {
  /**
   * 点击
   */
  onClick?: (node: RenderNode) => void;
}

/**
 * 画布交互工具
 */
export function useTool(options?: CanvasToolOptions) {
  let targetNode: RenderNode | undefined;

  let _iframeWindow: Window;

  let isDragIng = false;

  const hoverTool = useHoverTool();
  const placeholderTool = usePlaceholderTool();
  const selectorTool = useSelectorTool();

  const miniHostWidth = 10;

  /**
   * 初始化事件
   */
  const initEvent = (iframeWindow: Window, renderer: Renderer) => {
    _iframeWindow = iframeWindow;

    console.log('initEvent');

    /**
     * 验证父节点是否合法
     * @param parentNode 父节点
     * @param dragNode 拖拽节点
     * @returns 是否合法
     */
    const isValidParent = (parentNode: RenderNode, dragNode: RenderNode) => {
      return (
        (dragNode.allowToParents && !dragNode.allowToParents?.includes(parentNode.componentName)) ||
        (parentNode.allowChildren && !parentNode.allowChildren?.includes(dragNode.componentName))
      );
    };

    /**
     * 判断是否应将占位符设置到中心位置
     * @param targetNode 目标节点
     * @returns 是否应设置到中心位置
     */
    const shouldSetCenterPlaceholder = (targetNode: RenderNode) => {
      return targetNode?.isContainer && targetNode.children.length === 0;
    };

    /**
     * 判断是否应将占位符设置到底部位置
     * @param targetNode 目标节点
     * @returns 是否应设置到底部位置
     */
    const shouldSetBottomPlaceholder = (targetNode: RenderNode) => {
      return targetNode?.isContainer && targetNode.children.length > 0;
    };

    /**
     * 设置占位符位置
     * @param e 拖拽事件
     * @param targetElement 目标元素
     */
    const setPlaceholder = (e: DragEvent, targetElement: HTMLElement) => {
      const { left, right, top, bottom, height, width } = targetElement.getBoundingClientRect();
      const x = e.clientX;
      const y = e.clientY;

      const xHostWidth = width / 24 < miniHostWidth ? miniHostWidth : width / 24;

      // 判断移动方向, 判断左、右时可能还需要更为精准的判断的逻辑
      if (x >= left && x <= left + xHostWidth) {
        placeholderTool.setTargetPlaceholder(targetElement, 'left');
      } else if (x <= right && x >= right - xHostWidth) {
        placeholderTool.setTargetPlaceholder(targetElement, 'right');
      } else if (y >= top && y <= top + height / 4) {
        placeholderTool.setTargetPlaceholder(targetElement, 'top');
      } else if (y <= bottom && y >= bottom - height / 4) {
        placeholderTool.setTargetPlaceholder(targetElement, 'bottom');
      } else {
        placeholderTool.clearPlaceholder();
        e.dataTransfer!.dropEffect = 'none';
      }
    };

    const handleDragOver = (e: DragEvent, renderer: Renderer) => {
      e.preventDefault();
      isDragIng = true;

      // 获取目标元素
      const targetElement = renderer.getElement(e.target as HTMLElement);
      if (!targetElement) return clearState();

      // 获取目标节点
      targetNode = renderer.getNodeByElement(targetElement);
      if (!targetNode) return;

      // 判断是否为复制操作
      const isCopy = e.dataTransfer?.effectAllowed === 'copy';
      const json = isCopy ? window[DRAG_DATA] : iframeWindow[DRAG_DATA];
      if (!json) return;

      // 解析拖拽数据
      const dragData = JSON.parse(json) as RenderSchema;
      const parentNode = targetNode.isContainer ? targetNode : targetNode.parent;
      const dragNode = isCopy ? renderer.createNode(dragData, parentNode) : renderer.getNodeById(dragData.id!)!;
      const dragElement = dragNode?.el;

      // 验证父节点是否合法
      if (!parentNode) {
        e.dataTransfer!.dropEffect = 'none';
        return clearState();
      }

      // 检查是否为同一个节点
      if (isEqualNode(dragNode, targetNode)) {
        e.dataTransfer!.dropEffect = 'none';
        return clearState();
      }

      // 检查拖拽元素是否为目标元素的子元素
      if (dragElement && isChildByElement(dragElement, targetElement)) {
        e.dataTransfer!.dropEffect = 'none';
        return clearState();
      }

      if (
        (dragNode.allowToParents.length > 0 && !dragNode.allowToParents?.includes(parentNode.componentName)) ||
        (parentNode.allowChildren.length > 0 && !parentNode.allowChildren?.includes(dragNode.componentName))
      ) {
        e.dataTransfer!.dropEffect = 'none';
        return clearState();
      }

      // 如果父节点存在子节点的数量限制
      if (parentNode.childLimit && parentNode.children.length >= parentNode.childLimit) {
        e.dataTransfer!.dropEffect = 'none';
        return clearState();
      }

      // 设置占位符到中心位置
      if (shouldSetCenterPlaceholder(targetNode)) {
        placeholderTool.setTargetPlaceholder(targetElement, 'center');
        return;
      }

      // 设置占位符到底部位置
      if (shouldSetBottomPlaceholder(targetNode)) {
        const y = e.clientY;
        targetNode = nearestNode(y, targetNode.children);
        if (targetNode && !isEqualNode(dragNode, targetNode)) {
          targetNode.el && placeholderTool.setTargetPlaceholder(targetNode.el, 'bottom');
        } else {
          e.dataTransfer!.dropEffect = 'none';
          clearState();
        }
        return;
      }

      // 设置占位符位置
      setPlaceholder(e, targetElement);
    };

    const handleDrop = (e: DragEvent, renderer: Renderer) => {
      e.stopPropagation();

      isDragIng = false;

      const dragData = e.dataTransfer?.getData('data');

      if (!targetNode || !dragData) {
        return;
      }

      if (targetNode.parent?.childLimit && targetNode.parent.children.length + 1 > targetNode.parent.childLimit) {
        return;
      }

      const data: RenderSchema = JSON.parse(dragData);
      const parentNode = targetNode.isContainer ? targetNode : targetNode.parent;
      const dragNode =
        e.dataTransfer?.effectAllowed === 'move'
          ? renderer.getNodeById(data.id!)
          : new RenderNode({ ...data, id: undefined }, parentNode);

      if (!dragNode) {
        return;
      }

      if (e.dataTransfer?.effectAllowed === 'move') {
        renderer.moveNode(dragNode!, targetNode!, placeholderTool.pops);
      } else if (e.dataTransfer?.effectAllowed === 'copy') {
        if (placeholderTool.pops === 1) {
          targetNode?.insertBefore(dragNode);
        } else if (placeholderTool.pops === -1) {
          targetNode?.insertAfter(dragNode);
        } else {
          targetNode?.appendChild(dragNode);
        }
      }

      clearDragData();
      placeholderTool.clearPlaceholder();
    };

    iframeWindow.addEventListener('dragover', (e) => handleDragOver(e, renderer));
    iframeWindow.addEventListener('drop', (e) => handleDrop(e, renderer));
    // 拖拽进入
    iframeWindow.addEventListener('dragenter', (e) => e.preventDefault());
    // 拖拽结束
    iframeWindow.addEventListener('dragend', clearState);
    // 点击事件捕获
    iframeWindow.addEventListener(
      'click',
      (e) => {
        // 阻止子元素的事件，需要配合事件捕获机制
        e.stopPropagation();

        const targetElement = renderer.getElement(e.target as HTMLElement);
        if (!targetElement) {
          return;
        }
        targetNode = renderer.getNodeByElement(targetElement);
        if (!targetNode) {
          return;
        }

        options?.onClick?.(targetNode);

        // 如果允许选中
        if (targetNode.allowChoice) {
          selectorTool.setSelectorTool(targetNode);
        }
      },
      true, // 事件捕获机制：由上至下，配合e.stopPropagation()可以避免子元素的事件被触发
    );
    // 滚动事件监听
    iframeWindow.addEventListener('scroll', () => {
      if (selectorTool.state.selectedNode) {
        selectorTool.updateSelectorTool();
      }
      if (hoverTool.state.visible) {
        hoverTool.clearHoverTool();
      }
    });
    iframeWindow.addEventListener('mouseover', (e) => {
      requestAnimationFrame(() => {
        if (!isDragIng) {
          const targetElement = renderer.getElement(e.target as HTMLElement);

          if (!targetElement) {
            hoverTool.clearHoverTool();
            return;
          }

          const targetNode = renderer.getNodeByElement(targetElement);

          if (!targetNode || !targetNode?.parent) {
            hoverTool.clearHoverTool();
            return;
          }
          hoverTool.updateHoverTool(targetElement);
        }
      });
    });
    iframeWindow.addEventListener('resize', selectorTool.updateSelectorTool);
    // 监听外部的组件拖动，并清除画布中的状态
    window.addEventListener('dragenter', clearState);
    window.addEventListener('mouseover', clearState);

    renderer.onNodeChange((e) => {
      renderer.nextTick(() => {
        switch (e.type) {
          case ChangeType.REPLACE:
            e.oldNode === selectorTool.state.selectedNode && selectorTool.clearSelectorTool();
            break;
          case ChangeType.ADD:
            selectorTool.setSelectorTool(e.node);
            break;
          case ChangeType.MOVE:
            selectorTool.updateSelectorTool();
            break;
          case ChangeType.REMOVE:
            selectorTool.clearSelectorTool();
            break;
          case ChangeType.PROP_CHANGE: // 属性的变更可能导致节点发生变化
            selectorTool.updateSelectorTool();
            break;
          default:
            break;
        }
      });
    });
  };

  /**
   * 清空占位、hover状态
   */
  const clearState = () => {
    if (targetNode) {
      clearDragHoverStyle(targetNode);
    }
    isDragIng = false;
    targetNode = undefined;
    placeholderTool.clearPlaceholder();
    hoverTool.clearHoverTool();
  };

  /**
   * 清空dragData
   */
  const clearDragData = () => {
    // 清空掉临时的dragData
    _iframeWindow[DRAG_DATA] = '';
    window[DRAG_DATA] = '';
  };

  /**
   * 清空容器hover样式
   * @param targetNode
   */
  const clearDragHoverStyle = (targetNode: RenderNode) => {
    (targetNode.el as HTMLElement)?.querySelector('.drag-hover')?.classList.remove('drag-hover');
  };

  const onDelete = () => {
    selectorTool.state.selectedNode?.remove();
  };

  const destroy = () => {
    window.removeEventListener('dragenter', clearState);
    window.removeEventListener('mouseover', clearState);
  };

  return {
    initEvent,
    onDelete,
    clearState,
    destroy,
    isDragIng,
    hoverTool,
    selectorTool,
    placeholderTool,
  };
}
