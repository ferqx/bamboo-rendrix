import { isTextNode } from './relevance';

export function setCursorPosition(element: Node, index: number) {
  if (element.childNodes.length === 0) {
    // 如果元素为空
    const range = document.createRange();
    const sel = window.getSelection();
    range.setStart(element, 0);
    range.setEnd(element, 0);
    sel?.removeAllRanges();
    sel?.addRange(range);
  } else {
    // 如果元素不为空，将光标设置在文本节点指定位置
    let charIndex = index;
    const nodeStack = [element];
    let node: Node | undefined;
    let foundStart = false;

    while (nodeStack.length > 0 && !foundStart) {
      node = nodeStack.pop();
      if (node && isTextNode(node)) {
        const nextCharIndex = charIndex - node.length;

        if (nextCharIndex <= 0) {
          // 创建一个range, 将光标设置在这个文本节点的charIndex位置
          const range = document.createRange();
          const sel = window.getSelection();
          range.setStart(node, charIndex);
          range.setEnd(node, charIndex);
          sel?.removeAllRanges();
          sel?.addRange(range);
          foundStart = true;
        } else {
          charIndex = nextCharIndex;
        }
      } else {
        if (node?.childNodes) {
          for (let i = node.childNodes.length - 1; i >= 0; i--) {
            nodeStack.push(node.childNodes[i]);
          }
        }
      }
    }
  }
}
