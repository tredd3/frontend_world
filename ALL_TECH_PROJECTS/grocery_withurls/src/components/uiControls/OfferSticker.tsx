/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { memo } from 'react';

const offerIcon = css`
  position: absolute;
  color: #fff;
  z-index: 0;
`;

const offerWrapper = css`
  position: absolute;
  font-size: 10px;
  left: 8px;
  top: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const sticker = css`
  height: 35px;
  width: 35px;
  background-color: #bb0b00;
  border-radius: 50%;
  display: inline-block;
`;

const discount = (mrp: number, sp: number) => (
  `${Math.floor(((mrp - sp) / mrp) * 100)}%`
);

type OfferStickerProps = {
  sp: number;
  mrp: number;
  topOffset?: number;
  leftOffset?: number;
}

const OfferSticker: React.FC<OfferStickerProps> = ({
  sp, mrp, topOffset = 0, leftOffset = 0
}) => {
  if (mrp <= sp) return null;

  return (
    <div css={[offerIcon, css`top: ${topOffset}px; left: ${leftOffset}px;`]}>
      <div css={sticker} />
      <div css={offerWrapper}>
        <span>{discount(mrp, sp)}</span>
        <span>OFF</span>
      </div>
    </div>
  );
};

export default memo(OfferSticker);
