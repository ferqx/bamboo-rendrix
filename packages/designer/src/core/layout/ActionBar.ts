import React from 'react';
import { v1 as uuid } from 'uuid';

export interface ActionBarItemOptions {
  /**
   * 组件
   */
  component: React.ComponentType;
  /**
   * 方向
   */
  direction: 'left' | 'right';
}

export class ActionBar {
  /**
   * 动作按钮
   */
  readonly actions: ActionBarItem[] = [];

  constructor(items: ActionBarItemOptions[]) {
    this.actions = items.map((item) => new ActionBarItem(item, this));
  }

  /**
   * 添加动作按钮
   */
  add(options: ActionBarItemOptions | ActionBarItemOptions[]) {
    if (Array.isArray(options)) {
      options.forEach((item) => this.actions.push(new ActionBarItem(item, this)));
    } else {
      this.actions.push(new ActionBarItem(options, this));
    }
  }
}

export class ActionBarItem implements ActionBarItemOptions {
  id: string | number;

  component: React.ComponentType;

  parent: ActionBar;

  direction: 'left' | 'right';

  get index() {
    return this.parent.actions.indexOf(this);
  }

  constructor(public options: ActionBarItemOptions, parent: ActionBar) {
    this.id = uuid();
    this.component = options.component;
    this.direction = options.direction;
    this.parent = parent;
  }

  remove() {
    if (this.index > -1) {
      this.parent.actions.splice(this.index, 1);
    } else {
      console.warn('动作按钮移除失败!');
    }
  }
}