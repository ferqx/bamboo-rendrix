import { createRenderer } from '@bamboo/designer';
import { RenderSchema } from '@bamboo/protocol';

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
      componentName: 'span',
      children: ['3'],
    },
    {
      id: 5,
      componentName: 'div',
      children: ['4'],
    },
  ],
};

const renderer = createRenderer({
  schema,
});

renderer.mount(document.getElementById('app')!);
