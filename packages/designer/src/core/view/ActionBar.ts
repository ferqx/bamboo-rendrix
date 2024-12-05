export interface ActionBarItemOptions {
  /**
   * 名称
   */
  name: string;
  /**
   * 图标
   */
  icon: React.ComponentType;
  /**
   * 是否是按钮形态
   */
  isButton?: boolean;
  /**
   * 点击事件回调
   */
  onClick?: (e: MouseEvent) => void;
}

export class ActionBar {
  /**
   * 动作
   */
  actions: ActionBarItem[] = [];

  constructor(items: ActionBarItemOptions[]) {
    this.actions = items.map((item) => new ActionBarItem(item, this));
  }

  /**
   * 添加活动视图
   */
  add(options: ActionBarItemOptions) {
    this.actions.push(new ActionBarItem(options, this));
  }
}

export class ActionBarItem {
  icon!: React.ComponentType;

  isButton?: boolean;

  parent: ActionBar;

  get index() {
    return this.parent.actions.indexOf(this);
  }

  constructor(
    public options: ActionBarItemOptions,
    parent: ActionBar,
  ) {
    this.icon = options.icon;
    this.isButton = options.isButton;
    this.parent = parent;
  }

  click(e: MouseEvent) {
    this.options.onClick?.(e);
  }

  remove() {
    if (this.index > -1) {
      this.parent.actions.splice(this.index, 1);
    } else {
      console.warn('动作按钮移除失败!');
    }
  }
}
