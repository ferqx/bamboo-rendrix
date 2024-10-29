import { Canvas, CanvasOptions } from '@bamboo/canvas';
import { Extension, APIProxy } from './Extension';
import { Layout } from './layout';
import { MaterialMange } from './Material';
import { AssetsMange } from './Assets';

export interface DesignerOptions {
  canvas: CanvasOptions;
}
/**
 * 设计器类
 * 该类是主类，涵盖布局、画布、渲染
 */
export class Designer {
  layout!: Layout;

  options!: DesignerOptions;

  extensions: Extension[] = [];

  canvas!: Canvas;

  get renderer() {
    return this.canvas.renderer;
  }

  materialMange: MaterialMange = new MaterialMange();

  assetsMange: AssetsMange = new AssetsMange(this.materialMange);

  /**
   * 注册扩展
   */
  registerExtension(extension: Extension): void {
    const apiProxy = new APIProxy(this);
    const limitedAPI = apiProxy.getLimitedAPI();
    this.extensions.push(extension);
    extension.install(limitedAPI);
  }

  constructor(options: DesignerOptions) {
    this.options = options;
    this.layout = new Layout();
  }
}
