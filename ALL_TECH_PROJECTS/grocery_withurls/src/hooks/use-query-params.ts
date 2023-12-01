import { useHistory } from 'react-router-dom';
import { useMemo, useCallback } from 'react';

export default () => {
  const history = useHistory();
  const { search } = history.location;

  const urlSearchParams = useMemo(
    () => new URLSearchParams(search),
    [search]
  );

  return useCallback(
    (key: string) => urlSearchParams.get(key),
    [urlSearchParams]
  );
};
