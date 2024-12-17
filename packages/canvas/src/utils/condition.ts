import type { RenderNode } from '@bamboo-rendrix/renderer';

export const isEqualNode = (currentNode: RenderNode, targetNode: RenderNode) => {
  return currentNode.id === targetNode.id || currentNode === targetNode;
};
