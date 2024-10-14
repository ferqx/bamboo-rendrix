import type { MaterialSchema } from '@bamboo/protocol';

/**
 * 物料类 - 管理物料组件的信息
 */
export class MaterialMange {
  private components: Map<string, MaterialSchema> = new Map();

  getMaterialItem(key: string) {
    return this.components.get(key);
  }

  get materials() {
    return [...this.components.values()];
  }

  addMaterial(data: MaterialSchema | MaterialSchema[]) {
    if (!Array.isArray(data)) {
      data = [data];
    }
    data.forEach((item) => {
      if (this.components.get(item.componentName)) {
        console.warn(`已存在相同物料名称：${item.componentName}, 物料添加失败!`);
        return;
      }
      this.components.set(item.componentName, item);
    });
  }
}
