/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import ReactNativePropRegistry from './ReactNativePropRegistry';
import invariant from 'fbjs/lib/invariant';

function getStyle(style) {
  if (typeof style === 'number') {
    return ReactNativePropRegistry.getByID(style);
  }
  for (const k in style) {
    if (typeof k === 'number' || !isNaN(+k)) {
      delete style[k];
    }
  }
  return style;
}

function flattenStyle(style: ?any): ?Object {
  if (!style) {
    return undefined;
  }

  if (process.env.NODE_ENV !== 'production') {
    invariant(style !== true, 'style may be false but not true');
  }

  if (!Array.isArray(style)) {
    return getStyle(style);
  }

  const result = {};
  for (let i = 0, styleLength = style.length; i < styleLength; ++i) {
    const computedStyle = flattenStyle(style[i]);
    if (computedStyle) {
      for (const key in computedStyle) {
        const value = computedStyle[key];
        result[key] = value;
      }
    }
  }
  return result;
}

export default flattenStyle;
