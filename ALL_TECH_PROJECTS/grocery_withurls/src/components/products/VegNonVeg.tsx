/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React, { memo } from 'react';
import { ReactComponent as VegIcon } from '../../assets/images/svg/veg.svg';
import { ReactComponent as NonVegIcon } from '../../assets/images/svg/nonveg.svg';

const iconStyle = css`
  margin-right: 10px;
  position: relative;
  top: 3px;
`;

const VegNonVeg: React.FC<{ isVeg: boolean }> = ({ isVeg }) => (
  <React.Fragment>
    {isVeg
      ? <VegIcon css={iconStyle} />
      : <NonVegIcon css={iconStyle} />}

    <span>
      This is a
      {' '}
      <span css={css`font-weight: 600;`}>
        {isVeg ? 'vegetarian' : 'non-vegetarian'}
      </span>
      {' '}
      product
    </span>
  </React.Fragment>
);

export default memo(VegNonVeg);
