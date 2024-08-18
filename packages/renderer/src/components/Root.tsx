import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

export function Root(el: HTMLElement | string, App: React.FC) {
  return createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
