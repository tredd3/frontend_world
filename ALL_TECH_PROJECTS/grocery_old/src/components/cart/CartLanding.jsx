import React from "react";
import { connect } from "react-redux";
import ViewCart from "./ViewCart";
import EmptyCart from "./EmptyCart";
import { cartAddItem, cartGetItems } from "../../actions/cart";
import PageTemplate from "../uiControls/PageTemplate/PageTemplate";
import Skeleton from '../hoc/skeleton';
@connect(
  state => {
    return {
      app: state.app,
      cart: state.cart
    };
  },
  dispatch => {
    return {
      addItem: function () {
        dispatch(cartAddItem());
      },
      getCart: function () {
        dispatch(cartGetItems());
      }
    };
  }
)
class CartLanding extends React.Component {
  componentDidMount() {
    this.props.getCart();
  }
  render() {
    const { cart, history } = this.props;
    // this.props.addItem();
    const { Shipments } = cart;
    // console.log("KKK cart landing", this.props);
    let ifShips = Shipments && Shipments.length > 0;

    return (
      <PageTemplate
        history={history}
        subSection={false}
        deliverySection={false}
        title={'Cart Summary'}
      >
      <Skeleton>
        {ifShips ? (
          <ViewCart history={history} />
        ) : (
            <EmptyCart history={history} />
          )}
      </Skeleton>
      </PageTemplate>
    );
  }
}

// const CartLanding = () => (<div>CartLanding page</div>)

export default CartLanding;
