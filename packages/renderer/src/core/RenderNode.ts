import { v1 as uuid } from 'uuid';
import { type RenderSchema } from '@bamboo/protocol';

import { RootRenderNode } from './RootRenderNode';
import { RenderTextNode } from './RenderTextNode';
import { Renderer } from './Renderer';
import { ComponentType, ReactElement } from 'react';

/**
 * 渲染节点
 */
export class RenderNode {
  id: string | number;

  get name() {
    return this.material?.name || this.componentName;
  }

  componentName: string;

  component!: ComponentType<Record<string, unknown>>;

  props?: Record<string, unknown>;

  parent?: RenderNode | RootRenderNode;

  private updateCallback: (() => void) | null = null;

  private static domToTreeNodeMap = new WeakMap<HTMLElement, RenderNode>(); // DOM 元素与 TreeNode 的映射

  /**
   * 允许选择
   */
  get allowChoice() {
    return !this.disableAll && !this.material?.disableOperation?.includes('choice');
  }

  /**
   * 允许删除
   */
  get allowDelete() {
    return !this.disableAll && !this.material?.disableOperation?.includes('delete');
  }

  /**
   * 允许移动
   */
  get allowMove() {
    return !this.disableAll && !this.material?.disableOperation?.includes('move');
  }

  /**
   * 允许复制
   */
  get allowCopy() {
    return !this.disableAll && !this.material?.disableOperation?.includes('copy');
  }

  /**
   * 禁止所有操作
   */
  get disableAll() {
    return this.material?.disableOperation?.includes('all');
  }

  children: (RenderNode | RenderTextNode)[] = [];

  get isContainer() {
    return !!this.material?.isContainer;
  }

  /**
   * 组件的物料信息
   * 不建议直接读取该属性值用于判断操作，建议封装一个方法用于判断操作
   */
  get material() {
    return this.renderer?.materials.find((item) => item.componentName === this.componentName);
  }

  get renderer(): Renderer | undefined {
    let parent = this.parent;
    while (parent) {
      if (parent.renderer) {
        return parent.renderer;
      }
      parent = parent.parent!;
    }
  }

  get index(): number {
    const index = this.parent?.children?.findIndex((item) => (item as RootRenderNode)?.id === this.id);
    return typeof index === 'number' ? index : -1;
  }

  constructor(schema: RenderSchema | RenderNode, parent?: RenderNode) {
    this.id = schema.id || uuid();
    this.componentName = schema.componentName;
    this.props = schema.props;
    this.children = (schema.children || []).map((item) => {
      if (typeof item === 'string') {
        return new RenderTextNode(item, this);
      }
      return new RenderNode(item as RenderSchema | RenderNode, this);
    });
    this.parent = parent;
  }

  setUpdateCallback(callback: (() => void) | null): void {
    this.updateCallback = callback;
  }

  /**
   * 新增组件
   */
  add(node: RenderNode | RenderSchema) {
    if (node instanceof RenderNode) {
      node.parent = this;
    } else {
      node = new RenderNode(node, this);
    }
    this.parent?.children.push(node);
  }

  /**
   * 替换当前节点
   */
  replace(node: RenderNode | RenderSchema) {
    if (node instanceof RenderNode) {
      node.parent = this;
    } else {
      node = new RenderNode(node, this);
    }
    this.parent?.children.splice(this.index, 1, node);
  }

  /**
   * 节点前插入一个节点
   */
  insertBefore(node: RenderNode | RenderSchema) {
    if (node instanceof RenderNode) {
      node.parent = this.parent;
    } else {
      node = new RenderNode(node, this.parent);
    }
    this.parent?.children.splice(this.index, 0, node);
    return node;
  }

  /**
   * 节点后插入一个节点
   */
  insertAfter(node: RenderNode | RenderSchema) {
    if (node instanceof RenderNode) {
      node.parent = this.parent;
    } else {
      node = new RenderNode(node, this.parent);
    }
    this.parent?.children.splice(this.index + 1, 0, node);
    return node;
  }

  /**
   * 添加子节点
   */
  appendChild(node: RenderNode | RenderSchema) {
    if (node instanceof RenderNode) {
      node.parent = this;
    } else {
      node = new RenderNode(node, this);
    }
    this.children.push(node);
    return node;
  }

  /**
   * 删除组件
   */
  remove() {
    if (this.parent) {
      this.parent.children.splice(this.index, 1);
    }
  }

  /**
   * 返回schema数据
   */
  toSchema(): RenderSchema {
    return {
      id: this.id,
      componentName: this.componentName,
      props: { ...this.props, style: { ...(this.props?.style || {}) } },
      children: this.children.map((item) => {
        if (item instanceof RenderTextNode) {
          return item.text;
        }
        return item.toSchema();
      }),
    };
  }

  // 通知当前节点及其父节点更新
  notifyUpdate(): void {
    if (this.updateCallback) {
      this.updateCallback();
    }
    if (this.parent) {
      this.parent.notifyUpdate();
    }
  }

  static mapDomToRenderNode(dom: HTMLElement, node: RenderNode): void {
    RenderNode.domToTreeNodeMap.set(dom, node);
  }

  static getRenderNodeFromDom(dom: HTMLElement): RenderNode | undefined {
    return RenderNode.domToTreeNodeMap.get(dom);
  }
}
