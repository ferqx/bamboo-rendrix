/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ComponentType } from 'react';
import { builtComponents } from '../components/BuiltComponents';

export interface ComponentMeta {
  name: string;
  component: ComponentType<any>;
}

export class ComponentManager {
  private components: Map<string, ComponentType<any>> = new Map();

  constructor() {
    Object.entries(builtComponents).forEach(([name, component]) => {
      this.components.set(name, component);
    });
  }

  /**
   * 注册组件
   */
  registerComponent(name: string, component: ComponentType<any>): void {
    // 内置组件可以被覆盖，但是自定义组件不可以被覆盖
    if (!(name in builtComponents) && this.components.has(name)) {
      throw new Error(`Component with name ${name} is already registered.`);
    }
    this.components.set(name, component);
  }

  // 获取组件
  getComponent(name: string): ComponentType<any> | undefined {
    return this.components.get(name);
  }
}
