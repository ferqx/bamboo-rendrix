import { v1 as uuid } from 'uuid';

export interface ActiveBarItemOptions {
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

export class ActiveBar {
  /**
   * 活动视图
   */
  readonly views: ActiveBarItem[] = [] as const;
  /**
   * 选中ID
   */
  activeId!: string;
  /**
   *  单个模式 - 隐藏活动状态栏和close按钮，默认显示第一个活动状态栏
   */
  singleMode = false;

  constructor(items: ActiveBarItemOptions[]) {
    this.views = items.map((item) => new ActiveBarItem(item, this));
  }

  /**
   * 添加活动视图
   */
  add(options: ActiveBarItemOptions) {
    this.views.push(new ActiveBarItem(options, this));
  }
}

export class ActiveBarItem {
  id: string;
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

  parent: ActiveBar;

  get index() {
    return this.parent.views.indexOf(this);
  }

  constructor(options: ActiveBarItemOptions, parent: ActiveBar) {
    this.id = uuid();
    this.name = options.name;
    this.component = options.component;
    this.visible = !!options.visible;
    this.icon = options.icon;
    this.parent = parent;
  }

  show() {
    this.visible = true;
    this.parent.activeId = this.id;
  }

  hide() {
    this.visible = false;
    this.parent.activeId = '';
  }

  remove() {
    if (this.index > -1) {
      this.parent.views.splice(this.index, 1);
    } else {
      console.warn('活动视图移除失败!');
    }
  }
}
