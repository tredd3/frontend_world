/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useHistory } from 'react-router-dom';
import { memo } from 'react';
import OrderInfoLink from './OrderInfoLink';
import { Rupee } from '../../../assets/images/svg';
import { PaymentMethod } from '../../../services/cart';

type Props = {
  paymentMethod: PaymentMethod;
  storeName?: string;
}

const OrderPaymentInfo = ({
  paymentMethod,
  storeName
}: Props) => {
  const history = useHistory();

  return (
    <OrderInfoLink
      onClick={() => history.goBack()}
      title="Pay With"
      icon={<Rupee />}
      contentLine1={
        Number(paymentMethod) === 0 ? 'Credit Card / Debit Card / Net Banking' : 'Cash on Delivery (COD)'
      }
      contentLine2={
        storeName && (
          <div>
            <span css={css`font-weight: 600;`}>Served by</span>
            <span>{` ${storeName}`}</span>
          </div>
        )
      }
    />
  );
};

export default memo(OrderPaymentInfo);
