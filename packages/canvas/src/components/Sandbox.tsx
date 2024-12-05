import { useEffect, useRef } from 'react';
import type { Renderer } from '@bamboo-code/renderer';

export interface SandboxProps {
  src: string;
  done: (iframeWindow: Window, renderer: Renderer) => void;
}

export const Sandbox = ({ src, done }: SandboxProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const renderDone = (data: Event) => {
      const { detail } = data as CustomEvent;
      if (!iframeRef.current?.contentWindow) {
        return;
      }
      done(iframeRef.current.contentWindow!, detail.renderer);
    };
    window.addEventListener('renderDone', renderDone);
    return () => {
      window.removeEventListener('renderDone', renderDone);
    };
  }, []);

  return <iframe ref={iframeRef} src={src} className="bm-canvas-sandbox"></iframe>;
};
