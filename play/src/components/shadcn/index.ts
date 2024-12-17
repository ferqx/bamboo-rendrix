import type { AssetSchema } from '@bamboo-rendrix/types';
import type { Renderer } from '@bamboo-rendrix/renderer';
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from '@bamboo-rendrix/components';

const assets: AssetSchema = {
  id: 'shadcn',
  name: 'shadcn',
  version: '0.0.1',
  components: [
    {
      name: '按钮',
      componentName: 'Button',
      snippets: [
        {
          name: '主要按钮',
          schema: {
            componentName: 'Button',
            props: {
              text: '主要按钮',
              type: 'primary',
            },
          },
        },
        {
          name: '次要按钮',
          schema: {
            componentName: 'Button',
            props: {
              text: '次要按钮',
              type: 'secondary',
            },
          },
        },
        {
          name: '警告按钮',
          schema: {
            componentName: 'Button',
            props: {
              text: '警告按钮',
              type: 'warning',
            },
          },
        },
      ],
    },
    {
      name: '卡片',
      componentName: 'Card',
      snippets: [
        {
          name: '默认卡片',
          schema: {
            componentName: 'Card',
            props: {
              title: '标题',
              content: '内容',
            },
            children: [
              {
                componentName: 'CardHeader',
                children: [
                  {
                    componentName: 'CardTitle',
                    children: [
                      {
                        componentName: 'Text',
                        props: {
                          text: 'Card Title',
                        },
                      },
                    ],
                  },
                  {
                    componentName: 'CardDescription',
                    children: [
                      {
                        componentName: 'Text',
                        props: {
                          text: 'Card Description',
                        },
                      },
                    ],
                  },
                ],
              },
              {
                componentName: 'CardContent',
                children: [
                  {
                    componentName: 'Text',
                    props: {
                      text: 'Card Content',
                    },
                  },
                ],
              },
              {
                componentName: 'CardFooter',
                children: [
                  {
                    componentName: 'Text',
                    props: {
                      text: 'Card Footer',
                    },
                  },
                ],
              },
            ],
          },
        },
      ],
    },
  ],
};

const install = (renderer: Renderer) => {
  renderer.componentManager.registerComponent('Button', Button);
  renderer.componentManager.registerComponent('Card', Card);
  renderer.componentManager.registerComponent('CardHeader', CardHeader);
  renderer.componentManager.registerComponent('CardContent', CardContent);
  renderer.componentManager.registerComponent('CardFooter', CardFooter);
  renderer.componentManager.registerComponent('CardTitle', CardTitle);
  renderer.componentManager.registerComponent('CardDescription', CardDescription);
};

export default { install, assets };
