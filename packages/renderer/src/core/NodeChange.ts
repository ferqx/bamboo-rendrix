import type { RenderNode } from './RenderNode';

export enum ChangeType {
  ADD = 'add',
  REMOVE = 'remove',
  REPLACE = 'replace',
  MOVE = 'move',
  PROP_CHANGE = 'propChange',
}

export interface PropertyChange {
  key: string;
  oldValue: unknown;
  newValue: unknown;
}

/**
 * 变更信息的数据结构
 */
export class NodeChangeEvent {
  /**
   * 变更类型
   */
  type: ChangeType;

  /**
   * 当前操作节点
   */
  node: RenderNode;

  /**
   * 当前节点的父节点
   */
  parent: RenderNode | null;

  /**
   * 旧节点（替换、复制、移动时使用）
   */
  oldNode: RenderNode | null;

  /**
   * 旧的父节点（移动时使用）
   */
  oldParent: RenderNode | null;

  /**
   * 属性变更信息
   */
  propChanges: PropertyChange[] | null;

  constructor(
    type: ChangeType,
    node: RenderNode,
    parent: RenderNode | null = null,
    oldNode: RenderNode | null = null,
    oldParent: RenderNode | null = null,
    propChanges: PropertyChange[] | null = null,
  ) {
    this.type = type;
    this.node = node;
    this.parent = parent;
    this.oldNode = oldNode;
    this.oldParent = oldParent;
    this.propChanges = propChanges;
  }
}
