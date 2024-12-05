import { type MaterialSchema } from './Material';

/**
 * 资源配置
 * 包含：es、umd、css
 */
export interface Manifest {
  es: string;
  umd: string;
  css?: string;
}

export interface AssetSchema {
  /**
   * 唯一标识 - 通常是库的英文名称
   */
  id: number | string;
  /**
   * 中文名称
   */
  name: string;
  /**
   * 库版本号
   */
  version: string;
  /**
   * 资源信息
   */
  manifest?: Manifest;
  /**
   * 全局变量名
   */
  globalName?: string;
  /**
   * 组件列表
   */
  components: MaterialSchema[];
}
