import React from 'react';
import { RenderSchema } from '@bamboo/protocol';
import { DRAG_ITEM_DATA_ID, DRAG_ITEM_CLASS_NAME } from '../constant';
import { RenderNode } from '../core';

export interface DragProps {
  data: RenderNode | RenderSchema;
  dragType: 'move' | 'copy';
  children?: React.ReactNode;
}

export interface DragWrappedComponentProps {
  draggable: boolean;
  onDragStart: (e: React.DragEvent) => void;
}

/**
 * 高阶组件
 */
export const withDrag = (WrappedComponent: React.ComponentType<any>) => {
  return ({ data, dragType, children }: DragProps) => {
    /**
     * 无渲染组件 - 处理dnd逻辑
     */
    const onDragStart = (e: React.DragEvent) => {
      if (data instanceof RenderNode && !data.allowMove) {
        e.preventDefault();
        return;
      }
      const nodeSchema = JSON.stringify(new RenderNode(data).toSchema());
      e.dataTransfer!.effectAllowed = dragType;
      e.dataTransfer?.setData('data', nodeSchema);
      // 设置预览图
      const snapshot = document.querySelector(
        `.${DRAG_ITEM_CLASS_NAME}[${DRAG_ITEM_DATA_ID}="${data.id || data.componentName}"]`,
      ) as HTMLElement;
      snapshot && e.dataTransfer!.setDragImage(snapshot, -10, -10);
      // 挂载到全局对象上
      window.dragData = nodeSchema;
      e.stopPropagation();
    };

    const props: DragWrappedComponentProps = {
      draggable: true,
      onDragStart,
    };

    return <WrappedComponent {...props}>{children}</WrappedComponent>;
  };
};
