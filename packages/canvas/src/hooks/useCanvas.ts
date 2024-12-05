import { useTool } from './useTool';
import type { CanvasOptions } from '../core';

export function useCanvas(options: CanvasOptions) {
  const tool = useTool(options.tool);

  return { tool, options };
}
