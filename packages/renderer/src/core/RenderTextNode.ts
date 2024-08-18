import { v1 as uuid } from 'uuid';
import { RenderNode } from './RenderNode';

/**
 * text节点通常作为某个节点的文本内容，可以进行双击编辑
 */
export class RenderTextNode {
  id: string;

  text: string;

  parent: RenderNode;

  constructor(text: string, parent: RenderNode) {
    this.text = text;
    this.parent = parent;
    this.id = uuid();
  }
}
