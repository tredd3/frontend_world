/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/core';
import { Link } from 'react-router-dom';
import { ShipmentProductPivot, CartPivot, DeliveryDatePivot } from '../../../types';
import Products from '../Products';

const styles = {
  wrapper: css`margin: 25px 15px 0;`,
  header: css`
    display: flex; 
    justify-content: space-between;
    align-items: center;
  `,
  title: css`
    margin-top: 9px;
    background-color: #fff;
    border: 1px solid #dfdfdf;
    border-bottom: none;
    padding: 11px 0 11px 15px;
    display: block;
    text-decoration: none;
    color: #0066c0;
    font-size: 14px;
    font-weight: 600;
  `
};

type Props = {
  products: ShipmentProductPivot[];
  deliveryDate: DeliveryDatePivot;
  addressId: number;
  onCartUpdated: (cart?: CartPivot) => void;
  totalPayableAmount: number;
};

const OrderShipmentsInfo = ({
  addressId,
  products,
  deliveryDate,
  totalPayableAmount,
  onCartUpdated
}: Props) => (
  <React.Fragment>
    <div css={styles.wrapper}>
      <div css={styles.header}>
        <div>
          <span css={css`font-weight: 600; font-size: 14px;`}>Shipment</span>
          <span css={css`font-size: 12px;`}>
            {` (${products.length} ${products.length === 1 ? 'item' : 'items'})`}
          </span>
        </div>
        <span css={css`font-weight: 600;`}>{`₹ ${totalPayableAmount.toFixed(2)}`}</span>
      </div>
      <Link
        css={styles.title}
        to={`/cart/addresses/${addressId}/delivery-options`}
      >
        <span>{` Arriving, ${deliveryDate.label} `}</span>
      </Link>
      <Products
        products={products}
        type="review-cart"
        onCartUpdated={onCartUpdated}
        roundedTop={false}
        deliveryDateId={deliveryDate.id}
        addressId={addressId}
      />
    </div>
  </React.Fragment>
);

export default OrderShipmentsInfo;
