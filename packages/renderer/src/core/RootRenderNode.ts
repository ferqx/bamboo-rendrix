import { type RenderSchema } from '@xplatform/data-protocol';
import { RenderNode } from './RenderNode';
import { Renderer } from './Renderer';

/**
 * 根节点
 */
export class RootRenderNode extends RenderNode {
  /**
   * 生命周期
   */
  // lifecycle: {};

  /**
   * root节点children只能是RenderNode实例
   */
  children: RenderNode[] = [];

  private _renderer: Renderer;

  get renderer(): Renderer {
    return this._renderer;
  }

  get name() {
    return '页面';
  }

  get isContainer(): boolean {
    return true;
  }

  get allowDelete(): boolean {
    return false;
  }

  get allowChoice(): boolean {
    return false;
  }

  constructor(schema: RenderSchema, renderer: Renderer) {
    super(schema);
    this._renderer = renderer;
    this.children = (schema.children || [])
      .filter((item) => !(typeof item === 'string'))
      .map((item) => {
        return new RenderNode(item as RenderSchema, this);
      });
  }
}
