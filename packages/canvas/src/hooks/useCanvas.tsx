import { type Renderer } from '@bamboo/renderer';
import { CanvasToolOptions, useTool } from './useTool';

export interface CanvasOptions {
  sandbox: {
    src: string;
    load?: (iframeWindow: Window, renderer: Renderer) => void;
  };
  tool?: CanvasToolOptions;
}

export function useCanvas(options: CanvasOptions) {
  const tool = useTool(options.tool);

  return { tool, options };
}
