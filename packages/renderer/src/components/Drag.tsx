import React from 'react';
import type { RenderSchema } from '@bamboo-rendrix/types';
import { DRAG_ITEM_DATA_ID, DRAG_ITEM_CLASS_NAME, DRAG_DATA } from '../constant';
import { RenderNode } from '../core';

export interface DragProps {
  data: RenderNode | RenderSchema;
  dragType: 'move' | 'copy';
  children?: React.ReactNode;
}

export interface DragWrappedComponentProps {
  data: RenderNode | RenderSchema;
  draggable: boolean;
  onDragStart: (e: React.DragEvent) => void;
  children?: React.ReactNode;
}

/**
 * 高阶组件
 */
export const withDrag = (WrappedComponent: React.ComponentType<DragWrappedComponentProps>) => {
  return ({ data, dragType, children }: DragProps) => {
    /**
     * 无渲染组件 - 处理dnd逻辑
     */
    const onDragStart = (e: React.DragEvent) => {
      if (data instanceof RenderNode && !data.allowMove) {
        e.preventDefault();
        return;
      }
      const nodeSchema = JSON.stringify(data instanceof RenderNode ? data.toSchema() : data);

      // 挂载到全局对象上
      window[DRAG_DATA] = nodeSchema;

      e.dataTransfer!.effectAllowed = dragType;
      e.dataTransfer?.setData('data', nodeSchema);
      // 设置预览图
      const snapshot = document.querySelector(
        `.${DRAG_ITEM_CLASS_NAME}[${DRAG_ITEM_DATA_ID}="${data.id || data.componentName}"]`,
      ) as HTMLElement;
      snapshot && e.dataTransfer!.setDragImage(snapshot, -10, -10);

      e.stopPropagation();
    };

    const props: DragWrappedComponentProps = {
      data,
      draggable: true,
      onDragStart,
    };

    return <WrappedComponent {...props}>{children}</WrappedComponent>;
  };
};
