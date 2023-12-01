/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import ViewCart from './ViewCart';
import EmptyCart from './EmptyCart';
import PageTemplate from '../../uiControls/PageTemplate/PageTemplate';
import Button from '../../uiControls/button';
import { trackShipments } from '../../../helpers/analytics';
import { getCart } from '../../../services/cart';
import Loader from '../../uiControls/Loader';
import { CartPivot } from '../../../types';
import { getConfig } from '../../../services/config';
import useSnackbar from '../../../hooks/use-snackbar';

const footerWrapper = css`
  margin: 15px;
  text-align: center;
`;

export default () => {
  const history = useHistory();
  const [cart, setCart] = useState<CartPivot | null>(null);
  const [deliveryThreshold, setDeliveryThreshold] = useState(0);
  const showSnackbar = useSnackbar();

  const refreshCart = useCallback(async () => {
    const cartData = await getCart();
    setCart(cartData);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const [, configData] = await Promise.all([refreshCart(), getConfig()]);
        setDeliveryThreshold(configData.deliveryChargeThreshold);
        trackShipments('cartView');
      } catch (e) {
        showSnackbar(e.message);
      }
    })();
  }, [refreshCart, showSnackbar]);

  const hasCartItems = cart ? Boolean(cart.shipments.length || cart.savedForLater?.length) : null;

  const renderComponent = useCallback(() => {
    if (hasCartItems === null) {
      return <Loader />;
    }

    if (hasCartItems) {
      return <ViewCart cart={cart!} deliveryThreshold={deliveryThreshold} onCartUpdated={refreshCart} />;
    }

    return <EmptyCart />;
  }, [cart, deliveryThreshold, hasCartItems, refreshCart]);

  return (
    <PageTemplate
      whiteBackground
      subSection={false}
      deliverySection={false}
      title="Cart Summary"
      righticon2={false}
      footerNode={hasCartItems === false ? (
        <div css={footerWrapper}>
          <Button
            text="Continue Shopping"
            type="solidTulip"
            onClick={() => history.push('/')}
          />
        </div>
      ) : null}
    >
      {renderComponent()}
    </PageTemplate>
  );
};
