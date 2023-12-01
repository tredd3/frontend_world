/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/core';
import { ProductPivot } from '../../types';
import Price from '../uiControls/Price';
import Button from '../uiControls/button';
import { trackProduct } from '../../helpers/analytics';

const styles = {
  container: css`
    display: flex;
    padding: 12px 0;
  `,
  image: (url: string) => css`
    background-image: url(${url});
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    width: 20%;
    margin-right: 20px;
  `,
  detailsContainer: css`
    width: 80%;
  `,
  productName: css`
    width: 90%;
    font-size: 13px;
  `,
  detailsSection: css`
    display: flex;
    justify-content: space-between;
  `,
  priceWrapper: css`
    width: 65%;
    padding-top: 12px;
  `
};

type Props = {
  product: ProductPivot;
  onClickItem: (skuId: number) => void;
  onClickDelete: (skuId: number) => void;
  onClickAdd: (product: ProductPivot) => void;
};

const WishListItem: React.FC<Props> = ({
  product,
  onClickItem,
  onClickDelete,
  onClickAdd
}) => {
  const {
    category,
    images,
    skuId,
    sp,
    mrp,
    brandName,
    name
  } = product;

  const sendAnalytics = (eventName: string) => {
    trackProduct(eventName, {
      productID: skuId,
      quantity: 1,
      price: mrp,
      productCategory: category.name,
      purchaseJourney: 'Wishlist',
      brandName,
      productName: name
    });
  };

  return (
    <div
      css={styles.container}
      onClick={() => {
        onClickItem(skuId);
      }}
    >
      <div css={styles.image(images[0])} />
      <div css={styles.detailsContainer}>
        <div css={styles.productName}>{name}</div>

        <section css={styles.detailsSection}>
          <div css={styles.priceWrapper}>
            <Price sp={sp} mrp={mrp} />
          </div>
        </section>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginRight: '10px' }}>
          <Button
            text="Delete"
            name="deleteFromCart"
            style={{
              padding: '6px', paddingLeft: '25px', paddingRight: '25px', marginTop: '6px'
            }}
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              sendAnalytics('removeFromWishlist');
              onClickDelete(skuId);
            }}
            type="solidGray"
          />
          <Button
            text="Add to cart"
            name="addToCart"
            style={{
              padding: '6px', paddingLeft: '18px', paddingRight: '18px', marginTop: '6px'
            }}
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              sendAnalytics('addToCart');
              onClickAdd(product);
            }}
            type="solidGray"
          />
        </div>
      </div>
    </div>
  );
};

export default WishListItem;
