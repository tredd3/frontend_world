/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { memo } from 'react';
import { CartPivot } from '../../../types';

const styles = {
  wrapper: css`margin: 10px 15px 0;`,
  title: css`
    margin-bottom: 7px; 
    font-size: 14px; 
    font-weight: 600; 
    margin-bottom: 5px;`,
  content: css`
    background: #fff;
    border: 1px solid #dfdfdf;
    padding: 10px;
    border-radius: 2px;
    font-size: 14px;
  `,
  breakdown: css`
    padding-bottom: 10px;
    border-bottom: 1px solid #dfdfdf;
  `,
  row: css`
    display: flex;
    justify-content: space-between;
  `,
  summary: css`
    padding-top: 10px;
  `,
  bold: css`font-weight: 600;`
};

const OrderSummarySection: React.FC<{ cart: CartPivot }> = ({ cart }) => (
  <div css={styles.wrapper}>
    <div css={styles.title}>
        Order Summary
    </div>
    <div css={styles.content}>
      <div css={styles.breakdown}>
        <div css={[styles.row, styles.bold]}>
          <span>{`Selling Price (${cart.itemCount}) items`}</span>
          <span>{`₹ ${cart.totalAmount.toFixed(2)}`}</span>
        </div>
        <div css={styles.row}>
          <span>Coupon Discount</span>
          <span>{`- ₹ ${cart.couponDiscountAmount.toFixed(2)}`}</span>
        </div>
        <div css={styles.row}>
          <span>Delivery Charges</span>
          <span>{`+ ₹ ${cart.deliveryCharge.toFixed(2)}`}</span>
        </div>
      </div>

      <div css={styles.summary}>
        <div css={[styles.row, styles.bold]}>
          <span>You Pay</span>
          <span>{`₹ ${cart.totalPayableAmount.toFixed(2)}`}</span>
        </div>

        <div css={[styles.row, css`color: rgb(7, 154, 24);`]}>
          <span css={styles.bold}>Your savings on MRP</span>
          <span>{`₹ ${cart.discountAmount.toFixed(2)}`}</span>
        </div>
      </div>
    </div>
  </div>
);

export default memo(OrderSummarySection);
