import React from "react";
import style from "./style";
import injectSheet from "react-jss";
import { connect } from "react-redux";
import PageTemplate from "../uiControls/PageTemplate/PageTemplate";
import FooterActionPlaceholder from "../uiControls/FooterActionPlaceholder";
import Button from "../uiControls/button";
import { cartGetItems } from "../../actions/cart";


import Shipment from "./Shipment";
// import Product from "./Product"
// import SaveForLater from "./SaveForLater";

@connect(
  state => {
    return {
      cart: state.cart
    };
  },
  dispatch => {
    return {
      getCart: function () {
        return dispatch(cartGetItems());
      }
    }
  }
)
@injectSheet(style)
class UpdateCart extends React.Component {

  componentDidMount(){
      this.props.getCart().then(()=>{
        let previousCartValue = localStorage.getItem("previousCartValue")
        if(previousCartValue == this.props.cart.TotalPay) {
          this.props.history.push('/cart/delivery-options')
        }
      });
  }

  render() {
    const { classes, history, cart } = this.props;
    // let response = {"Control":{"Status":1,"Message":"Cart Detail","TimeTaken":"0.23993897438049 Second","MessageCode":null},"Data":{"fcOrder":null,"CartId":762,"UserId":9953018896,"StoreId":null,"Shipments":[{"Type":0,"SlotId":0,"TimeSlot":"","DeliveryDate":"","Product":[{"SelectedQuantity":6,"ProductSkuId":10001299,"Status":1,"MRP":188.0,"SP":137.0,"Barcode":"8901725121112","EntityBarcodeId":"102870910","ProductId":100001157,"CategoryId":120,"IsFc":0,"StoreProductBatchId":"100051728","ProductName":"Aashirvaad Atta","ProductImage":"https://jiomerchantsit.akamaized.net/static/product/Aashirvaad-Atta-10kg-AaramShop-19.jpg","ProductOtherImage":[],"PricePercentage":27.13,"Coupons":null,"FCProductId":0},{"SelectedQuantity":4,"ProductSkuId":10001302,"Status":1,"MRP":166.0,"SP":137.0,"Barcode":"8901725121228","EntityBarcodeId":"102870912","ProductId":100001159,"CategoryId":120,"IsFc":0,"StoreProductBatchId":"100051730","ProductName":"Aashirvaad Select Atta","ProductImage":"https://jiomerchantsit.akamaized.net/static/product/aashirvaad-select-5-AaramShop-76.jpg","ProductOtherImage":[],"PricePercentage":17.47,"Coupons":null,"FCProductId":0},{"SelectedQuantity":3,"ProductSkuId":10044353,"Status":1,"MRP":165.0,"SP":115.0,"Barcode":"8901262150705","EntityBarcodeId":"102871616","ProductId":100038948,"CategoryId":85,"IsFc":0,"StoreProductBatchId":"100052434","ProductName":"Amul Kool Koko","ProductImage":"https://jiomerchantsit.akamaized.net/static/product/no_image_found.png","ProductOtherImage":[],"PricePercentage":30.3,"Coupons":null,"FCProductId":0}],"TotalAmount":1715.0,"TotalDiscount":572.0,"TotalCouponDiscount":0.0,"TotalPay":1715.0,"DeliveryCharge":0.0,"DeliveryDay":"Tomorrow","TotalItem":13,"CreationDate":"11-Jul-2019"}],"TotalAmount":1715.0,"TotalMRPDiscount":572.0,"TotalOrderLevelDiscount":0.0,"TotalDeliveryCharge":0.0,"TotalItem":13,"TotalCouponDiscount":0.0,"TotalPay":1715.0,"SaveLater":[],"LTM":"api.jiomoney.com","FcCartId":null}};
    // let cart = response.Data

    const { Shipments, SaveLater } = cart;
    let previousCartValue = localStorage.getItem("previousCartValue")
    const totalShipments = Shipments.length
    return (
      <div className={classes.root}>
          <PageTemplate
                history={history}
                subSection={false}
                deliverySection={false}
                lefticon2={false}
                righticon2={false}
                righticon1={false}
                title={'Update Cart'}
            >
                <div>
                    <div style={{display: "flex", backgroundColor: '#fff', margin: 10, marginTop: 70, border: '1px solid #999999', padding: 5}} className={'fs14 regular'}>
                        <p>Product availability and prices are location based. There are changes in your cart for the new delivery address selected. Details are mentioned below.</p>
                    </div>
                    <div style={{ margin: 10,}}>
                        <div style={{display: 'flex', flexDirection: 'column', background: '#FFF', border: '1px solid #999999', alignItems: "center", padding: 5}} className={'fs12'} >
                            <div style={{display: 'flex', width: '100%'}}>
                                <span style={{flexGrow: 1}}>Previous Value of items: </span>
                                <span> &#8377; {previousCartValue}</span>
                            </div>
                            <div style={{display: 'flex', width: '100%'}}>
                                <span style={{flexGrow: 1}}>Current Value of items</span>
                                <span> - &#8377; {cart.TotalPay}</span>
                            </div>
                            <div style={{display: 'flex', width: '100%', paddingBottom: 10, borderBottom: '1px solid #999'}}>
                                <span style={{flexGrow: 1}}>Additional Saving </span>
                                <span> + &#8377; {cart.TotalCouponDiscount}</span>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    Shipments.map((shipment,i)=>(<Shipment key={i} sn={i+1} total={totalShipments} details={shipment} />))
                }
                <FooterActionPlaceholder>
                    <div style={{ display: 'flex', }}>
                        <Button wrapperStyle={{  flexGrow: 1, marginRight: 10 }} text={"Cancel"} onClick={() => history.push('/')} />
                        <Button wrapperStyle={{  flexGrow: 1 }} text={"Continue"} type="solidTulip" onClick={() => history.push('/cart/delivery-options')} />
                    </div>   
                </FooterActionPlaceholder>
        </PageTemplate>
      </div>
    );
  }
}

export default UpdateCart;
