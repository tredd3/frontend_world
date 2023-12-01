import React from "react";
import cartIcon from "./cart-minus.svg";
import style from "./style"
import injectSheet from "react-jss"
import { connect } from "react-redux"

@injectSheet(style)
@connect(({cart}) => {
    return{
        noOfItems:  cart.TotalItem === 0 || cart.TotalItem === undefined ? '' : cart.TotalItem
    }
})
class CartIcon extends React.Component {
  render() {
    const { classes, noOfItems } = this.props;
    return (
      <div className={classes.root} >
        <img src={cartIcon} alt={"cart icon"} className={classes.cartImage}/>
        <span className={classes.cartItems} >{noOfItems}</span>
      </div>
    );
  }
}

export default CartIcon;
