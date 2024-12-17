/**
 * 预测
 */
import type { RenderNode } from '@bamboo-rendrix/renderer';

/**
 * 预测光标所在的最近节点
 */
export const nearestNode = (y: number, targetNodes: RenderNode[]) => {
  const _nearestNode = [...targetNodes].reverse().find((item) => {
    if (!item.el) {
      return false;
    }
    const react = item.el.getBoundingClientRect();
    return y > react.y;
  });

  return _nearestNode;
};
