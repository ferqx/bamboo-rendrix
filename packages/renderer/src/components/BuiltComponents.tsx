import React from 'react';
import { tags } from '../constant';

export const builtComponents: { [key: string]: React.ComponentType<any> } = tags.reduce(
  (previousValue, currentValue) => {
    previousValue[currentValue] = (props: any) => React.createElement(currentValue, props, props.children);
    return previousValue;
  },
  {} as { [key: string]: React.ComponentType<any> },
);
