/// <reference types="vite/client" />

import { DRAG_DATA } from './src/constant';

declare module '*.svg';
declare module '*.png';

declare global {
  interface Window {
    [DRAG_DATA]: string;
  }
}
