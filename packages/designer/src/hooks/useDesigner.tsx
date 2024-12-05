import { useMemo } from 'react';
import { Designer, type DesignerOptions } from '../core';

export function useDesigner(options: DesignerOptions) {
  const designer = useMemo(
    () =>
      new Designer({
        ...options,
        canvas: {
          ...options.canvas,
          load(iframeWindow, canvas) {
            designer.canvas = canvas;
            load();
            options.canvas.load?.(iframeWindow, canvas);
          },
        },
      }),
    [],
  );

  const load = () => {
    if (!designer.renderer) {
      console.error('未找到渲染器！renderer实例不存在!');
      return;
    }
    // 往渲染器传入协议数据
    designer.renderer.assets = designer.assetsMange.assets;
    // 监听资产变化同步资产到渲染器中
    designer.assetsMange.change = (assets) => {
      designer.renderer!.assets = assets;
    };
  };

  return { designer };
}
