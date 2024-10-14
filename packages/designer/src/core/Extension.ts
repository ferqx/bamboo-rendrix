import type { AssetSchema, MaterialSchema } from '@bamboo/protocol';
import { type Designer } from './Designer';
import { type Layout } from './layout';
import { AssetsMange } from './Assets';
import { MaterialMange } from './Material';

export interface ExtensionApi {
  layout: Layout;
  assetsMange: AssetsMange;
  materialMange: MaterialMange;
  assets: AssetSchema[];
  materials: MaterialSchema[];
}

/**
 * 扩展接口，扩展接口会对扩展暴露有限的api
 * 支持扩展布局，但是又不影响其他扩展
 * 支持添加物料
 */
export interface Extension {
  install(api: ExtensionApi): void;
}

export class APIProxy {
  private originalAPI: Designer;

  constructor(originalAPI: Designer) {
    this.originalAPI = originalAPI;
  }

  /**
   * 返回有限api
   */
  getLimitedAPI(): ExtensionApi {
    const { layout, assetsMange, materialMange } = this.originalAPI;
    return {
      layout,
      assetsMange: assetsMange,
      materialMange: materialMange,
      get assets() {
        return assetsMange.assets;
      },
      get materials() {
        return materialMange.materials;
      },
    };
  }
}
