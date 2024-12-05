import { useRef } from 'react';
import type { RenderNode } from '../core';

interface DropContainerProps {
  node: RenderNode;
}

const className = 'drag-hover';

export const DropContainer: React.FC<DropContainerProps> = ({ node }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const onDragover = (e: React.DragEvent) => {
    e.preventDefault();
    containerRef.current?.classList.add(className);
  };

  const onDragleave = (e: React.DragEvent) => {
    e.preventDefault();
    containerRef.current?.classList.remove(className);
  };

  return (
    <div ref={containerRef} className="bm-drop-container" onDragOver={onDragover} onDragLeave={onDragleave}>
      拖拽添加组件
    </div>
  );
};
