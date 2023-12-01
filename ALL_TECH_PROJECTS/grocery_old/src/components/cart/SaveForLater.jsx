import React from "react";
import style from "./style";

// import injectSheet from "react-jss";
import { connect } from "react-redux";
// import Shipment from "./Shipment";
import Product from "./Product";

// @connect(
//   state => {
//     return {
//       cart: state.cart
//     };
//   }
// )
// @injectSheet(style)
class SaveForLater extends React.Component {
  render() {
    const { items } = this.props;
    // const { Shipments, SaveLater } = cart;
    const totalItems = items.length;
    return (
      <div style={{ backgroundColor: "#fff" }}>
        <h2 className={"fs16 semiBold"} style={{ padding: "10px 0 0 10px" }}>
          Save for later
          <span className={"fs12 regular"}>({totalItems} items)</span>
        </h2>
        {items.map((item, i) => (
          <Product saveForLater {...item} key={i} />
        ))}
      </div>
    );
  }
}

export default SaveForLater;
