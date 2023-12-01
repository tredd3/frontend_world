/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import PageTemplate from '../uiControls/PageTemplate/PageTemplate';
import Button from '../uiControls/button';
import { InfoSmall } from '../../assets/images/svg';
import { getUpdatedCart, confirmChangedCart } from '../../services/cart';
import { CartPivot } from '../../types';
import Products from './Products';
import useQueryParams from '../../hooks/use-query-params';
import { flatMap } from '../../helpers/typed-utils';

const styles = {
  footerWrapper: css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin: 10px;
    padding: 10pz;
    background: #fff;
  `,
  notice: css`
    display: flex;
    background-color: #fff;
    margin: 10px;
    margin-top: 0px;
    border: 1px solid #0066C0;
    padding: 5px;
    font-size: 14px;
  `,
  priceSummaryWrapper: css`
    margin: 10px;
    display: flex;
    flex-direction: column;
    background: #FFF;
    border: 1px solid #DBDBDB;
    align-items: center;
    padding: 5px;
    font-size: 12px;
  `,
  priceSummaryRow: css`
    display: flex;
    width: 100%;
  `,
  priceSummaryLeftCol: css`
    flex-grow: 1;
  `,
  noProducts: css`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 300px;
    font-size: 14px;
  `
};

type PriceSummaryProps = {
  previous: number;
  current: number;
  savings: number;
};

const PriceSummary: React.FC<PriceSummaryProps> = ({ previous, current, savings }) => (
  <div css={styles.priceSummaryWrapper}>
    <div css={styles.priceSummaryRow}>
      <span css={styles.priceSummaryLeftCol}>Previous Value of items:</span>
      <span>{` ₹ ${previous.toFixed(2)}`}</span>
    </div>
    <div css={styles.priceSummaryRow}>
      <span css={styles.priceSummaryLeftCol}>Current Value of items</span>
      <span>{` ₹ ${current.toFixed(2)}`}</span>
    </div>
    {savings > 0 ? (
      <div css={styles.priceSummaryRow}>
        <span css={styles.priceSummaryLeftCol}>Additional Saving</span>
        <span>{` ₹ ${savings.toFixed(2)}`}</span>
      </div>
    ) : null }
  </div>
);

const CartUpdatePage: React.FC = () => {
  const history = useHistory();
  const { id: addressId } = useParams();
  const [carts, setCarts] = useState<{ old: CartPivot; new: CartPivot} | null>(null);
  const queryParams = useQueryParams();

  const date = queryParams('date');

  const confirmCart = async () => {
    await confirmChangedCart();
    history.push(
      date
        ? `/cart/addresses/${addressId}/select-payment?date=${date}`
        : `/cart/addresses/${addressId}/delivery-options`
    );
  };

  useEffect(() => {
    (async () => {
      const carts = await getUpdatedCart(Number(addressId!), date ? Number(date) : undefined);
      setCarts({ old: carts.oldCart, new: carts.newCart });
    })();
  }, [history.location.search, addressId, date]);

  if (!carts) return null;

  const cart = carts.new;

  const previousCartValue = carts.old.totalPayableAmount;
  const currentCartValue = cart.totalPayableAmount;
  const discount = previousCartValue - currentCartValue;
  const cartItems = flatMap(cart.shipments, shipment => shipment.products);

  return (
    <div css={css`background-color: #fff;`}>
      <PageTemplate
        history={history}
        subSection={false}
        deliverySection={false}
        lefticon2={false}
        righticon2={false}
        righticon1={false}
        title="Cart Update"
        footerNode={(
          <div css={styles.footerWrapper}>
            <Button
              wrapperStyle={{ marginRight: 10 }}
              type="solidGray"
              text="Cancel"
              onClick={() => history.goBack()}
            />
            <Button
              wrapperStyle={{}}
              text="Confirm"
              type="solidTulip"
              onClick={confirmCart}
            />
          </div>
        )}
        whiteBackground
      >
        <div css={css`margin-top: 15px;`}>
          <div css={styles.notice}>
            <InfoSmall style={{ margin: '2px 5px 0 0' }} />
            <p>
              Product availability and prices are location based.
              There are changes in your cart for the new delivery
              address selected. Details are mentioned below.
            </p>
          </div>
          <PriceSummary
            previous={previousCartValue}
            current={currentCartValue}
            savings={discount}
          />
        </div>
        {cartItems.length
          ? (
            <Products
              products={cartItems}
              type="cart-update"
            />
          )
          : (
            <div css={styles.noProducts}>No Products Available</div>
          )}
      </PageTemplate>
    </div>
  );
};

export default CartUpdatePage;
