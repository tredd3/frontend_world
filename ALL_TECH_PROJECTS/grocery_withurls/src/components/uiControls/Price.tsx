/** @jsx jsx */
import React, { memo } from 'react';
import { css, jsx } from '@emotion/core';

const wrapper = css`
  font-size: 10px;
  margin-bottom: 6px;
  align-items: center;
`;

const spStyles = css`
  color: #A82205;
  margin-right: 5px;
  font-size: 16px;
  font-family: inherit;
  font-weight: 530;
`;

const mrpStyles = css`
  color: #999;
  margin-right: 5px;
  text-decoration: line-through;
  font-size: 12px;
  font-family: inherit;
`;

const discountStyle = css`
  color: #616267;
  margin-right: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 10px;
  font-family: inherit;
`;

const discount = (mrp: number, sp: number) => {
  const difference = (mrp - sp).toFixed(2);
  return `Save ₹${difference} (${(100 - (Number(sp) / Number(mrp)) * 100).toFixed(0)}%)`;
};

type PriceProps = {
  sp: number;
  mrp: number;
  large?: boolean;
};

const Price: React.FC<PriceProps> = ({ sp, mrp, large = false }) => {
  const MRP = Number.isInteger(mrp) ? mrp : mrp.toFixed(2);
  const SP = Number.isInteger(sp) ? sp : sp.toFixed(2);

  return (
    <div css={wrapper}>
      <span css={[spStyles, large && css`font-size: 18px;`]}>
        {`₹${SP}`}
      </span>
      {mrp > sp
        ? (
          <React.Fragment>
            <br />
            <span css={mrpStyles}>{`₹${MRP}`}</span>
            <span css={discountStyle}>
              {discount(mrp, sp)}
            </span>
          </React.Fragment>
        ) : null}
    </div>
  );
};

export default memo(Price);
