import { useRenderer } from '@bamboo/designer';

const schema = {
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
      componentName: 'div',
      children: ['2'],
    },
    {
      id: 4,
      componentName: 'div',
      children: ['3'],
    },
    {
      id: 5,
      componentName: 'div',
      isContainer: true,
      children: ['4'],
    },
  ],
};

const { mountRenderer } = useRenderer();

mountRenderer(document.getElementById('app')!, {
  schema,
});
