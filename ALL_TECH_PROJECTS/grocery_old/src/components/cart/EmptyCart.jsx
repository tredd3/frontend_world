import React from "react";
// import ShopByCategory from "../shopByCategory/ShopByCategory"
import Button from "../uiControls/button"

const EmptyCart = ({history}) => (
  <div style={{ margin: 15, marginTop: 65 }}>
    <h2 className={"fs16 semiBold"}>Your Shopping Cart is empty</h2>
    <p className={"fs14 regular"}>
      Your Shopping Cart lives to serve. Give it purpose. Fill it with books,
      CSs, Videos, DVDs, Electronics, and more.
    </p>
    <p className={"fs14 regular"}>
      Continue shopping on Jio Mart app, learn about today's deals, or visit
      your WishList.
    </p>
    <hr />
    <h2 className={"fs16 semiBold"}>Returns as easy</h2>
    <p className={"fs14 regular"}>
      10-30 days returs on most items as per the Jio Mart Return policy.
    </p>
    <hr />
    <h3 className={"fs14 semiBold"}>Get 10% cash back up to 100</h3>
    <p className={"fs14 regular"}>
      Using RePay ATM card, Debit card or Credit card. Cashback within 3 days.
      T&amp;C Apply
    </p>
    <div style={{position: "fixed",
        bottom: 0,
        width: "93%",
        marginBottom: 15,
        textAlign:'center'}}>
        <Button text={"Continue Shopping"} type="solidTulip" onClick={()=>history.push('/')}  />
    </div>
  </div>
);

export default EmptyCart;
