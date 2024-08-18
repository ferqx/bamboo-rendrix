import { type Manifest } from './Asset';
import { type RenderSchema } from './Schema';

export interface MaterialSchema {
  /**
   * 中文
   */
  name: string;
  /**
   * 组件的名称
   */
  componentName: string;
  /**
   * 全局变量名 - 定义manifest后需要提供globalName
   */
  globalName?: string;
  /**
   * 组件版本
   */
  version?: string;
  /**
   * 图标地址
   */
  icon?: string;
  /**
   * 资源信息 - 非远程组件不需要设置
   */
  manifest?: Manifest;
  /**
   * 是否容器
   */
  isContainer?: boolean;
  /**
   * 禁用操作
   */
  disableOperation?: ('delete' | 'move' | 'copy' | 'choice' | 'drag' | 'all')[];
  /**
   * 片段
   * 该字段是用于当一个组件要展示多种形态时需要的一个设置功能，
   * 如果不设置该字段，会默认取componentName、name、icon字段组合成RenderSchema
   */
  snippets?: {
    /**
     * 中文名称
     */
    name: string;
    icon?: string;
    /**
     * 渲染器识别的schema
     */
    schema: RenderSchema;
  }[];
  /**
   * 子组件限制数
   */
  childLimit?: number;
  /**
   * 子组件协议，通常子组件不展示在组件列表当中，但是会渲染在画布当中并可以被交互
   * 通常，子组件协议定义后，该组件下只能拖拽与子组件协议相关的组件
   */
  childSchema?: MaterialSchema[];
}
