import * as Grid from './Grid';
import { AssetSchema } from '@bamboo-code/protocol';
import { Renderer } from '@bamboo-code/renderer';

const assets: AssetSchema = {
  id: 'components',
  name: '组件库',
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
    },
  ],
};

const install = (renderer: Renderer) => {
  renderer.componentManager.registerComponent('Col', Grid.Col);
  renderer.componentManager.registerComponent('Row', Grid.Row);
};

export { install, assets };
