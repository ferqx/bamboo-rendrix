/// <reference types="vite/client" />

import type { Renderer, DRAG_DATA } from '@bamboo-rendrix/renderer';

declare module '*.svg';
declare module '*.png';

declare global {
  interface Window {
    vue: App;
    Vue: Vue;
    [DRAG_DATA]: string;
  }
}
