import type { AssetSchema, MaterialSchema, RenderSchema } from '@bamboo/protocol';
import { RenderNode } from './RenderNode';
import { RootRenderNode } from './RootRenderNode';
import { ResourceManager } from './ResourceManager';

export interface RendererOptions {
  schema: RenderSchema;
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

  /**
   * 资源管理
   */
  resourceManager: ResourceManager;

  /**
   * 资产数据
   */
  private _assets: AssetSchema[] = [];

  public get assets(): AssetSchema[] {
    return this._assets;
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

  constructor(options: RendererOptions) {
    const { assets, schema } = options;
    this.resourceManager = new ResourceManager();
    this.rootNode = new RootRenderNode(schema, this);
    this.assets = assets || [];
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

      if (curNode?.id === id) {
        return curNode;
      }

      curNode?.children.forEach((child) => {
        if (child instanceof RenderNode || child instanceof RootRenderNode) {
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

      if (RenderNode.getRenderNodeFromDom(el)) {
        return curNode;
      }

      curNode?.children.forEach((child) => {
        if (child instanceof RenderNode || child instanceof RootRenderNode) {
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
  moveNode(curNode: RenderNode, targetNode: RenderNode, pops: 1 | 0 | -1) {
    if (curNode === targetNode || curNode.id === targetNode.id) {
      return;
    }

    curNode.remove();

    switch (pops) {
      case 1:
        return targetNode.insertBefore(curNode);
      case 0:
        return targetNode.appendChild(curNode);
      default:
        return targetNode.insertAfter(curNode); // -1
    }
  }
}