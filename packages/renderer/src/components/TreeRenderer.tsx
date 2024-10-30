import { useState, useEffect, useContext } from 'react';
import { RenderNode, RenderTextNode } from '../core';
import { isFragmentComponent, transformStyle } from '../utils';
import { DragWrappedComponentProps, withDrag } from './Drag';
import { DRAG_ITEM_DATA_ID, DRAG_ITEM_CLASS_NAME } from '../constant';
import { RendererContext } from './RendererProvider';

const componentMap: { [key: string]: React.ComponentType<any> } = {
  div: (props: any) => <div {...props}>{props.children}</div>,
  button: (props: any) => <button {...props}>{props.children}</button>,
};

export interface MaterialComponentProps {
  [DRAG_ITEM_DATA_ID]: string | number;
  style: React.CSSProperties;
  children?: React.ReactNode;
}

const RenderDragComponent = ({ node }: { node: RenderNode }) => {
  const DragComponent = withDrag((props: DragWrappedComponentProps) => (
    <RenderComponent node={node} dragProps={props} />
  ));
  return <DragComponent data={node} dragType="move"></DragComponent>;
};

function RenderComponent({ node, dragProps }: { node: RenderNode; dragProps?: DragWrappedComponentProps }) {
  let Component = componentMap[node.componentName];

  const style = node.props?.style || {};

  const transformedStyle = style ? transformStyle(style || {}) : undefined;

  const mergedProps = {
    ...node.props,
    [DRAG_ITEM_DATA_ID]: node.id,
    className: DRAG_ITEM_CLASS_NAME,
    style: transformedStyle,
  };

  if (!Component) {
    // 未知组件不能移动
    return <div {...mergedProps}>未知组件</div>;
  }

  if (isFragmentComponent(<Component />)) {
    const FragmentComponent = componentMap[node.componentName];
    Component = (props: MaterialComponentProps) => (
      <div {...props}>
        <FragmentComponent {...node.props}>{props.children}</FragmentComponent>
      </div>
    );
  }

  return (
    <Component {...mergedProps} {...(dragProps || {})}>
      <RenderChildComponents nodes={node.children} />
    </Component>
  );
}

const RenderChildComponents = ({ nodes }: { nodes: (RenderNode | RenderTextNode)[] }) => {
  const options = useContext(RendererContext);

  return (
    <>
      {nodes.map((item) => {
        if (item instanceof RenderTextNode) {
          return item.text;
        }
        return options?.isPreview ? (
          <RenderComponent key={item.id} node={item} />
        ) : (
          <RenderDragComponent key={item.id} node={item} />
        );
      })}
    </>
  );
};

function RenderRootComponent({ node }: { node: RenderNode }) {
  const [state, setVersion] = useState(0); // 用于触发组件更新
  // TODO: 后续尝试局部 change 的优化
  useEffect(() => {
    // 设置更新回调，当 TreeNode 更新时触发组件的DOM更新
    const changeEvent = node.renderer?.onNodeChange(() => {
      setVersion((version) => (version === Number.MAX_VALUE ? 0 : version + 1));
    });
    return () => changeEvent?.dispose();
  }, []);

  useEffect(() => {
    console.log('更新了');
  }, [state]);

  const props = {
    [DRAG_ITEM_DATA_ID]: node.id,
    className: 'renderer-root',
    style: { height: '100%' } as React.CSSProperties,
  };

  return (
    <div {...props}>
      <RenderChildComponents nodes={node.children} />
    </div>
  );
}

export default RenderRootComponent;
