import * as Grid from './Grid';
import type { AssetSchema } from '@bamboo-rendrix/types';
import type { Renderer } from '@bamboo-rendrix/renderer';
import { Page } from './Page';
import { Text } from './Text';

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
      snippets: [
        {
          name: '单栏布局',
          schema: {
            componentName: 'Row',
            props: {
              gutter: 0,
            },
            children: [
              {
                componentName: 'Col',
                props: {
                  span: 24,
                },
                children: [],
              },
            ],
          },
        },
        {
          name: '双栏布局',
          schema: {
            componentName: 'Row',
            props: {
              gutter: 0,
            },
            children: [
              {
                componentName: 'Col',
                props: {
                  span: 12,
                },
                children: [],
              },
              {
                componentName: 'Col',
                props: {
                  span: 12,
                },
                children: [],
              },
            ],
          },
        },
      ],
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
  renderer.componentManager.registerComponent('Text', Text);
};

export { install, assets };
