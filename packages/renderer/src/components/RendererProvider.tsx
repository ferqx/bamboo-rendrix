import { createContext } from 'react';
import { RendererOptions } from '../core';

// 创建上下文
export const RendererContext = createContext<RendererOptions | undefined>(undefined);

// Provider 组件
export const RendererProvider = ({ options, children }: { options: RendererOptions; children: React.ReactNode }) => {
  return <RendererContext.Provider value={options}>{children}</RendererContext.Provider>;
};
