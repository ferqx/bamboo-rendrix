import { TooltipProvider } from '@bamboo/components';
import { Layout } from './layout';

export function Designer() {
  return (
    <TooltipProvider>
      <Layout></Layout>
    </TooltipProvider>
  );
}
