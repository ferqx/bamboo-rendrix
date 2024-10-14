import { type useCanvas } from '@bamboo/canvas';
import { Extension, APIProxy } from './Extension';
import { Layout } from './layout';
import { MaterialMange } from './Material';
import { AssetsMange } from './Assets';
import { Renderer } from '@bamboo/renderer';

/**
 * 设计器类
 * 该类是主类，涵盖布局、画布、渲染
 */
export class Designer {
  layout!: Layout;

  extensions: Extension[] = [];

  canvas!: ReturnType<typeof useCanvas>;

  renderer!: Renderer;

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

  constructor() {
    this.layout = new Layout();
  }
}
