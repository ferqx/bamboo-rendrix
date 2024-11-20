import { createRenderer } from '@bamboo/designer';
import { RenderSchema } from '@bamboo/protocol';
import { Button, Input, InputNumber } from 'antd';
import { install } from './components';
import './canvas.css';

const schema: RenderSchema = {
  componentName: 'div',
  children: [
    {
      componentName: 'div',
      props: {
        onClick: () => {
          console.log('点击了');
        },
      },
      children: ['1'],
    },
    {
      componentName: 'button',
      props: {
        style: {
          width: '100%',
        },
      },
      children: ['2'],
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
          children: ['col1'],
        },
        {
          componentName: 'Col',
          children: ['col2'],
        },
        {
          componentName: 'Col',
          children: [],
        },
      ],
    },
  ],
};

const renderer = createRenderer({
  schema,
});

renderer.componentManager.registerComponent('button', Button);
renderer.componentManager.registerComponent('input', Input);
renderer.componentManager.registerComponent('inputNumber', InputNumber);

install(renderer);

renderer.mount(document.getElementById('app')!);
