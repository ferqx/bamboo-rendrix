import type { Renderer } from '@bamboo/renderer';
import { Hover } from './tool/Hover';
import { Selector } from './tool/Selector';
import { Placeholder } from './tool/Placeholder';
import { useCanvas } from '../hooks';
import { Sandbox } from './Sandbox';

export interface CanvasProps {
  sandbox: {
    src: string;
  };
}

export const CanvasComponent = ({ tool, options }: ReturnType<typeof useCanvas>) => {
  const onDone = (iframeWindow: Window, renderer: Renderer) => {
    tool.initEvent(iframeWindow, renderer);
    options.sandbox.load?.(iframeWindow, renderer);
    // 渲染器重新加载时，请空选中或其他状态
    renderer.onReloadChange(() => {
      tool.clearState();
      tool.selectorTool.clearSelectorTool();
    });
  };

  return (
    <div className="bm-canvas">
      <Selector state={tool.selectorTool.state} options={tool.selectorTool.options} delete={tool.onDelete} />
      <Hover state={tool.hoverTool.state} />
      <Placeholder state={tool.placeholderTool.state}></Placeholder>
      <div className="bm-canvas-container">
        <Sandbox src={options.sandbox.src} done={onDone}></Sandbox>
      </div>
    </div>
  );
};
