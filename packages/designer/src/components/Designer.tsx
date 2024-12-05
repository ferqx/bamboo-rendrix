import { CanvasComponent } from '@bamboo-code/canvas';
import { TooltipProvider } from '@bamboo-code/components';
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
