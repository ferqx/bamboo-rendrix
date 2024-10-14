import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Renderer, RendererOptions } from '../core';
import TreeRenderer from '../components/TreeRenderer';
import { RendererProvider } from '../components/RendererProvider';

/**
 * 创建react实例
 */
export function useRenderer() {
  /**
   * 挂载渲染器
   */
  const mountRenderer = (el: HTMLElement, options: RendererOptions) => {
    if (!el) {
      console.error('el is required');
      return;
    }
    const renderer = new Renderer(options) as Renderer;
    // 触发自定义事件 - 由画布模块监听
    const customEvent = new CustomEvent('renderDone', {
      detail: { renderer },
    });
    window.parent?.dispatchEvent(customEvent);

    // 渲染
    createRoot(el).render(
      <StrictMode>
        <RendererProvider options={options}>
          <TreeRenderer node={renderer.rootNode} />
        </RendererProvider>
      </StrictMode>,
    );
  };
  return { mountRenderer };
}
