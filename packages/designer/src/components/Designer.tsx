import { CanvasComponent } from '@bamboo-rendrix/canvas';
import { TooltipProvider } from '@bamboo-rendrix/components';
import { LayoutComponent } from '../layout';
import type { Designer } from '@/core';

export const DesignerComponent = ({ designer }: { designer: Designer }) => {
  return (
    <TooltipProvider>
      <LayoutComponent layout={designer.layout}>
        <CanvasComponent options={designer.options.canvas}></CanvasComponent>
      </LayoutComponent>
    </TooltipProvider>
  );
};
