/** @jsx jsx */
import React, {
  useRef, useEffect, useState, useCallback
} from 'react';
import { jsx, css, SerializedStyles } from '@emotion/core';
import { debounce } from '../../helpers/utilities';
import { range } from '../../helpers/functional';

const styles = {
  carousel: css`
    list-style: none;
    margin: 0;
    overflow-x: auto;
    padding: 0;
    scroll-snap-type: x mandatory;
    scroll-snap-align: start;
    white-space: nowrap;

    ::-webkit-scrollbar {
      display: none;
    }
  `,
  // Need to set an initial width on carousel items for the scroll reset to properly work.
  carouselItem: (isMounted: boolean) => css`
    display: inline-block;
    scroll-snap-align: start;
    scroll-snap-stop: always;
    width: ${!isMounted ? '100%' : 'auto'};
  `,
  dots: css`
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  dot: (isActive: boolean) => css`
    width: 6px;
    height: 6px;
    margin: 18px 12px 0 0;
    border-radius: 50%;
    background-color: ${isActive ? '#333' : '#808080'};
  `
};

type Props = {
  className?: string;
  itemStyles?: SerializedStyles;
  enableDots?: boolean;
};

const Carousel: React.FC<Props> = ({
  children,
  className = '',
  itemStyles = '',
  enableDots = false
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLUListElement>(null);
  const itemCount = React.Children.count(children);
  const onScroll = useCallback(debounce(() => {
    const scrollContainer = scrollRef!.current!;
    if (scrollContainer) {
      setActiveIndex(Math.round((scrollContainer.scrollLeft / scrollContainer.scrollWidth) * itemCount));
    }
  }, 250), []);

  useEffect(() => {
    scrollRef!.current!.scrollTo({ left: 0 });
    setIsMounted(true);

    scrollRef!.current!.addEventListener('scroll', onScroll);

    return () => {
      scrollRef!.current!.removeEventListener('scroll', onScroll);
    };
  }, [onScroll]);

  return (
    <React.Fragment>
      <ul css={styles.carousel} ref={scrollRef} className={className}>
        {
          React.Children.map(children, (childNode, index) => (
            <li key={index} css={[styles.carouselItem(isMounted), itemStyles]}>
              {childNode}
            </li>
          ))
        }
      </ul>
      { enableDots
        ? (
          <ul css={styles.dots}>
            {range(itemCount).map(index => (
              <li key={index} css={styles.dot(activeIndex === index)} />
            ))}
          </ul>
        )
        : null}
    </React.Fragment>
  );
};

export default Carousel;
