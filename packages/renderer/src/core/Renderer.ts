import type { AssetSchema, MaterialSchema, RenderSchema } from '@bamboo/protocol';
import { RenderNode } from './RenderNode';
import { RootRenderNode } from './RootRenderNode';
import { ResourceManager } from './ResourceManager';
import { ChangeType, NodeChangeEvent } from './NodeChange';
import { DisposableStore, EventEmitter, IDisposable } from './event';
import { ComponentManager } from './ComponentManager';

export interface RendererOptions {
  /**
   * 组件结构
   */
  schema: RenderSchema;
  /**
   * 节点数量限制
   */
  limit?: number;
  /**
   * 是否预览模式 - 预览模式下不允许拖拽
   */
  isPreview?: boolean;
  /**
   * 设计器模式下 - 资产是被动注入
   * 预览模式下 - 资产是主动注入，因为预览模式下渲染器与设计器脱离的结构关系
   */
  assets?: AssetSchema[];
}

/**
 * 渲染器实例
 */
export class Renderer {
  rootNode: RootRenderNode;

  get window() {
    return window;
  }

  /**
   * 资源管理
   */
  readonly resourceManager: ResourceManager;

  /**
   * 组件管理
   */
  readonly componentManager: ComponentManager;

  /**
   * 资产数据
   */
  private _assets: AssetSchema[] = [];

  public get assets(): AssetSchema[] {
    return this._assets;
  }

  private disposables = new DisposableStore();

  private nodeChangeEmitter = new EventEmitter<NodeChangeEvent>();

  private reloadChangeEmitter = new EventEmitter<void>();

  /**
   * 重新加载事件
   */
  onReloadChange(listener: () => void): IDisposable {
    const disposable = this.reloadChangeEmitter.event(listener);
    return this.disposables.add(disposable);
  }

  /**
   * 节点变更事件
   */
  onNodeChange(listener: (e: NodeChangeEvent) => void): IDisposable {
    const disposable = this.nodeChangeEmitter.event(listener);
    return this.disposables.add(disposable);
  }

  /**
   * 触发节点变更事件
   */
  triggerNodeChange(event: NodeChangeEvent): void {
    this.nodeChangeEmitter.fire(event);
  }

  /**
   * 触发重新加载变更事件
   */
  private triggerReloadChange(): void {
    this.reloadChangeEmitter.fire();
  }

  public set assets(value: AssetSchema[]) {
    this._assets = value;
    // 解构 - 返回物料数据
    this.materials = value
      .map((item) => item.components)
      .flat()
      .map((item) => [item, ...(item.childSchema || [])])
      .flat();
  }

  /**
   * 物料数据
   */
  materials: MaterialSchema[] = [];

  constructor(public options: RendererOptions) {
    const { assets, schema, limit } = options;
    this.assets = assets || [];
    this.resourceManager = new ResourceManager();
    this.componentManager = new ComponentManager();
    this.rootNode = new RootRenderNode(schema, this);
    this.rootNode.childLimit = limit || Number.MAX_SAFE_INTEGER;
  }

  reload(schema: RenderSchema) {
    this.rootNode = new RootRenderNode(schema, this);
    this.rootNode.childLimit = this.options.limit || Number.MAX_SAFE_INTEGER;
    this.triggerReloadChange();
  }

  /**
   * 向上查找与renderNode相关联的元素
   */
  getElement(element: HTMLElement) {
    let parentEl: HTMLElement | null = element;
    while (parentEl) {
      // 如果存在ID，表明是与renderNode关联的元素
      if (parentEl.getAttribute('data-id')) {
        return parentEl;
      }
      parentEl = parentEl.parentElement;
    }
  }

  /**
   * TODO: 遍历算法可重用
   */
  getNodeById(id: string | number) {
    const queque: (RootRenderNode | RenderNode)[] = [this.rootNode];

    while (queque.length > 0) {
      const curNode = queque.shift();

      if (String(curNode?.id || '') === String(id)) {
        return curNode;
      }

      curNode?.children.forEach((child) => {
        if (child instanceof RenderNode) {
          queque.push(child);
        }
      });
    }
  }

  /**
   * TODO: 遍历算法可重用
   */
  getNodeByElement(el: HTMLElement): RootRenderNode | RenderNode | undefined {
    const queque: (RootRenderNode | RenderNode)[] = [this.rootNode];

    while (queque.length > 0 && el) {
      const curNode = queque.shift();

      const id = el.getAttribute('data-id');

      if (String(curNode?.id || '') === String(id)) {
        return curNode;
      }

      curNode?.children.forEach((child) => {
        if (child instanceof RenderNode) {
          queque.push(child);
        }
      });
    }
  }

  /**
   * 移动节点
   * @param curNode 当前节点
   * @param targetNode 目标节点
   * @param pops  1 | 0 | -1, 1表示之前,-1表示之后,0 表示拖入到容器中
   */
  moveNode(curNode: RenderNode, targetNode: RenderNode, pops: 1 | 0 | -1, isEmit = true) {
    if (curNode === targetNode || curNode.id === targetNode.id) {
      return;
    }

    curNode.remove(false);

    let newNode: RenderNode;

    const oldParent = curNode.parent;

    switch (pops) {
      case 1:
        newNode = targetNode.insertBefore(curNode, false);
        break;
      case 0:
        newNode = targetNode.appendChild(curNode, false);
        break;
      default:
        newNode = targetNode.insertAfter(curNode, false);
        break;
    }

    isEmit && this.triggerNodeChange(new NodeChangeEvent(ChangeType.MOVE, newNode, newNode.parent, null, oldParent));

    return newNode;
  }

  destroy() {
    this.disposables.dispose();
  }
}
