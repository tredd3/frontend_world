/** @jsx jsx */
import React, {
  useState, useEffect, useMemo, useCallback
} from 'react';
import { jsx } from '@emotion/core';
import { useHistory, useParams } from 'react-router-dom';
import PageTemplate from '../../uiControls/PageTemplate/PageTemplate';
import OrderSummarySection from './OrderSummarySection';
import OrderDeliveryInfo from './OrderDeliveryInfo';
import OrderPaymentInfo from './OrderPaymentInfo';
import OrderShipmentsInfo from './OrderShipmentsInfo';
import SubmitButton from './SubmitButton';
import {
  PaymentMethodsReturnType, getPaymentModes,
  getUpdatedCart, placeOrder, getDeliveryDates
} from '../../../services/cart';
import { AddressPivot, CartPivot, DeliveryDatePivot } from '../../../types';
import { getAddressById } from '../../../services/address';
import { trackShipments } from '../../../helpers/analytics';

import useSnackbar from '../../../hooks/use-snackbar';
import Loader from '../../uiControls/Loader';
import useQueryParams from '../../../hooks/use-query-params';
import useCartCount from '../../../hooks/use-cart-count';
import { flatMap } from '../../../helpers/typed-utils';
import { orderPlacedUrl, cartUrl } from '../../../helpers/urls';

const OrderConfirmationPage: React.FC = () => {
  const showSnackbar = useSnackbar();
  const history = useHistory();
  const { id } = useParams();
  const { notifyCartHasUpdated } = useCartCount();
  const [address, setAddress] = useState<AddressPivot | undefined>();
  const [paymentModes, setPaymentModes] = useState<PaymentMethodsReturnType | null>(null);
  const [deliveryDate, setDeliveryDate] = useState<DeliveryDatePivot | null>(null);
  const [cart, setCart] = useState<CartPivot>();
  const queryParam = useQueryParams();

  const addressId = Number(id);
  const dateId = useMemo(() => Number(queryParam('date')), [queryParam]);
  const paymentMethod = useMemo(() => {
    if (!paymentModes) return undefined;
    return paymentModes.paymentMethods.find(pm => pm.id === queryParam('payment'));
  }, [paymentModes, queryParam]);

  const refreshCart = useCallback((cart?: CartPivot) => {
    if (cart) {
      setCart(cart);
    } else {
      getUpdatedCart(addressId, dateId).then(({ newCart }) => setCart(newCart));
    }
  }, [addressId, dateId]);

  useEffect(() => {
    getPaymentModes(addressId, dateId).then(setPaymentModes);
  }, [addressId, dateId]);

  useEffect(() => {
    getAddressById(addressId).then(setAddress);
  }, [addressId]);

  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  useEffect(() => {
    (async () => {
      const deliveryDates = await getDeliveryDates(addressId);
      setDeliveryDate(deliveryDates?.find(d => d.id === dateId)!);
    })();
  }, [addressId, dateId]);

  useEffect(() => {
    if (!cart) return;
    if (cart.itemCount === 0) history.replace(cartUrl);
  }, [cart, history]);

  const onPlaceOrderClick = async () => {
    if (!cart || !paymentMethod) return;

    trackShipments('placeYourOrder', { cart, paymentMethod: paymentMethod.id });

    try {
      const isSuccess = await placeOrder(addressId, dateId, paymentMethod.id);
      if (!isSuccess) return; // This is a case of 'online' payment, and will redirect

      notifyCartHasUpdated();
      trackShipments('orderSuccessful', {
        paymentMethod: paymentMethod.id,
        cart,
        paymentStatus: 'Paid'
      });
      history.push(orderPlacedUrl(cart.cartId));
    } catch (e) {
      trackShipments('orderFailure', {
        paymentMethod: paymentMethod.id,
        cart,
        failureReason: e.message
      });
      showSnackbar(e);
    }
  };

  if (!cart) return <Loader />;

  return (
    <PageTemplate
      history={history}
      subSection={false}
      deliverySection={false}
      lefticon2={false}
      righticon2={false}
      righticon1={false}
    >
      <SubmitButton onClick={onPlaceOrderClick} />
      {cart && <OrderSummarySection cart={cart} />}
      {address && <OrderDeliveryInfo address={address} />}
      {paymentMethod && (
        <OrderPaymentInfo
          paymentMethod={paymentMethod}
          storeName={paymentModes?.storeName}
        />
      )}
      {address && deliveryDate && (
        <OrderShipmentsInfo
          addressId={address.id}
          totalPayableAmount={cart.totalPayableAmount}
          products={flatMap(cart.shipments, s => s.products)}
          deliveryDate={deliveryDate}
          onCartUpdated={refreshCart}
        />
      )}
      <SubmitButton onClick={onPlaceOrderClick} />
    </PageTemplate>
  );
};

export default OrderConfirmationPage;
