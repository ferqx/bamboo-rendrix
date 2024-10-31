import { type ComponentType } from 'react';
import { v1 as uuid } from 'uuid';
import { type RenderSchema } from '@bamboo/protocol';
import { RootRenderNode } from './RootRenderNode';
import { Renderer } from './Renderer';
import { ChangeType, NodeChangeEvent, PropertyChange } from './NodeChange';
import { RenderTextNode } from './RenderTextNode';

/**
 * 渲染节点
 */
export class RenderNode {
  id: string | number;

  get name() {
    return this.material?.name || this.componentName;
  }

  componentName: string;

  props: Record<string, unknown>;

  parent?: RenderNode | RootRenderNode;

  get el(): HTMLElement | null {
    return window.document.querySelector(`[data-id="${this.id}"]`);
  }

  private _component: ComponentType<any> | undefined;

  get component() {
    if (this._component) {
      return this._component;
    }
    return (this._component = this.renderer?.componentManager.getComponent(this.componentName));
  }

  /**
   * 是否是异步组件
   */
  get isAsyncComponent() {
    return !!this.material?.manifest?.umd;
  }

  /**
   * 远程组件是否注册
   */
  get isInstall() {
    return (
      this.material?.manifest &&
      this.renderer?.resourceManager.isLoad(this.material.manifest.umd || this.material.manifest.es)
    );
  }

  /**
   * 资源信息
   */
  get manifest() {
    return this.material?.manifest;
  }

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

  private _childLimit = Number.MAX_SAFE_INTEGER;

  /**
   * 子组件数量限制
   */
  get childLimit() {
    return this.material?.childLimit || this._childLimit;
  }

  set childLimit(value: number) {
    this._childLimit = value;
  }

  /**
   * 允许拖入到的父节点
   */
  get allowToParents() {
    return this.material?.allowToParents;
  }

  /**
   * 允许拖入的子节点
   */
  get allowChildren() {
    return this.material?.allowChildren;
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
      parent = parent.parent;
    }
  }

  get index(): number {
    const index = this.parent?.children?.findIndex((item) => (item as RootRenderNode)?.id === this.id);
    return typeof index === 'number' ? index : -1;
  }

  constructor(schema: RenderSchema | RenderNode, parent?: RenderNode) {
    this.id = schema.id || uuid();
    this.componentName = schema.componentName;
    this.props = schema.props || {};
    this.children = (schema.children || []).map((item) => {
      if (typeof item === 'string') {
        return new RenderTextNode(item, this);
      }
      return new RenderNode(item as RenderSchema | RenderNode, this);
    });
    this.parent = parent;
  }

  /**
   * 更新组件属性
   */
  setProps(props: Record<string, unknown>, isEmit = true) {
    const propChanges: PropertyChange[] = [];
    Object.entries(props).forEach(([key, value]) => {
      propChanges.push({
        key,
        oldValue: this.props[key],
        newValue: value,
      });
    });

    Object.assign(this.props, props);

    isEmit &&
      this.renderer?.triggerNodeChange(
        new NodeChangeEvent(ChangeType.PROP_CHANGE, this, null, null, null, propChanges),
      );
  }

  /**
   * 替换当前节点
   */
  replace(node: RenderNode | RenderSchema, isEmit = true): RenderNode {
    let newNode: RenderNode;

    if (node instanceof RenderNode) {
      newNode = node;
      newNode.parent = this.parent;
    } else {
      newNode = new RenderNode(node, this.parent);
    }
    this.parent?.children.splice(this.index, 1, newNode);

    isEmit &&
      this.renderer?.triggerNodeChange(
        new NodeChangeEvent(ChangeType.REPLACE, newNode, newNode.parent, this, this.parent),
      );

    return newNode;
  }

  /**
   * 节点前插入一个节点
   */
  insertBefore(node: RenderNode | RenderSchema, isEmit = true): RenderNode {
    let newNode: RenderNode;

    if (node instanceof RenderNode) {
      newNode = node;
      newNode.parent = this.parent;
    } else {
      newNode = new RenderNode(node, this.parent);
    }
    this.parent!.children.splice(this.index, 0, newNode as RenderNode);

    isEmit &&
      this.renderer?.triggerNodeChange(new NodeChangeEvent(ChangeType.ADD, newNode, newNode.parent, null, null));

    return newNode;
  }

  /**
   * 节点后插入一个节点
   */
  insertAfter(node: RenderNode | RenderSchema, isEmit = true): RenderNode {
    let newNode: RenderNode;

    if (node instanceof RenderNode) {
      node.parent = this.parent;
      newNode = node;
    } else {
      newNode = new RenderNode(node, this.parent);
    }
    this.parent?.children.splice(this.index + 1, 0, newNode);

    isEmit &&
      this.renderer?.triggerNodeChange(new NodeChangeEvent(ChangeType.ADD, newNode, newNode.parent, null, null));

    return newNode;
  }

  /**
   * 添加子节点
   */
  appendChild(node: RenderNode | RenderSchema, isEmit = true): RenderNode {
    let newNode: RenderNode;

    if (node instanceof RenderNode) {
      newNode = node;
      newNode.parent = this;
    } else {
      newNode = new RenderNode(node, this);
    }
    this.children.push(newNode);
    isEmit && this.renderer?.triggerNodeChange(new NodeChangeEvent(ChangeType.ADD, newNode, this, null, null));

    return newNode;
  }

  /**
   * 删除组件
   */
  remove(isEmit = true) {
    if (this.parent) {
      const hasNode = this.parent.children.includes(this);

      // 检验逻辑正确性
      if (!hasNode) {
        console.warn('删除失败！该节点未在对应的父节点中,parent不正确,请检查程序!');
        return;
      }

      this.parent.children.splice(this.index, 1);
      isEmit && this.renderer?.triggerNodeChange(new NodeChangeEvent(ChangeType.REMOVE, this, this.parent, null, null));
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
}
