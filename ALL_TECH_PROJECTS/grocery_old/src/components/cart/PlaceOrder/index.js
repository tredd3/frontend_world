import React from "react";
import { connect } from "react-redux";
// import ViewCart from "./ViewCart";
// import EmptyCart from "./EmptyCart";
import { getDeliveryModes } from "../../../actions/cart";

import PageTemplate from "../../uiControls/PageTemplate/PageTemplate";
import { FormControl, FormControlLabel, RadioGroup, Radio, ChevronRight, Home, PaymentIcon } from "../../../materialUI"
import FooterActionPlaceholder from "../../uiControls/FooterActionPlaceholder"
import Button from "../../uiControls/button"
import injectSheet from "react-jss";
import style from './style';

import { fetchApi } from '../../../helper/network/fetch';
import API_ROUTES from "../../../helper/network/api-routes";



@connect(
    state => ({
        checkout: state.checkout,
        user: state.user,
        address: state.userAddress.address,
        delivery: state.selectedDM
    }),
)
@injectSheet(style)
class PlaceOrder extends React.Component {
    placeOrder = () => {
        const { user, address, checkout, delivery } = this.props
        const { CartId,
            Shipments,
            FcCartId,
            TotalAmount,
            TotalCouponDiscount,
            TotalDeliveryCharge,
            TotalItem,
            TotalMRPDiscount,
            TotalOrderLevelDiscount,
            TotalPay,
            PaymentMethod,
            UserId, } = checkout;
        fetchApi({
            url: API_ROUTES.placeOrder,
            body: {
                CartId,
                FcCartId,
                TotalAmount,
                TotalCouponDiscount,
                TotalDeliveryCharge,
                TotalItem,
                TotalMRPDiscount,
                TotalOrderLevelDiscount,
                TotalPay,
                UserId: user.userId,
                IsAutoSelected: address.isAutoSelected,
                UserMobile: user.phoneNumber,
                StoreId: address.storeId || address.defaultStore,
                CustomerAddressId: address.addressId,
                PaymentMethod: PaymentMethod,//2 COD
                //Below two are Shipments Array object, why made into two object now ?
                StoreShipments: { ...Shipments[0], TimeSlot: delivery.timeSlot, DeliveryDate: delivery.date },
                MID: "",
                FcShipments: {}
            }
        })
            .then(res => {
                this.props.history.push(`/orderPlaced/${res.Data.Shipment1.OrderId}`)
            })
            .catch(error => {
                console.log("Oh damn, error in Placing Order", error);
            });
    }
    render() {
        const { history, classes, checkout, address } = this.props;
        return (
            <PageTemplate
                history={history}
                subSection={false}
                deliverySection={false}
                lefticon2={false}
                righticon2={false}
                righticon1={false}
            >
                <div>
                    <div style={{ width: "100%", background: '#004D9C', display: "flex", color: '#FFF', alignItems: 'stretch', minHeight: 50, flexDirection: 'column' }} className={'fs16 regular'}>
                        <Button wrapperStyle={{ margin: 15, marginBottom: 0 }} text={"Place Your Order"} type="solidTulip" onClick={this.placeOrder} />
                        <p style={{
                            color: "#fff",
                            textAlign: "center",
                            margin: 5,
                            fontSize: 9,
                        }}>You agree to <span className={'semiBold'}> Terms and Conditions </span>  by placing this order</p>
                    </div>
                </div>

                <div style={{ margin: 15, }}>
                    <div style={{ display: 'flex', alignItems: "center", marginBottom: 5 }} >
                        <h3 className={'fs12 regular'}>Order Summary</h3>
                        {/* <span style={{marginLeft: 'auto', textAlign: 'right'}} className={'fs12 regular'}>+Add other wallets</span> */}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', background: '#FFF', border: '1px solid #999999', alignItems: "center", padding: 5 }} className={'fs12'} >
                        <div style={{ display: 'flex', width: '100%' }}>
                            <span style={{ flexGrow: 1 }}>Selling Price ({checkout.TotalItem} items)</span>
                            <span> &#8377; {checkout.TotalAmount}</span>
                        </div>
                        <div style={{ display: 'flex', width: '100%' }}>
                            <span style={{ flexGrow: 1 }}>Coupon Discount</span>
                            <span> - &#8377; {checkout.TotalCouponDiscount}</span>
                        </div>
                        <div style={{ display: 'flex', width: '100%', paddingBottom: 10, borderBottom: '1px solid #999' }}>
                            <span style={{ flexGrow: 1 }}>Delivery Charges </span>
                            <span> + &#8377; {checkout.TotalDeliveryCharge}</span>
                        </div>
                        <div style={{ display: 'flex', width: '100%', paddingTop: 10 }}>
                            <span style={{ flexGrow: 1 }}>You Pay</span>
                            <span> &#8377; {checkout.TotalPay}</span>
                        </div>
                        <div style={{ display: 'flex', width: '100%' }}>
                            <span style={{ flexGrow: 1 }}>Your savings on MRP</span>
                            <span> &#8377; {checkout.TotalMRPDiscount}</span>
                        </div>
                    </div>
                </div>

                <div style={{ margin: 15 }}>
                    <div style={{ display: 'flex', alignItems: "center", marginBottom: 5 }} >
                        <h3 className={'fs12 regular'}>Deliver to</h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', background: '#FFF', border: '1px solid #999999', alignItems: "stretch", padding: 5 }} className={'fs12'} >
                        <div style={{ display: 'flex', width: '100%', alignItems: 'center' }}>
                            <span style={{ marginRight: 'auto' }}><Home /> </span>
                            <span style={{ flexGrow: 1, marginLeft: 5, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}> {`${address.address, address.addressLine1, address.addressLine2, address.addressLine3}`}</span>
                            <span style={{ marginLeft: 'auto' }}> <ChevronRight /> </span>
                        </div>
                    </div>
                </div>

                <div style={{ margin: 15 }}>
                    <div style={{ display: 'flex', alignItems: "center", marginBottom: 5 }} >
                        <h3 className={'fs12 regular'}>Pay With</h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', background: '#FFF', border: '1px solid #999999', alignItems: "stretch", padding: 5 }} className={'fs12'} >
                        <div style={{ display: 'flex', width: '100%', alignItems: 'center' }}>
                            <span style={{ marginRight: 'auto' }}><PaymentIcon /> </span>
                            <span style={{ flexGrow: 1, marginLeft: 5 }}> {checkout.PaymentMethod == 1 ? "Credit Card / Debit Card / Net Banking" : "Cash on Delivery (COD)"} <br /> Served by {this.props.address.storeName} </span>
                            <span style={{ marginLeft: 'auto' }}> <ChevronRight /> </span>
                        </div>
                    </div>
                </div>

                <div style={{ width: "100%", display: "flex", alignItems: 'stretch', minHeight: 50, flexDirection: 'column' }} className={'fs16 regular'}>
                    <Button wrapperStyle={{ margin: 15, marginBottom: 0 }} text={"Place Your Order"} type="solidTulip" onClick={this.placeOrder} />
                    <p style={{
                        textAlign: "center",
                        margin: 5,
                        fontSize: 9,
                    }}>You agree to <span className={'semiBold'}> Terms and Conditions </span>  by placing this order</p>
                </div>
            </PageTemplate>
        );
    }
}



export default PlaceOrder;
