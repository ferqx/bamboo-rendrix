/// <reference types="vite/client" />

import type { Renderer } from '@bamboo/renderer';

declare module '*.svg';
declare module '*.png';

declare global {
  interface Window {
    dragData: string;
    renderer: Renderer;
  }
}
