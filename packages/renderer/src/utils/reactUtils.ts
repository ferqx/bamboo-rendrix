import React from 'react';

/**
 * 判断传入的元素是否为 React.Fragment 组件
 */
export function isFragmentComponent(element: React.ReactElement): boolean {
  return element.type === React.Fragment;
}
