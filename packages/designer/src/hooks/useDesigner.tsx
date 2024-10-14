import { useMemo } from 'react';
import { CanvasOptions, useCanvas } from '@bamboo/canvas';
import { Designer } from '../core';

export interface DesignerOptions {
  canvas: CanvasOptions;
}

export function useDesigner(options: DesignerOptions) {
  const designer = useMemo(() => new Designer(), []);

  const canvas = useCanvas({
    ...options.canvas,
    sandbox: {
      ...options.canvas.sandbox,
      load(iframeWindow, renderer) {
        designer.renderer = renderer;
        load();
        options.canvas.sandbox.load?.(iframeWindow, renderer);
      },
    },
  });

  designer.canvas = canvas;

  const load = () => {
    // 往渲染器传入协议数据
    designer.renderer.assets = designer.assetsMange.assets;
    // 监听资产变化同步资产到渲染器中
    designer.assetsMange.change = (assets) => {
      designer.renderer.assets = assets;
    };
  };

  return { designer };
}
