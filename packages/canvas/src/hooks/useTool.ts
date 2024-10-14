import { useState } from 'react';
import { RenderSchema } from '@bamboo/protocol';
import { ChangeType, RenderNode, Renderer, RootRenderNode } from '@bamboo/renderer';
import { usePlaceholderTool } from './usePlaceholderTool';
import { SelectorToolOptions, useSelectorTool } from './useSelectorTool';
import { useHoverTool } from './useHoverTool';
import { isChildByElement } from '../utils';

export interface CanvasToolOptions extends SelectorToolOptions {
  /**
   * 点击
   */
  onClick?: (node: RenderNode) => void;
}

/**
 * iframe外围的拖住工具处理逻辑
 * 装饰显示逻辑
 * @param iframeWindow 该windows指向iframe window
 */
export function useTool(options?: CanvasToolOptions) {
  let targetNode: RootRenderNode | RenderNode | undefined;

  const [isDragIng, setIsDrag] = useState(false);

  const placeholderTool = usePlaceholderTool();

  const selectorTool = useSelectorTool(options);

  const hoverTool = useHoverTool();

  const initEvent = (iframeWindow: Window, renderer: Renderer) => {
    // 监听节点移动
    iframeWindow.addEventListener('dragover', (e) => {
      e.preventDefault();

      setIsDrag(true);

      // 1. 找到当前拖拽的节点
      // 2. 找到目标节点-之前还是之后
      // 3. 设置占位符 - 占位符的宽度与目标节点的宽度一致
      const targetElement = renderer.getElement(e.target as HTMLElement);

      if (!targetElement) {
        clearState();
        return;
      }

      targetNode = renderer.getNodeByElement(targetElement);

      if (!targetNode) {
        return;
      }

      const dragData = JSON.parse(iframeWindow.dragData || '{}') as RenderSchema;

      const dragNode = dragData.id ? renderer.getNodeById(dragData.id) : undefined;

      const dragElement: HTMLElement | undefined = dragNode?.el as HTMLElement;

      const { x, y } = e;

      // 目标节点如果是容器
      if (targetNode?.isContainer && targetNode.children.length === 0) {
        placeholderTool.state.pops = 0;
        placeholderTool.clearPlaceholder();
        return;
      }

      // 如果目标节点是容器，并且存在子节点，表明拖拽过程中移动到了容器的空白区域
      if (targetNode?.isContainer && targetNode.children.length > 0) {
        targetNode = targetNode.children[targetNode.children.length - 1] as RenderNode;
        targetNode.el && placeholderTool.setTargetPlaceholder(targetNode.el, 'bottom');
        return;
      }

      // 如果是根节点，不允许节点在拖拽时展示placeholderTool占位
      if ((targetNode as RootRenderNode).isRoot) {
        clearState();
        return;
      }

      // 父组件schema 定义了子 schema 后，通常只允许添加该协议组件
      if (targetNode.parent?.material?.childSchema?.find((item) => item.componentName === targetNode?.componentName)) {
        clearState();
        return;
      }

      // 如果目标节点是当前节点的子节点，不允许进行拖拽交互
      if (dragElement && isChildByElement(dragElement, targetElement)) {
        clearState();
        return;
      }

      const { left, right, top, bottom, height, width } = targetElement.getBoundingClientRect();

      // 判断移动方向, 判断左、右时可能还需要更为精准的判断的逻辑
      if (x > left && x < left + width / 24) {
        placeholderTool.setTargetPlaceholder(targetElement, 'left');
      } else if (x < right && x > right - width / 24) {
        placeholderTool.setTargetPlaceholder(targetElement, 'right');
      } else if (y > top && y < top + height / 2) {
        placeholderTool.setTargetPlaceholder(targetElement, 'top');
      } else if (y < bottom && y > bottom - height / 2) {
        placeholderTool.setTargetPlaceholder(targetElement, 'bottom');
      }
    });
    // 拖拽放下
    iframeWindow.addEventListener('drop', (e) => {
      e.stopPropagation();

      setIsDrag(false);

      const dragData = e.dataTransfer?.getData('data');

      if (!targetNode || !dragData) {
        return;
      }

      // 如果存在子节点的数量限制，不允许节点在拖拽时能够通过placeholderTool占位
      if (targetNode.parent?.childLimit && targetNode.parent.children.length + 1 > targetNode.parent.childLimit) {
        return;
      }

      const data: RenderSchema = JSON.parse(dragData);

      // 获取未来的父节点
      const parentNode = targetNode.isContainer ? targetNode : targetNode.parent!;

      const dragNode =
        e.dataTransfer?.effectAllowed === 'move'
          ? renderer.getNodeById(data.id!)
          : new RenderNode({ ...data, id: undefined }, parentNode);

      if (!dragNode) {
        return;
      }

      // 判断节点是否可以拖入到目标节点之中
      if (dragNode?.allowToParents && !dragNode?.allowToParents.includes(parentNode.componentName)) {
        clearState();
        return;
      }

      // 如果是move类型，表明拖拽中的节点是画布中的节点
      if (e.dataTransfer?.effectAllowed === 'move') {
        renderer.moveNode(dragNode!, targetNode!, placeholderTool.state.pops);
      } else if (e.dataTransfer?.effectAllowed === 'copy') {
        // 从外部拖入到画布中，插入新的节点
        if (placeholderTool.state.pops === 1) {
          targetNode?.insertBefore(dragNode);
        } else if (placeholderTool.state.pops === -1) {
          targetNode?.insertAfter(dragNode);
        } else {
          targetNode?.appendChild(dragNode);
        }
      }
      placeholderTool.clearPlaceholder();
    });
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
      true, // 事件捕获机制：由上至下，配合e.stopPropagation();可以避免子元素的事件被触发
    );
    // 滚动事件监听
    iframeWindow.addEventListener('scroll', () => {
      if (selectorTool.state.selectedNode) {
        selectorTool.updateSelectorTool();
      }
      if (hoverTool.state.target) {
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

          hoverTool.state.target = targetElement;
          hoverTool.updateHoverTool();
        }
      });
    });
    iframeWindow.addEventListener('resize', () => {
      selectorTool.updateSelectorTool();
    });
    // 监听外部的组件拖动，并清除画布中的状态
    window.addEventListener('dragenter', clearState);
    window.addEventListener('mouseover', clearState);

    renderer.onNodeChange((e) => {
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
  };

  /**
   * 清空占位、hover状态
   */
  const clearState = () => {
    setIsDrag(false);
    if (targetNode) {
      clearDragHoverStyle(targetNode);
    }
    targetNode = undefined;
    placeholderTool.clearPlaceholder();
    hoverTool.clearHoverTool();
  };

  /**
   * 清空容器hover样式
   * @param targetNode
   */
  const clearDragHoverStyle = (targetNode: RenderNode | RootRenderNode) => {
    (targetNode.el as HTMLElement)?.querySelector('.drag-hover')?.classList.remove('drag-hover');
  };

  const onDelete = () => {
    selectorTool.state.selectedNode?.remove();
    selectorTool.clearSelectorTool();
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