/* eslint-disable @typescript-eslint/no-explicit-any */
import { v1 as uuid } from 'uuid';

export interface ActivityBarItemOptions {
  /**
   * 名称
   */
  name: string;
  /**
   * 视图组件
   */
  component: React.ComponentType;
  /**
   * 是否显示, 如果设置为true页面初始化时默认显示
   */
  visible?: boolean;
  /**
   * 图标
   */
  icon: React.ComponentType;
}

export class ActivityBar {
  /**
   * 活动视图
   */
  readonly views: ActivityBarItem[] = [] as const;
  /**
   *  单个模式 - 隐藏活动状态栏和close按钮，默认显示第一个活动状态栏
   */
  singleMode = false;

  constructor(items: ActivityBarItemOptions[]) {
    this.views = items.map((item) => new ActivityBarItem(item, this));
  }

  /**
   * 添加活动视图
   */
  add(options: ActivityBarItemOptions) {
    this.views.push(new ActivityBarItem(options, this));
  }
}

export class ActivityBarItem {
  id: string;
  /**
   * 名称
   */
  name: string;
  /**
   * 视图组件
   */
  component: React.ComponentType<any>;
  /**
   * 是否显示, 如果设置为true页面初始化时默认显示
   */
  visible?: boolean;
  /**
   * 图标
   */
  icon: React.ComponentType<any>;

  parent: ActivityBar;

  get index() {
    return this.parent.views.indexOf(this);
  }

  constructor(options: ActivityBarItemOptions, parent: ActivityBar) {
    this.id = uuid();
    this.name = options.name;
    this.component = options.component;
    this.visible = !!options.visible;
    this.icon = options.icon;
    this.parent = parent;
  }
}
