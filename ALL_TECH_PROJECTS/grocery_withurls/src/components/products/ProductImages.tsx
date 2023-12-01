/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/core';
import Image from '../uiControls/Image';
import { ProductPivot } from '../../types';
import Carousel from '../uiControls/Carousel';

type Props = {
  images: ProductPivot['images'];
};

const ProductImages: React.FC<Props> = ({
  images
}) => (
  <Carousel css={css`width: 170px;`} enableDots>
    {images.map(imageUrl => (
      <Image key={imageUrl} height={170} src={imageUrl} />
    ))}
  </Carousel>
);
export default ProductImages;
