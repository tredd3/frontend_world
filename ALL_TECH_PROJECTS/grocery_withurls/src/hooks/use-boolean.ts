import { useState, useCallback } from 'react';

export default (initialValue: boolean): [boolean, () => void, () => void] => {
  const [value, setter] = useState(initialValue);

  const setTrue = useCallback(() => setter(true), [setter]);
  const setFalse = useCallback(() => setter(false), [setter]);

  return [value, setTrue, setFalse];
};
