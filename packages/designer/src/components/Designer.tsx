import { CanvasComponent } from '@bamboo/canvas';
import { TooltipProvider } from '@bamboo/components';
import { LayoutComponent } from '../layout';
import { Designer } from '@/core';

export const DesignerComponent = ({ designer }: { designer: Designer }) => {
  return (
    <TooltipProvider>
      <LayoutComponent layout={designer.layout}>
        <CanvasComponent options={designer.options.canvas}></CanvasComponent>
      </LayoutComponent>
    </TooltipProvider>
  );
};
