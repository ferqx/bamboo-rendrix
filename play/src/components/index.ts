import * as Grid from './Grid';
import type { AssetSchema } from '@bamboo-code/types';
import type { Renderer } from '@bamboo-code/renderer';

const assets: AssetSchema = {
  id: 'layout',
  name: '布局组件',
  version: '0.0.1',
  components: [
    {
      name: '栅格行',
      componentName: 'Row',
    },
    {
      name: '栅格列',
      componentName: 'Col',
      isContainer: true,
      allowToParents: ['Row'],
    },
  ],
};

const install = (renderer: Renderer) => {
  renderer.componentManager.registerComponent('Col', Grid.Col);
  renderer.componentManager.registerComponent('Row', Grid.Row);
};

export { install, assets };
