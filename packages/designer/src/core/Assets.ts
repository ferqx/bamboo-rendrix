import type { AssetSchema } from '@bamboo-code/types';
import type { MaterialMange } from './Material';

/**
 * 远程资产管理
 * 远程资产通常从外部产生，例如第三方扩展。
 * 资产通常携带物料协议信息，物料信息通常是为了描述一个组件，该组件的名称、属性、形态。
 */
export class AssetsMange {
  private _assets = new Set<AssetSchema>();

  get assets() {
    return [...this._assets.values()];
  }

  change!: (assets: AssetSchema[]) => void;

  constructor(private material: MaterialMange) {}

  /**
   * 添加资产
   */
  add(schema: AssetSchema | AssetSchema[]) {
    if (Array.isArray(schema)) {
      schema.forEach((item) => {
        this._assets.add(item);
        this.material.addMaterial(item.components);
      });
    } else {
      this._assets.add(schema);
      this.material.addMaterial(schema.components);
    }
    this.change?.(this.assets);
  }
}
