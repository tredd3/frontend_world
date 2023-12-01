import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import {
  Button,
  ChevronRight,
  FormControl,
  InputLabel,
  LocalOffer,
  OutlinedInput,
  Select,
  TextField
} from "../../materialUI";
import Quantity from "../uiControls/Quantity"
import ShipmentStyle from "./shipmentStyle";
import injectSheet from "react-jss";
import { cartAddItem, cartGetItems, cartRemoveItem, cartMoveItem } from "../../actions/cart";
import Placeholder from '../../assets/images/icons/Placeholder.webp';
import { LazyLoadImage } from 'react-lazy-load-image-component';

@injectSheet(ShipmentStyle)
@connect(
  state => ({}),
  dispatch => {
    return {
      removeItem: function (product) {
        dispatch(cartRemoveItem(product));
      },
      addItem: function (item) {
        dispatch(cartAddItem(item));
      },
      getCart: function () {
        dispatch(cartGetItems());
      },
      moveItem: function (product) {
        dispatch(cartMoveItem(product))
      }
    };
  }
)
class Product extends React.Component {
  state = {
    quantity: this.props.SelectedQuantity
  };

  handleChange = (name, product) => event => {
    this.props.addItem({ ...product, Quantity: event.target.value })
  };

  componentDidUpdate(prevProps) {
    if (prevProps.SelectedQuantity !== this.props.SelectedQuantity) {
      this.setState({ quantity: this.props.SelectedQuantity });
    }
  }

  render() {
    const {
      classes,
      ProductName,
      ProductImage,
      CouponResult,
      SP,
      MRP,
      PricePercentage,
      ProductSkuId,
      IsFc,
      saveForLater
    } = this.props;
    const { quantity } = this.state;
    return (
      <div className={'product-li'}
        style={{
          minHeight: 70,
          backgroundColor: "#fff",
          display: "flex",
          flexDirection: "row",
          padding: "10px",
          boxShadow: "0px 1px 1px 0px hsla(0, 0%, 0%, 0.16)"
        }}
      >
         <LazyLoadImage
            alt={ProductName}
            effect="blur"
            src={ProductImage}
            placeholderSrc={Placeholder}
            width={"60px"}
            height={"60px"}
             />
        {/* <img
          src={ProductImage}
          style={{
            width: 70,
            height: 70,
            marginRight: "10px",
            marginTop: "10px",
            marginBottom: "auto"
          }}
          alt={ProductImage + " image"}
        /> */}
        <div
          style={{
            marginLeft:10,
            position: "relative",
            minHeight: "70px",
            color: "hsla(0, 0%, 20%, 1)"
          }}
        >
          <div
            style={{
              color: "#333333",
              fontWeight: "300",
              fontSize: "14px",
              margin: "3px 0",
            }}
          >
            {ProductName}
          </div>
          <div
            style={{
              color: "hsla(0, 0%, 60%, 1)",
              fontSize: "16px",
              margin: "3px 0",
            }}
          >
            <span style={{ color: "hsla(10, 94%, 33%, 1)" }}>
              &#8377; {SP}
            </span>
            &nbsp;
            <span
              style={{
                color: "hsla(0, 0%, 60%, 1)",
                fontSize: "13px",
                textDecoration: "line-through"
              }}
            >
              &#8377; {MRP}
            </span>
            &nbsp;
            <span style={{ color: "hsla(229, 3%, 39%, 1)", fontSize: "11px" }}>
              ({PricePercentage}%)
            </span>
          </div>
          {(CouponResult)?<div className={classes.coupon}>
            <div className={"couponWrapper"}>
              <div className="coupon">
                <LocalOffer className="couponIcon" />
                <span className="couponText">COUPON AVAILABLE </span>
              </div>
            </div>
          </div>
          : null}
          <div style={{ display: "flex" }}>
            {saveForLater ? null : <Quantity quantity={quantity} ProductSkuId={ProductSkuId} IsFc={IsFc} replaceQuantity />}
            <Button
              style={{
                background: "#F9FAFC",
                backgroundImage: "linear-gradient(to bottom, #F9FAFC, #E8E7EC)",
                borderRadius: "2px",
                color: "#333333",
                // fontSize: "20px",
                // padding: "10px 20px 10px 20px",
                border: "solid #A5A5A5 1px",
                // padding: "6px 15px",
                // marginLeft: 10,
                textTransform: "none",
                fontWeight: 400
                // textDecoration: "none"
              }}
              onClick={() =>
                this.props.removeItem({
                  ProductSkuId,
                  Quantity: 0,
                  ProductType: IsFc
                })
              }
            >
              Delete
            </Button>
            {saveForLater
              ? (<Button
                style={{
                  background: "#F9FAFC",
                  backgroundImage: "linear-gradient(to bottom, #F9FAFC, #E8E7EC)",
                  borderRadius: "2px",
                  color: "#333333",
                  // fontSize: "20px",
                  // padding: "10px 20px 10px 20px",
                  border: "solid #A5A5A5 1px",
                  // padding: "6px 15px",
                  marginLeft: 10,
                  textTransform: "none",
                  fontWeight: 400
                  // textDecoration: "none"
                }}

                onClick={() => this.props.moveItem({
                  ProductSkuId,
                  Quantity: this.state.quantity,
                  ProductType: 0,
                  moveType: "MoveToCart"
                })}
              >
                Move to Cart
            </Button>)
              : (<Button
                style={{
                  background: "#F9FAFC",
                  backgroundImage: "linear-gradient(to bottom, #F9FAFC, #E8E7EC)",
                  borderRadius: "2px",
                  color: "#333333",
                  // fontSize: "20px",
                  // padding: "10px 20px 10px 20px",
                  border: "solid #A5A5A5 1px",
                  // padding: "6px 15px",
                  marginLeft: 10,
                  textTransform: "none",
                  fontWeight: 400
                  // textDecoration: "none"
                }}

                onClick={() => this.props.moveItem({
                  ProductSkuId,
                  Quantity: this.state.quantity,
                  ProductType: 0,
                  moveType: "SaveForLater"
                })}
              >
                Save for later
            </Button>)}
          </div>
        </div>
      </div>
    );
  }
}

export default Product;
