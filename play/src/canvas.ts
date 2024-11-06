import { createRenderer } from '@bamboo/designer';
import { RenderSchema } from '@bamboo/protocol';
import { Button, Input, InputNumber } from 'antd';

const schema: RenderSchema = {
  id: 1,
  componentName: 'div',
  children: [
    {
      id: 2,
      componentName: 'div',
      props: {
        onClick: () => {
          console.log('点击了');
        },
      },
      children: ['1'],
    },
    {
      id: 3,
      componentName: 'button',
      props: {
        style: {
          width: '100%',
        },
      },
      children: ['2'],
    },
    {
      id: 4,
      componentName: 'input',
      props: {
        placeholder: '请输入',
      },
    },
    {
      id: 5,
      componentName: 'inputNumber',
      props: {
        placeholder: '请输入',
      },
    },
  ],
};

const renderer = createRenderer({
  schema,
});

renderer.componentManager.registerComponent('button', Button);
renderer.componentManager.registerComponent('input', Input);
renderer.componentManager.registerComponent('inputNumber', InputNumber);

renderer.mount(document.getElementById('app')!);
