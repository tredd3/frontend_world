import React from 'react';
import { Route, Switch } from "react-router-dom";
import AddAddress from './address/addAddress';
import UpdateAddress from './address/updateAddress';
import SelectAddress from './address/select';
import Addresses from './address/viewAddresses';
import About from './about';

export default class Account extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path={`${this.props.match.url}/about`} component={About}></Route>
        <Route exact path={`${this.props.match.url}/addresses`} component={Addresses}></Route>
        <Route exact path={`${this.props.match.url}/select-address`} component={SelectAddress}></Route>
        <Route exact path={`${this.props.match.url}/address/add/:addUser?`} component={AddAddress}></Route>
        <Route exact path={`${this.props.match.url}/address/edit/:id`} component={UpdateAddress}></Route>
      </Switch>
    );
  }
}
