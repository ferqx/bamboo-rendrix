import { v1 as uuid } from 'uuid';
import { type RenderSchema } from '@bamboo-code/types';
import type { Renderer } from './Renderer';
import type { PropertyChange } from './NodeChange';
import { ChangeType, NodeChangeEvent } from './NodeChange';

/**
 * 渲染节点
 */
export class RenderNode {
  id: string | number;

  private _name = '';

  set name(value) {
    this._name = value;
  }

  get name() {
    if (this.material) {
      return this.material.name;
    }
    return this._name || this.componentName;
  }

  componentName: string;

  props: Record<string, unknown>;

  parent?: RenderNode;

  private _renderer: Renderer | undefined;

  set renderer(renderer: Renderer) {
    this._renderer = renderer;
  }

  get renderer(): Renderer | undefined {
    if (this._renderer) {
      return this._renderer;
    }
    let current = this.parent;
    while (current) {
      if (current?.renderer) {
        return (this._renderer = current.renderer);
      }
      current = current?.parent;
    }
  }

  get el(): HTMLElement | null {
    return window.document.querySelector(`[data-id="${this.id}"]`);
  }

  get component() {
    return this.renderer?.componentManager.getComponent(this.componentName);
  }

  get material() {
    return this.renderer?.materials.find((item) => item.componentName === this.componentName);
  }

  public get manifest() {
    return this.material?.manifest;
  }

  public get allowChoice(): boolean {
    return !this.disableAll && !this.material?.disableOperation?.includes('choice');
  }

  public get allowDelete(): boolean {
    return !this.disableAll && !this.material?.disableOperation?.includes('delete');
  }

  public get allowMove(): boolean {
    return !this.disableAll && !this.material?.disableOperation?.includes('move');
  }

  public get allowCopy(): boolean {
    return !this.disableAll && !this.material?.disableOperation?.includes('copy');
  }

  public get disableAll(): boolean {
    return !!this.material?.disableOperation?.includes('all');
  }

  public get isContainer(): boolean {
    return !!this.material?.isContainer;
  }

  public get childLimit(): number {
    return this.material?.childLimit || Number.MAX_VALUE;
  }

  public get allowToParents(): string[] {
    return this.material?.allowToParents || [];
  }

  public get allowChildren(): string[] {
    return this.material?.allowChildren || [];
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

  children: RenderNode[] = [];

  get index(): number {
    const index = this.parent?.children?.findIndex((item) => item?.id === this.id);
    return typeof index === 'number' ? index : -1;
  }

  constructor(schema: RenderSchema | RenderNode, parent?: RenderNode) {
    this.id = schema.id || uuid();
    this.componentName = schema.componentName;
    this.props = schema.props || {};
    this.parent = parent;
    this.children = (schema.children || []).map((item) => {
      return new RenderNode(item as RenderSchema | RenderNode, this);
    });
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
        return item.toSchema();
      }),
    };
  }
}
