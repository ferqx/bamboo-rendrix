import type { AssetSchema, MaterialSchema } from '@bamboo-code/protocol';
import { type Designer } from './Designer';
import { type Layout } from './layout';
import { AssetsMange } from './Assets';
import { MaterialMange } from './Material';

export interface ExtensionApi {
  addActivityBar: Layout['activityBar']['add'];
  addAction: Layout['topToolBar']['add'];
  addAsset: AssetsMange['add'];
  addMaterial: MaterialMange['addMaterial'];
  assets: AssetSchema[];
  materials: MaterialSchema[];
}

export type ExtensionFn = (api: ExtensionApi) => void;

export type ExtensionInstallConfig = {
  name: string;
  install: ExtensionFn;
};

/**
 * 返回扩展api集合
 */
function getExtensionAPI(designer: Designer): ExtensionApi {
  const { layout, assetsMange, materialMange } = designer;
  return {
    addActivityBar: layout.activityBar.add.bind(layout.activityBar),
    addAction: layout.topToolBar.add.bind(layout.topToolBar),
    addAsset: assetsMange.add.bind(assetsMange),
    addMaterial: materialMange.addMaterial.bind(materialMange),
    get assets() {
      return assetsMange.assets;
    },
    get materials() {
      return materialMange.materials;
    },
  };
}

/**
 * 扩展管理
 */
export class ExtensionManage {
  private extensionMap = new Map<string, ExtensionFn>();

  constructor(private designer: Designer, objs: ExtensionInstallConfig[]) {
    objs.forEach((item) => {
      this.registerExtension(item.name, item.install);
    });
  }

  getExtension(name: string) {
    return this.extensionMap.get(name);
  }

  /**
   * 注册扩展
   */
  registerExtension(name: string, fn: ExtensionFn): void {
    const fns = Array.from(this.extensionMap.values());

    // 如果已经存在相同的注册函数
    if (fns.includes(fn)) {
      console.info('已注册相同扩展');
      return;
    }

    this.extensionMap.set(name, fn);

    // 运行插件
    fn(getExtensionAPI(this.designer));
  }
}
