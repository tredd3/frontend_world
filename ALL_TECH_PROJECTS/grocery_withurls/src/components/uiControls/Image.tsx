import React, { memo } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import PlaceholderImg from '../../assets/images/icons/Placeholder.jpg';

type ImageProps = {
  src: string;
  height?: number;
  width?: number;
  alt?: string;
  placeHolderSpanWrapper?: string;
}

type ResizeSrcParams = Pick<ImageProps, 'src' | 'height' | 'width'>;

const appendResizeParams = ({ src, height, width }: ResizeSrcParams) => {
  let imgSrc = '';
  // Some urls already have ? as part of url to avoid same added '&' to concat
  const separator = src.includes('?') ? '&' : '?';
  if (width && !height) {
    imgSrc = `${src}${separator}impolicy=resizeforwidth&w=${width}`;
  } else if (height && !width) {
    imgSrc = `${src}${separator}impolicy=resizeforheight&h=${height}`;
  } else if (width && height) {
    imgSrc = `${src}${separator}impolicy=resize&w=${width}&h=${height}`;
  } else {
    imgSrc = src;
  }
  return imgSrc;
};

const Image: React.FC<ImageProps> = props => {
  const {
    src, height, width, placeHolderSpanWrapper
  } = props;
  if (!height && !width) {
    throw new Error('Image needs either height or width');
  }
  return (
    <LazyLoadImage
      placeholderSrc={PlaceholderImg}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      src={appendResizeParams({ src, height, width })}
      wrapperClassName={placeHolderSpanWrapper}
    />
  );
};

export default memo(Image);
