import React from 'react';
import { tags } from '../constant';

type Props = React.PropsWithChildren;

export const builtComponents: { [key: string]: React.ComponentType<Props> } = tags.reduce(
  (previousValue, currentValue) => {
    previousValue[currentValue] = (props: Props) => React.createElement(currentValue, props, props.children);
    return previousValue;
  },
  {} as { [key: string]: React.ComponentType<Props> },
);
