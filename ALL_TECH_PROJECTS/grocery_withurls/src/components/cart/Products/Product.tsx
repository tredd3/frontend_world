/** @jsx jsx */
import React, { memo } from 'react';
import { jsx, css } from '@emotion/core';
import { useHistory } from 'react-router-dom';
import Coupon from '../../uiControls/coupon/Coupon';
import { ShipmentProductPivot } from '../../../types/pivot';
import ProductActions from './ProductActions';
import { ProductRenderVariations } from './types';
import { ActionHandlers } from '../types';
import Image from '../../uiControls/Image';
import { productUrl } from '../../../helpers/urls';

const styles = {
  productContainer: css`
    min-height: 70px;
    background-color: #fff;
    display: flex;
    flex-direction: row;
    padding: 10px;
    box-shadow: 0px 1px 1px 0px hsla(0, 0%, 0%, 0.16);
    border: 1px solid #DBDBDB;
    border-top: 0;

    &:first-of-type {
      border-top: 1px solid #DBDBDB;
    }

    &:last-of-type {
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      border-bottom: none;
    }
  `,
  imageContainer: css`
    width: 65px;
    padding-top: 5px;
    display: flex;
    align-items: flex-start;
    justify-content: center;
  `,
  productInfoContainer: css`
    margin-left: 10px;
    position: relative;
    min-height: 70px;
    color: hsla(0, 0%, 20%, 1);
  `,
  productName: css`
    color: #333333;
    font-weight: 300;
    font-size: 14px;
    margin: 3px 0;
  `,
  priceContainer: css`
    color: hsla(0, 0%, 60%, 1);
    font-size: 16px;
    margin: 5px 0px 5px 0px;
  `,
  sellingPrice: css`
    color: hsla(10, 94%, 33%, 1);
    font-weight: 600;
  `,
  mrp: css`
    color: hsla(0, 0%, 60%, 1);
    font-size: 12px;
    text-decoration: line-through;
  `,
  savings: css`
    color: hsla(229, 3%, 39%, 1);
    font-size: 10px;
  `
};

const isDiscounted = ({ mrp, sp }: ShipmentProductPivot) => mrp > sp;

type ProductProps = {
  product: ShipmentProductPivot;
  type: ProductRenderVariations;
} & ActionHandlers;

const Product = ({
  product, type, ...rest
}: ProductProps) => {
  const history = useHistory();

  return (
    <li
      onClick={() => history.push(productUrl(product.skuId))}
      css={styles.productContainer}
    >
      <div css={styles.imageContainer}>
        <Image
          alt={product.name}
          src={product.image}
          width={65}
        />
      </div>
      <div css={styles.productInfoContainer}>
        <div css={styles.productName}>
          {product.name}
        </div>
        <div css={styles.priceContainer}>
          <span css={styles.sellingPrice}>{`₹ ${product.sp.toFixed(2)} `}</span>
          {isDiscounted(product) && (
            <React.Fragment>
              <span css={styles.mrp}>{`₹ ${product.mrp.toFixed(2)} `}</span>
              <span css={styles.savings}>
                Save ₹
                {(product.mrp - product.sp).toFixed(2)}
                {` (${product.savingsPercent})%`}
              </span>
            </React.Fragment>
          )}
        </div>
        <Coupon
          coupon={product.coupon}
          variant="list"
          wrapperStyle={css`margin-top: 6px; display: inline-block;`}
        />
        {type !== 'cart-update' ? (
          <ProductActions product={product} type={type} {...rest} />
        ) : null}
      </div>
    </li>
  );
};

export default memo(Product);
