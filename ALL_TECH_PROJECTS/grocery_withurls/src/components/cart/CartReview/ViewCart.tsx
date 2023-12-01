/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/core';
import { useHistory } from 'react-router-dom';
import Button from '../../uiControls/button';
import { InfoTiny } from '../../../assets/images/svg';
import { trackShipments } from '../../../helpers/analytics';
import { CartPivot } from '../../../types';
import Products from '../Products';
import SavedForLater from '../SavedForLater';
import { OnCartUpdated } from '../types';
import { flatMap } from '../../../helpers/typed-utils';

const styles = {
  wrapper: css`background-color: #fff;`,
  summaryContainer: css`
    margin: 0 0 7px 0;
    display: flex;
    flex-direction: column;
    min-height: 70px;
    box-shadow: 0px 4px 5px 0px hsla(0, 0%, 0%, 0.16);
    padding: 10px;
  `,
  totalToPayWrapper: css`
    display: flex;
    margin: 5px;
    color: hsla(0, 0%, 20%, 1);
    font-weight: 600;
  `,
  deliveryFeeNote: css`
    color: hsla(229, 3%, 39%, 1);
    font-size: 11px;
    font-weight: 200;
  `,
  savingsWrapper: css`
    display: flex;
    margin: 0 5px;
    color: #079A18;
    font-weight: 600;
    font-size: 12px;
  `,
  freeDeliveryNote: css`
    color: hsla(229, 3%, 39%, 1);
    margin: 5px 0px 5px 5px;
    font-size: 12px;
  `,
  continueOrProceedButtonsWrapper: css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 15px;
    margin: 5px;
    color: hsla(0, 0%, 20%, 1);
    font-weight: 600;
  `,
  infoIcon: css`
    margin: 2px 5px 0 0;
    font-size: 10px;
  `
};

type Props = {
  cart: CartPivot;
  deliveryThreshold: number;
  onCartUpdated: OnCartUpdated;
};

const ViewCart = ({
  cart,
  deliveryThreshold,
  onCartUpdated
}: Props) => {
  const history = useHistory();

  const { shipments, savedForLater } = cart;
  const shipmentProducts = flatMap(shipments, shipment => shipment.products);
  const totalShipments = shipments.length;

  return (
    <div css={styles.wrapper}>
      <div css={styles.summaryContainer}>
        <div css={styles.totalToPayWrapper}>
          <div>
            You Pay
            {' '}
            <span css={css`font-size: 14px;`}>
              {`(${cart.itemCount} Items)`}
            </span>
            { (cart.totalAmount < deliveryThreshold) ? (
              <React.Fragment>
                <br />
                <div css={styles.deliveryFeeNote}>
                  {`Includes ₹${cart.deliveryCharge} delivery fee`}
                </div>
              </React.Fragment>
            ) : null}
          </div>
          <div style={{ marginLeft: 'auto' }}>
            {`₹ ${cart.totalPayableAmount.toFixed(2)}`}
          </div>
        </div>
        <div css={styles.savingsWrapper}>
          <div>Your savings on MRP</div>
          <div style={{ marginLeft: 'auto' }}>
            {`₹ ${cart.discountAmount.toFixed(2)}`}
          </div>
        </div>
        <span css={styles.freeDeliveryNote}>
          {(deliveryThreshold && (cart.totalAmount < deliveryThreshold))
            ? `Add items worth ₹${(deliveryThreshold - cart.totalAmount).toFixed(2)} for free delivery`
            : (
              <p>
                <InfoTiny css={styles.infoIcon} />
                  You are eligible for free delivery
              </p>
            )}
        </span>
        <div css={styles.continueOrProceedButtonsWrapper}>
          <Button
            text="Continue Shopping"
            type="solidGray"
            onClick={() => history.push('/')}
          />
          <Button
            text="Proceed to Buy"
            type="solidTulip"
            disable={totalShipments < 1}
            onClick={() => {
              trackShipments('checkout');
              history.push('/cart/addresses');
            }}
          />
        </div>
      </div>
      { shipments.length ? (
        <Products
          products={shipmentProducts}
          type="cart"
          onCartUpdated={onCartUpdated}
        />
      ) : null }
      {savedForLater && savedForLater.length > 0 ? (
        <SavedForLater products={savedForLater} onCartUpdated={onCartUpdated} />
      ) : null }
    </div>
  );
};

export default ViewCart;
