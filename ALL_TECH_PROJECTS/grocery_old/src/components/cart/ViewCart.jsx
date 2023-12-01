import React from "react";
import style from "./style";

import injectSheet from "react-jss";
import { connect } from "react-redux";
import Shipment from "./Shipment";
import Product from "./Product"
import SaveForLater from "./SaveForLater";
import Button from "../uiControls/button"
// import Radio from "@material-ui/core/Radio";
// import RadioGroup from "@material-ui/core/RadioGroup";
// import FormHelperText from "@material-ui/core/FormHelperText";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import FormControl from "@material-ui/core/FormControl";
// import Sort from "@material-ui/icons/Sort";
// import Check from "@material-ui/icons/CheckCircle";
// import Menu from "@material-ui/core/Menu";
// import MenuItem from "@material-ui/core/MenuItem";
// import Popper from "@material-ui/core/Popper";
// import Typography from "@material-ui/core/Typography";
// import ClickAwayListener from "@material-ui/core/ClickAwayListener";
// import Button from '@material-ui/core/Button';
// import Fade from "@material-ui/core/Fade";
// import Paper from "@material-ui/core/Paper";
// import { fetchApi } from "../../helper/network/fetch";
// import API_ROUTES from "../../helper/network/api-routes";

// import FormLabel from "@material-ui/core/FormLabel";
// import { makeStyles } from "@material-ui/core/styles";
// import { changeKirana, addKiranas, sortKiranasByDistance, sortKiranasByName } from "../../actions/index";


@connect(
  state => {
    return {
      cart: state.cart,
      deliveryThreshold: state.config["DELIVERY_CHARGE_THRESHOLD_AMOUNT"]
    };
  }
)
@injectSheet(style)
class ViewCart extends React.Component {
  constructor(props){
      super(props);
    this.state = {
    };
  }

  render() {
    const { classes, cart, history, deliveryThreshold } = this.props;
    const { Shipments, SaveLater } = cart;
    // console.log("KKK what ", this.props, cart, Shipments);
    const totalShipments = Shipments.length;
    console.log("KKK what ", this.props, cart, Shipments, totalShipments);

    return (
      <div className={classes.root}>
        <div>
          <div style={{margin: '0 0 7px 0',
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#fff",
            minHeight: 70,
            boxShadow: "0px 4px 5px 0px hsla(0, 0%, 0%, 0.16)",
            padding: '10px'
            }}>
            <div style={{display: "flex", margin: '5px', color: 'hsla(0, 0%, 20%, 1)',fontWeight: 600}}>
              <div>You Pay <span style={{ fontSize: '14px'}}>({cart.TotalItem} Items)</span>{ (cart.TotalPay > deliveryThreshold ) ?  <><br /><div className={classes.subText}>Includes  &#8377;20 delivery fee</div></> : null}</div>
              <div style={{ marginLeft: "auto"}}>
              &#8377; {cart.TotalPay.toFixed(2)}
            </div>
          </div>
          <div style={{display: "flex", margin: '0 5px', color: 'hsla(126, 91%, 31%, 1)', fontWeight: 600, fontSize: '14px'}}>
              <div style={{fontWeight: '400'}}>Your savings on MRP </div>
              <div style={{ marginLeft: "auto"}}>
                &#8377; {cart.TotalMRPDiscount.toFixed(2)}
              </div>
          </div>
          <span style={{color:'hsla(229, 3%, 39%, 1)', margin: '0 5px', fontSize:'12px'}}>
          { (deliveryThreshold && (cart.TotalPay < deliveryThreshold )) ? `Add items worth ₹${(deliveryThreshold - cart.TotalPay).toFixed(2)} for free delivery`: "You are eligible for free delivery"}
          </span>
          <span style={{display: "grid", gridTemplateColumns: '1fr 1fr', gridGap:15, margin: '5px', color: 'hsla(0, 0%, 20%, 1)',fontWeight: 600}}>
            <Button text={"Continue Shopping"} type={'solidGray'} onClick={()=>this.props.history.push('/')} />
            <Button text={"Proceed to Buy"} type={'solidTulip'} onClick={()=>this.props.history.push('/account/select-address')} />
          </span>
        </div>
      </div>
        {
          Shipments && Shipments.map((shipment,i)=>(<Shipment key={i} sn={i+1} total={totalShipments} details={shipment}  />))
        }
        {SaveLater && SaveLater.length> 0? (<SaveForLater items={SaveLater} />):null }
      </div>
    );
  }
}

export default ViewCart;
