import { Renderer } from '@bamboo/renderer';
import { CanvasToolOptions, useTool } from '../hooks';

export interface CanvasOptions {
  load?: (iframeWindow: Window, canvas: Canvas) => void;
  sandbox: {
    src: string;
  };
  tool?: CanvasToolOptions;
}

export class Canvas {
  renderer?: Renderer;

  tool!: ReturnType<typeof useTool>;

  constructor(public options: CanvasOptions, renderer?: Renderer) {
    this.renderer = renderer;
  }

  getSelectionNode() {
    return this.tool.selectorTool.state.selectedNode;
  }

  destroy() {
    this.tool.destroy();
    this.renderer?.unmount();
  }
}
