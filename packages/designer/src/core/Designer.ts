import type { Canvas, CanvasOptions } from '@bamboo-rendrix/canvas';
import { Layout } from './layout';
import { MaterialMange } from './Material';
import { AssetsMange } from './Assets';
import { ExtensionManage } from './Extension';

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

  canvas!: Canvas;

  get renderer() {
    return this.canvas.renderer;
  }

  materialMange: MaterialMange = new MaterialMange();

  assetsMange: AssetsMange = new AssetsMange(this.materialMange);

  extensionManage: ExtensionManage;

  constructor(options: DesignerOptions) {
    this.options = options;
    this.layout = new Layout();
    this.extensionManage = new ExtensionManage(this, []);
  }
}
