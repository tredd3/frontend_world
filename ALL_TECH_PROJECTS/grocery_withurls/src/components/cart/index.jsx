import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CartLanding from './CartReview';
import DeliveryDates from './DeliveryDates';
import SelectPaymentMethodPage from './SelectPaymentMethodPage';
import OrderConfirmationPage from './OrderConfirmation';
import CartUpdatePage from './CartUpdatePage';
import Terms from './Terms';
import IFrameWrapper from '../uiControls/IFrameWrapper';
import Addresses from './Addresses';
import MapView from '../location/MapView';
import SelectPin from '../location/SelectPin';
import AddAddress from '../address/AddAddress';
import SelectKirana from '../kirana';
import PageTemplate from '../uiControls/PageTemplate/PageTemplate';

const FAQs = () => (
  <IFrameWrapper
    iframeURL={`${process.env.REACT_APP_FAQ_URL}/static/faq/index.html?client=jiomart`}
  />
);

const wrapWithPageTemplate = Component => () => (
  <PageTemplate
    whiteBackground={false}
    lefticon2={false}
    righticon1={false}
    righticon2={false}
    subSection={false}
    showHeader
  >
    <Component />
  </PageTemplate>
);

export default ({ match }) => (
  <Switch>
    <Route exact path={`${match.url}`} component={CartLanding} />
    <Route exact path={`${match.url}/addresses`} component={wrapWithPageTemplate(Addresses)} />
    <Route exact path={`${match.url}/addresses/:id/map`} component={wrapWithPageTemplate(MapView)} />
    <Route exact path={`${match.url}/addresses/:id/pin`} component={wrapWithPageTemplate(SelectPin)} />
    <Route exact path={`${match.url}/addresses/:id`} component={wrapWithPageTemplate(AddAddress)} />
    <Route exact path={`${match.url}/addresses/:id/select-kirana`} component={wrapWithPageTemplate(SelectKirana)} />
    <Route exact path={`${match.url}/addresses/:id/delivery-options`} component={DeliveryDates} />
    <Route exact path={`${match.url}/addresses/:id/select-payment`} component={SelectPaymentMethodPage} />
    <Route exact path={`${match.url}/addresses/:id/place-order`} component={OrderConfirmationPage} />
    <Route exact path={`${match.url}/addresses/:id/update`} component={CartUpdatePage} />
    <Route exact path={`${match.url}/terms`} component={Terms} />
    <Route exact path={`${match.url}/faqs`} component={FAQs} />
  </Switch>
);
