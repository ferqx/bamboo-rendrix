import { Renderer, RendererOptions } from './core';

/**
 * 创建渲染器
 */
const createRenderer = (options: RendererOptions) => {
  const renderer = new Renderer(options) as Renderer;
  // 触发自定义事件 - 由画布模块监听
  const customEvent = new CustomEvent('renderDone', {
    detail: { renderer },
  });
  window.parent?.dispatchEvent(customEvent);
  return renderer;
};

export * from './core';
export * from './constant';
export { createRenderer };
