import { ActionBar } from './ActionBar';
import { ActivityBar } from './ActivityBar';

/**
 * 布局结构：活动栏、顶部工具栏、侧边栏、画布（暂时不支持自定义）
 */
export class Layout {
  /**
   * 活动栏
   */
  activityBar!: ActivityBar;

  /**
   * 顶部工具栏
   */
  topToolBar!: ActionBar;

  constructor() {
    this.activityBar = new ActivityBar([]);
    this.topToolBar = new ActionBar([]);
  }
}
