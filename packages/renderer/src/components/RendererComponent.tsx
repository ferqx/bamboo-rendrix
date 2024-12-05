import { StrictMode } from 'react';
import { RendererProvider } from './RendererProvider';
import TreeRenderer from './TreeRenderer';
import { type Renderer } from '../core';

export function RendererComponent({ renderer }: { renderer: Renderer }) {
  return (
    <StrictMode>
      <RendererProvider options={renderer.options}>
        <TreeRenderer renderer={renderer} />
      </RendererProvider>
    </StrictMode>
  );
}
