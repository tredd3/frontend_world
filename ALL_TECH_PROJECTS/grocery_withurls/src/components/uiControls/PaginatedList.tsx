import React, {
  useEffect, ReactElement, useRef
} from 'react';
import useIsVisible from '../../hooks/use-is-visible';

type PaginatedListProps<T> = {
  list: T[] | null;
  rowRenderer: ({ item, index }: { item: T; index: number }) => ReactElement;
  loadNextPage: (() => Promise<void>) | null;
};

const PaginatedList = <T extends {}>({
  list, rowRenderer, loadNextPage
}: PaginatedListProps<T>) => {
  const [ref, isShown] = useIsVisible<HTMLDivElement>();
  const inFlightRef = useRef(false);

  useEffect(() => {
    if (isShown && loadNextPage && !inFlightRef.current) {
      inFlightRef.current = true;
      loadNextPage()
        .then(() => { inFlightRef.current = false; });
    }
  }, [isShown, loadNextPage]);

  if (!list) return null;

  return (
    <>
      {list.map((item, index) => rowRenderer({ item, index }))}
      <div ref={ref} />
    </>
  );
};
export default PaginatedList;
