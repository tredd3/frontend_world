import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SelectPin from '../location/SelectPin';
import Addresses from './Addresses';
import AddAddress from '../address/AddAddress';
import About from './About';
import PageTemplate from '../uiControls/PageTemplate/PageTemplate';
import SelectKirana from '../kirana';
import MapView from '../location/MapView';

const whiteBg = ['/account/about'];

export default ({ history, match }) => (
  <PageTemplate
    whiteBackground={!!whiteBg.includes(history.location.pathname)}
    lefticon2={false}
    righticon1={false}
    righticon2={false}
    subSection={false}
    showHeader={![`${match.url}/about`].includes(history.location.pathname)}
  >
    <Switch>
      <Route exact path={`${match.url}/about`} component={About} />
      <Route exact path={`${match.url}/addresses`} component={Addresses} />
      <Route exact path={`${match.url}/addresses/:id/map`} component={MapView} />
      <Route exact path={`${match.url}/addresses/:id/pin`} component={SelectPin} />
      <Route exact path={`${match.url}/addresses/:id`} component={AddAddress} />
      <Route exact path={`${match.url}/addresses/:id/select-kirana`} component={SelectKirana} />
    </Switch>
  </PageTemplate>
);
