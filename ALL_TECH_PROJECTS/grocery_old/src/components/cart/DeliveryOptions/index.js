import React from "react";
import { connect } from "react-redux";
// import ViewCart from "./ViewCart";
// import EmptyCart from "./EmptyCart";
import { getDeliveryModes, checkout, selectingDeliveryMode } from "../../../actions/cart";

import PageTemplate from "../../uiControls/PageTemplate/PageTemplate";
import { FormControl, FormControlLabel, RadioGroup, Radio } from "../../../materialUI"
import FooterActionPlaceholder from "../../uiControls/FooterActionPlaceholder"
import Button from "../../uiControls/button"
import injectSheet from "react-jss";
import style from './style';

import { fetchApi } from '../../../helper/network/fetch'
import API_ROUTES from "../../../helper/network/api-routes";


@connect(
    state => ({
        deliveryModes: state.deliveryModes,
        store: state
    }),
    dispatch => ({
        getDeliveryModes: function () {
            dispatch(getDeliveryModes());
        },
        checkout: function (data) {
            return dispatch(checkout(data));
        },
        selectingDeliveryMode: function (mode) {
            return dispatch(selectingDeliveryMode(mode));
        },
    })
)
@injectSheet(style)
class DeliveryOptions extends React.Component {
    state = {
        value: ''
    }
    componentDidMount() {
        this.props.getDeliveryModes();
    }
    handleChange = (e) => {
        this.setState({
            value: e.target.value
        })
    }

    goToPlaceOrder = () => {
        // this.props.setDeliveryMode(this.state.value, this.props.history);
        const { store, deliveryModes } = this.props;
        let dmObj = deliveryModes.StorePickup.filter(dm=> dm.DateValue == this.state.value)[0];
        fetchApi({
                    url: API_ROUTES.checkout,
                    body: {
                        "storeId": store.userAddress.address.storeId,
                        "cartId": store.cart.CartId,
                        "userId": store.user.userId,
                        "userMobile": store.user.phoneNumber,
                        "customerAddressId": store.userAddress.address.addressId,
                        "isAutoSelected": store.userAddress.address.isAutoSelected || 0,
                        "deliveryDate": dmObj.DateValue,
                        "timeslot":dmObj.Slot[0]["SlotId"],
                    }
                })
                .then(res=>{
                    return this.props.checkout(res.Data, this.props.history)
                })
                .then(res=>{
                    return this.props.selectingDeliveryMode({date: dmObj.DateValue, timeSlot: dmObj.Slot[0]["SlotId"]})
                })
                .then(res=> {
                    console.log("yes we reached further ");
                    // this.props.history.push('/cart/place-order');
                    this.props.history.push('/cart/select-payment');
                })
                .catch(error=>{
                    console.log("Oh damn, error in checkout", error);
                });
    }

    render() {
        const { history, classes, deliveryModes } = this.props;
        return (
            <PageTemplate
                history={history}
                subSection={false}
                deliverySection={false}
                lefticon2={false}
                righticon2={false}
                righticon1={false}
                title={'Choose Delivery Option'}
            >
                <div className={classes.root}>
                    <h3 style={{ marginTop: 70 }} className={'fs14 regular'}>Choose Your Delivery Day</h3>
                    {deliveryModes.StorePickup ?(<div className={classes.formGroupContainer}>
                        <FormControl component="fieldset" className={classes.formGroup} >
                            <RadioGroup
                                aria-label="choose delivery slot"
                                name="delivery"
                                value={this.state.value}
                                onChange={this.handleChange}>
                                {deliveryModes.StorePickup ? deliveryModes.StorePickup.map((mode, i) => (<FormControlLabel
                                    classes={{
                                        root: classes.formControlLabel + ` ${(deliveryModes.StorePickup.length - 1) !== i ? classes.borderBottom : ''}`
                                    }}
                                    value={mode.DateValue}
                                    control={
                                        <Radio
                                            classes={{
                                                root: classes.radioButton
                                            }}
                                        />
                                    }
                                    label={mode.Date}
                                    labelPlacement="end"
                                />)) : null}
                            </RadioGroup>
                        </FormControl>
                    </div>): null}
                </div>
                <Button wrapperStyle={{ margin: 15 }} text={"Continue"} type="solidTulip" onClick={this.goToPlaceOrder} disable={!this.state.value} />

                <FooterActionPlaceholder>
                    <div style={{ borderTop: '1px solid #DBDBDB', content: '', position: 'relative', color: "#999999", margin: "0 15px", }}>
                        <div style={{ position: 'absolute', top: 0, left: '50%', marginRight: "-50%", transform: "translate(-50%, -50%)", padding: "0 10px", backgroundColor: "#fff" }} className={'fs14 regular'}> OR </div>
                        <div style={{ margin: '20px 0' }} onClick={() => { history.push({ pathname: '/' }) }} className={'fs14 semiBold'}>Cancel and Continue Shopping</div>
                    </div>
                </FooterActionPlaceholder>
            </PageTemplate>
        );
    }
}



export default DeliveryOptions;
