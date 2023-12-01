import React from "react";
import { connect } from "react-redux";
// import ViewCart from "./ViewCart";
// import EmptyCart from "./EmptyCart";
import { updatePaymentMode } from "../../../actions/cart";
import Skeleton from '../../hoc/skeleton';
import PageTemplate from "../../uiControls/PageTemplate/PageTemplate";
import { FormControl, FormControlLabel, RadioGroup, Radio } from "../../../materialUI"
import FooterActionPlaceholder from "../../uiControls/FooterActionPlaceholder"
import Button from "../../uiControls/button"
import injectSheet from "react-jss";
import style from './style';



@injectSheet(style)
@connect(
    state => ({
        selectedKirana: state.kirana.selectedKirana,
        cart: state.cart,
        checkout: state.checkout
        // deliveryModes: state.deliveryModes
    }),
    dispatch => ({
        // getDeliveryModes: function () {
        //     dispatch(getDeliveryModes());
        // }
        updatePaymentMode: function (data) {
            return dispatch(updatePaymentMode(data));
        }
    })
)
class Payment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // value: '20-May-2019',
            paymentMode: 0
        }
        this.paymentModes = {
            1: "Credit CArd / Debit Card / Net Banking",
            2: "Cash on Delivery (COD)"
        }
    }
    handleChange = (e) => {
        this.setState({
            paymentMode: parseInt(e.target.value)
        })
    }
    updatePaymentMode = (e) => {
        const { paymentMode } = this.state;
        this.props.updatePaymentMode({ PaymentMethod: paymentMode})
        this.props.history.push('/cart/place-order');
    }
    componentDidMount(){
      let paymentMode = this.props.checkout.PaymentMethod
      this.setState({paymentMode})
    }
    render() {
        const { history, classes, selectedKirana, cart } = this.props;
        const { paymentMode } = this.state;
        const selectedKiranaName = Object.keys(selectedKirana).length > 0 ? selectedKirana.Name : '';
        const TotalAmount = cart && cart.TotalPay && cart.TotalPay.toFixed(2) || 0;
        return (
            <PageTemplate
                history={history}
                subSection={false}
                deliverySection={false}
                lefticon2={false}
                righticon2={false}
                righticon1={false}
                title={'Select a Payment Method'}
            >
                <Skeleton>
                    <div>
                        {/* <h3 style={{ marginTop: 70 }} className={'fs14 regular'}>Select a Payment Method</h3> */}
                        <div style={{ width: "100%", background: '#004D9C', display: "flex", color: '#FFF', alignItems: 'center', minHeight: 50, }} className={'fs16 regular'}>
                            <div style={{ flexGrow: 1, paddingLeft: 15, width: '50%', borderRight: '1px solid #6492c3', height: '100%' }}> Total Amount</div>
                            <div style={{ flexGrow: 1, textAlign: 'right', paddingRight: 15, width: '50%', height: '100%' }}>&#8377; {`${TotalAmount}`} </div>
                        </div>
                    </div>
                    <Button wrapperStyle={{ margin: 15 }} text={"Continue"} type="solidTulip" onClick={this.updatePaymentMode} />
                    <div className={classes.root}>
                        <div className="fs14 regular">
                            <FormControl component="fieldset" className={classes.formGroup} >
                                <RadioGroup
                                    aria-label="choose delivery slot"
                                    name="delivery"
                                    value={this.state.paymentMode}
                                    onChange={this.handleChange}>
                                    {[1,2].map(val => {
                                        return(
                                          <FormControlLabel
                                              className="formControlLabel"
                                              value={val}
                                              control={
                                                  <Radio
                                                      classes={{
                                                          root: classes.radioButton
                                                      }}
                                                      color="primary"
                                                  />
                                              }
                                              label={(<div style={{}}>
                                                  <span style={{ color: 'hsla(208, 100%, 37%, 1)' }}>{this.paymentModes[val]}</span><br />
                                                  {paymentMode === val ? <span className={classes.selectedStore1}>{`Served by ${selectedKiranaName}`}</span> : null}
                                              </div>)}
                                              labelPlacement="end"
                                          />
                                        )
                                    })}
                                </RadioGroup>
                            </FormControl>
                        </div>
                    </div>
                    <Button wrapperStyle={{ margin: 15 }} text={"Continue"} type="solidTulip" onClick={this.updatePaymentMode} />
                </Skeleton>
            </PageTemplate>
        );
    }
}

export default Payment;
