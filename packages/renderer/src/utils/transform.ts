/* eslint-disable @typescript-eslint/no-explicit-any */
import type React from 'react';
import { kebabToCamel } from './case';

// 转换样式对象的 key
export function transformStyle(style: Record<string, any>): React.CSSProperties {
  // TODO: Expression produces a union type that is too complex to represent.
  // const transformedStyle: React.CSSProperties = {};

  const transformedStyle: Record<string, any> = {};

  for (const key in style) {
    if (Object.prototype.hasOwnProperty.call(style, key)) {
      const camelCaseKey = kebabToCamel(key);
      transformedStyle[camelCaseKey] = style[key];
    }
  }

  return transformedStyle;
}
