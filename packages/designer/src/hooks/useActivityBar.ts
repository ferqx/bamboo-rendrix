import { ActivityBarItem } from '../core';
import { useMemo, useState } from 'react';

export function useActivityBar(activeBars: ActivityBarItem[]) {
  const [state, setState] = useState('');

  const activatedBar = useMemo(() => {
    return activeBars.find((item) => item.id === state);
  }, [state]);

  const activatedView = (value: string) => {
    setState(value);
  };

  const closeView = () => {
    setState('');
  };

  return {
    state,
    activatedBar,
    activatedView,
    closeView,
  };
}
