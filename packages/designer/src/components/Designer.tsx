import { CanvasComponent } from '@bamboo/canvas';
import { TooltipProvider } from '@bamboo/components';
import { Layout } from '../layout';
import { Designer } from '@/core';

export const DesignerComponent = ({ designer }: { designer: Designer }) => {
  return (
    <TooltipProvider>
      <Layout>
        <CanvasComponent options={designer.options.canvas}></CanvasComponent>
      </Layout>
    </TooltipProvider>
  );
};
