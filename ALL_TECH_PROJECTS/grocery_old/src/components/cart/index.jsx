import React from 'react';
import { Route, Switch } from "react-router-dom";
import CartLanding from './CartLanding';
import DeliveryOptions from './DeliveryOptions';
import Payment from './Payment';
import PlaceOrder from './PlaceOrder';
import UpdateCart from './UpdateCart';

export default class Cart extends React.Component {

  componentDidMount() {
    // fetchApi({url: API_ROUTES.getCart, body: {"Lat":"19.1028","Long":"73.0090","Pincode":"400701","CustomerId":"0","IsFavorite":"1","PageNo":"1","FilterType":"0"} })
    // .then(res=>{
    //   console.log("fetch success", res)
    // })
  }
  render() {
    return (
      <>
        <Switch>
          <Route exact path={`${this.props.match.url}`} component={CartLanding}></Route>
          <Route exact path={`${this.props.match.url}/delivery-options`} component={DeliveryOptions}></Route>
          <Route exact path={`${this.props.match.url}/select-payment`} component={Payment}></Route>
          <Route exact path={`${this.props.match.url}/place-order`} component={PlaceOrder}></Route>
          <Route exact path={`${this.props.match.url}/update`} component={UpdateCart}></Route>
        </Switch>
      </>
    );
  }
}
