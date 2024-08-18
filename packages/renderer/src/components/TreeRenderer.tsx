import { useState, useEffect, ReactElement } from 'react';
import { RenderNode, RenderTextNode } from '../core';

type TreeRendererProps = {
  renderNode: RenderNode | RenderTextNode;
};

function TreeRenderer<T>({ renderNode }: TreeRendererProps): ReactElement {
  const [, setVersion] = useState(0); // 用于触发组件更新

  if (renderNode instanceof RenderTextNode) {
    return <>{renderNode.text}</>;
  }

  useEffect(() => {
    // 设置更新回调，当 TreeNode 更新时触发组件重新渲染
    renderNode.setUpdateCallback(() => setVersion((version) => version + 1));

    // 清除回调
    return () => renderNode.setUpdateCallback(null);
  }, [renderNode]);

  const Component = renderNode.component;

  return (
    <Component {...renderNode.props}>
      {renderNode.children.map((child) => (
        <TreeRenderer key={child.id} renderNode={child} />
      ))}
    </Component>
  );
}

export default TreeRenderer;
