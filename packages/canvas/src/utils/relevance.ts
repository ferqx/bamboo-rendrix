import { DRAG_ITEM_DATA_ID } from '@bamboo-rendrix/renderer';

export function isChildByElement(curNode: HTMLElement, targetNode: HTMLElement) {
  let parent = targetNode.parentElement;
  while (parent) {
    if (parent === curNode) {
      return true;
    }
    parent = parent.parentElement;
  }
}

export function isElementNode(node: Node): node is HTMLElement {
  return node.nodeType === Node.ELEMENT_NODE;
}

export function isTextNode(node: Node): node is Text {
  return node.nodeType === Node.TEXT_NODE;
}

/**
 * 通过data-id属性获取目标节点以及目标的子节点是否存在data-id属性的元素
 * @param node
 * @param dataId
 * @returns
 */
export function hasDataId(node: Node, dataId: string | number): Element | null {
  if (!isElementNode(node)) {
    return null;
  }

  if (node.getAttribute(DRAG_ITEM_DATA_ID) === String(dataId)) {
    return node;
  }

  return node.querySelector?.(`[${DRAG_ITEM_DATA_ID}="${dataId}"]`);
}
