import { StrictMode } from 'react';
import { RendererProvider } from './RendererProvider';
import TreeRenderer from './TreeRenderer';
import { type Renderer } from '../core';

export function RendererComponent(renderer: Renderer) {
  return (
    <StrictMode>
      <RendererProvider options={renderer.options}>
        <TreeRenderer node={renderer.rootNode} />
      </RendererProvider>
    </StrictMode>
  );
}
