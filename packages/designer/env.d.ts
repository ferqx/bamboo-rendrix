/// <reference types="vite/client" />

import type { Renderer, DRAG_DATA } from '@bamboo/renderer';

declare module '*.svg';
declare module '*.png';

declare global {
  interface Window {
    dragData: string;
    renderer: Renderer;
    [DRAG_DATA]: string;
  }
}
