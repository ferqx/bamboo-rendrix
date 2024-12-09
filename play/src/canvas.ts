import { createRenderer } from '@bamboo-rendrix/designer';
import type { RenderSchema } from '@bamboo-rendrix/types';
import { Button, Input, InputNumber } from 'antd';
import { install } from './components';
import './canvas.css';

const schema: RenderSchema[] = [
  {
    componentName: 'Page',
    children: [
      {
        componentName: 'div',
        props: {
          onClick: () => {
            console.log('点击了');
          },
        },
      },
      {
        componentName: 'button',
        props: {
          style: {
            width: '100%',
          },
        },
      },
      {
        componentName: 'input',
        props: {
          placeholder: '请输入',
        },
      },
      {
        componentName: 'Row',
        children: [
          {
            componentName: 'Col',
          },
          {
            componentName: 'Col',
          },
          {
            componentName: 'Col',
            children: [],
          },
        ],
      },
    ],
  },
];

const renderer = createRenderer({
  schema,
});

renderer.componentManager.registerComponent('button', Button);
renderer.componentManager.registerComponent('input', Input);
renderer.componentManager.registerComponent('inputNumber', InputNumber);

install(renderer);

renderer.mount(document.getElementById('app')!);
