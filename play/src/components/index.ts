import * as Grid from './Grid';
import type { AssetSchema } from '@bamboo-rendrix/types';
import type { Renderer } from '@bamboo-rendrix/renderer';
import { Page } from './Page';

const assets: AssetSchema = {
  id: 'BuiltComponents',
  name: '内置组件',
  version: '0.0.1',
  components: [
    {
      name: '页面',
      componentName: 'Page',
      isContainer: true,
      disableOperation: ['all'],
    },
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
  renderer.componentManager.registerComponent('Page', Page);
};

export { install, assets };
