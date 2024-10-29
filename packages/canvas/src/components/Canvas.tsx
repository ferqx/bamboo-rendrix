import type { Renderer } from '@bamboo/renderer';
import { Hover } from './tool/Hover';
import { Selector } from './tool/Selector';
import { Placeholder } from './tool/Placeholder';
import { useTool } from '../hooks';
import { Sandbox } from './Sandbox';
import { Canvas, CanvasOptions } from '../core';
import { useMemo } from 'react';

export const CanvasComponent = ({ options }: { options: CanvasOptions }) => {
  const canvas = useMemo(() => new Canvas(options), []);

  const { selectorTool, hoverTool, placeholderTool, initEvent, clearState, onDelete } = useTool(options.tool);

  const onDone = (iframeWindow: Window, renderer: Renderer) => {
    canvas.renderer = renderer;
    initEvent(iframeWindow, renderer);
    options.load?.(iframeWindow, canvas);
    // 渲染器重新加载事件，重置canvasTool状态
    renderer.onReloadChange(() => {
      clearState();
      selectorTool.clearSelectorTool();
    });
  };

  return (
    <div className="bm-canvas">
      <Selector state={selectorTool.state} options={options.tool} delete={onDelete} />
      <Hover state={hoverTool.state} />
      <Placeholder state={placeholderTool.state}></Placeholder>
      <div className="bm-canvas-container">
        <Sandbox src={options.sandbox.src} done={onDone}></Sandbox>
      </div>
    </div>
  );
};
