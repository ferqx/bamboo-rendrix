import type { RendererOptions } from './core';
import { Renderer } from './core';

/**
 * 发送事件通知
 */
const sendEventNotice = (renderer: Renderer) => {
  // 触发自定义事件 - 由画布模块监听
  const customEvent = new CustomEvent('renderDone', {
    detail: { renderer },
  });
  window.parent?.dispatchEvent(customEvent);
};

/**
 * 创建渲染器
 */
export const createRenderer = (options: RendererOptions) => {
  const renderer = new Renderer(options) as Renderer;
  sendEventNotice(renderer);
  return renderer;
};
