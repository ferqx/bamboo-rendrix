import { ActionBar } from './ActionBar';
import { ActiveBar } from './ActiveBar';

/**
 * 布局结构：活动栏、顶部工具栏、侧边栏、画布（暂时不支持自定义）
 */
export class Layout {
  /**
   * 活动栏
   */
  activeBar!: ActiveBar;

  /**
   * 顶部工具栏
   */
  topToolBar!: ActionBar;

  constructor() {
    this.activeBar = new ActiveBar([]);
    this.topToolBar = new ActionBar([]);
  }
}
