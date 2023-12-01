import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Loader from '../uiControls/Loader';
import PageTemplate from '../uiControls/PageTemplate/PageTemplate';
import Error from '../uiControls/Error';
import { track, trackPage } from '../../helpers/analytics';
import useSnackbar from '../../hooks/use-snackbar';
import { isPaymentSuccessful } from '../../services/cart';
import { orderPlacedUrl } from '../../helpers/urls';

const PGReturn: React.FC<{}> = () => {
  const history = useHistory();
  const showSnackbar = useSnackbar();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => { trackPage('Payment Gateway Page'); }, []);

  useEffect(() => {
    (async () => {
      try {
        const cartId = await isPaymentSuccessful();
        history.push(orderPlacedUrl(cartId));
      } catch (e) {
        track('orderFailure', { page: { pageName: 'Order Failure' } });
        setError(e.message);
        showSnackbar(e);
      }
    })();
  }, [history, showSnackbar]);

  return (
    <PageTemplate
      showHeader={false}
      subSection={false}
      deliverySection={false}
      lefticon2={false}
      righticon2={false}
      righticon1={false}
    >
      {error
        ? <Error><p>{error}</p></Error>
        : <Loader />}
    </PageTemplate>

  );
};

export default PGReturn;
