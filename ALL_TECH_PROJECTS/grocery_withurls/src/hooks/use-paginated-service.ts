import { useState, useEffect, useCallback } from 'react';
import { Paginated } from '../services/helpers/paginated';
import useSnackbar from './use-snackbar';

type State<T> = {
  data: null | T;
  loadNextPage: null | (() => Promise<void>);
};

export default <T>(serviceCall: () => Promise<Paginated<T>>, deps: any[]) => {
  const showSnackbar = useSnackbar();
  const [paginatedResults, setPaginatedResults] = useState<State<T>>({
    data: null,
    loadNextPage: null
  });

  const savePaginatedResults = useCallback((results: Paginated<T>) => {
    setPaginatedResults({
      data: results.data,
      loadNextPage: results.loadNextPage && (() => results
        .loadNextPage!()
        .then(savePaginatedResults)
        .catch(showSnackbar))
    });
  }, [showSnackbar]);

  useEffect(() => {
    serviceCall()
      .then(savePaginatedResults)
      .catch(showSnackbar);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showSnackbar, savePaginatedResults, ...deps]);

  return paginatedResults;
};
