import { builtComponents } from '../components/BuiltComponents';
import { ComponentType } from 'react';

// 定义一个接口来描述组件的元数据
export interface ComponentMeta {
  name: string;
  component: ComponentType<any>;
}

// 创建一个类来管理 React 自定义组件
export class ComponentManager {
  private components: Map<string, ComponentType<any>> = new Map();

  constructor() {
    Object.entries(builtComponents).forEach(([name, component]) => {
      this.components.set(name, component);
    });
  }

  // 注册组件
  registerComponent(meta: ComponentMeta): void {
    if (this.components.has(meta.name)) {
      throw new Error(`Component with name ${meta.name} is already registered.`);
    }
    this.components.set(meta.name, meta.component);
  }

  // 获取组件
  getComponent(name: string): ComponentType<any> | undefined {
    return this.components.get(name);
  }
}
