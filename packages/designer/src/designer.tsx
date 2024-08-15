import { TooltipProvider } from '@bamboo/material-library';
import { Layout } from './layout';

export function Designer() {
  return (
    <TooltipProvider>
      <Layout></Layout>
    </TooltipProvider>
  );
}
