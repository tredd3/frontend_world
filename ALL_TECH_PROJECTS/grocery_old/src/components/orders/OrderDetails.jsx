import * as React from 'react'
import PageTemplate from '../uiControls/PageTemplate/PageTemplate'
import OrderSummary from './OrderSummary'
import ShipmentSummary from './ShipmentSummary'
import ShipmentNumber from './ShipmentNumber'
import Tracker from './Tracker'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import injectSheet from 'react-jss'
import Divider from '@material-ui/core/Divider'
import Items from '../uiControls/Widgets/Widget7/index'
import OrderResponse from './ShipmentsResponse'
import style from './style'
import { connect } from 'react-redux'
import { orderDetails } from '../../actions/orderDetails'
import SimilarItemsWidget from '../uiControls/Widgets/SimilarItemsWidget/index'
import Button from '../uiControls/button/index'
import OrderCancelled from "./OrderCancelled";
import PaymentMode from "../uiControls/Orders/PaymentMode";
import DeliveryAddress from '../uiControls/Orders/DeliveryAddress';
import OrderDetailsData from "../uiControls/Orders/OrderDetailsData";
import store from "../../store/index";
import API_ROUTES from '../../helper/network/api-routes'
import { fetchApi } from '../../helper/network/fetch'
import AlertBox from "../uiControls/AlertBox";
// Component : ShipmentNumber is the data regarding current shipmentid and total items in it
// Component : ShipmentSummary is the who is sending and when it is arriving
// Component : Tracker is the visual display of the status of the shipment

@injectSheet(style)
@connect(
  state => {
    return {
      orderDetailsResult: state.orderDetails
    }
  },
  dispatch => {
    return {
      orderDetails: function (orderId) {
        return dispatch(orderDetails(orderId))
      }
    }
  }
)
class OrderDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      loading: true,
      allOrderCancelled: true, // by default let it be true
      showAlertBox: false
    }
  }

  componentDidMount() {
    const { orderId } = this.props.match.params
    Promise.all([this.props.orderDetails(orderId)]).then(data => {
      'order details came'
      this.setState({ loading: false })
    })
  }

  getWidgetData = items => { }

  cancelShipment = (shipmentData = 0) => {
    let items = shipmentData ? shipmentData.items : [];
    let cancelItems = [];
    const { orderId } = this.props.match.params
    for (let i = 0; i < items.length; i++) {
      let data = {};
      data.ArticleId = items[i] ? items[i].articleId : "";
      data.ItemId = items[i] ? items[i].itemId : "";
      data.SKUId = items[i] ? items[i].skuId : "";
      data.Type = items[i] ? items[i].itemType : "";
      data.OrderId = orderId;
      cancelItems.push(data);
    }

    const state = store.getState();
    let masterOrderId = store.getState().cart.CartId || 0;
    let UserId = store.getState().user.userId
    let ShipType = 2;

    // Final API payload
    let body = {};
    body.CancelItems = cancelItems;
    body.masterOrderId = orderId;
    body.ShipType = ShipType
    body.UserId = UserId;

    fetchApi({
      url: API_ROUTES.cancelOrder,
      body: body
    })
      .then(response => {
        // this.setState({ wishListData: response })
        console.log("Order Cancelled Successfully")
      })
      .catch(json => {
        console.log('Suggestion Response in catch block')
      })

    // cancelShipment
  }
  handleClose = () => {
    this.setState({
      showAlertBox: false
    })
  }

  handleConfirmButton = () => {
    this.setState({
      showAlertBox: false
    }, this.cancelShipment())
  }

  render() {
    const { history, classes } = this.props
    const { shipmentId = "" } = this.props.match.params;
    if (shipmentId !== "") {
      console.log("Shipment Id is " + shipmentId);
    }
    // console.log(this.props.orderDetailsResult);
    // let orderData = this.state.data.orders?this.state.data.orders[0]:[];
    // let orderData = OrderResponse.Data.orders[0];
    let orderData = {}
    orderData = this.props.orderDetailsResult[0]
    console.log('Order Data is ', orderData)
    console.log(orderData);
    // widgetData.data.products = imageData;
    let shipmentsData = []
    shipmentsData = orderData && orderData.shipments ? orderData.shipments : []

    // console.log("Shipment Data ");
    // console.log(shipmentsData);
    let widgetData = this.getWidgetData(shipmentsData)
    // check all shipments are cancelled or not
    if (this.state.allOrderCancelled === true) {
      for (let i = 0; i < shipmentsData.length; i++) {
        if (shipmentsData[i].shipmentStatus !== "Cancelled") {
          this.setState({
            allOrderCancelled: false
          })
          break;
        }
      }
    }
    let orderValue = orderData ? orderData.orderValue : "";
    let totalItems = orderData ? orderData.totalItems : "";
    let productDiscount = orderData ? orderData.productDiscount : "";
    let couponValue = orderData ? orderData.couponValue : "";
    let delCharges = orderData ? orderData.delCharges : "";
    let youPaid = orderData ? orderData.finalAmount : "";
    let totalSavings = orderData ? orderData.totalSavings : "";
    let paymentMode = orderData ? orderData.paymentMode : "COD";
    let deliveryAddressName = orderData ? orderData.deliveryAddressName : "";
    let deliveryAddressAddressLine1 = orderData ? orderData.deliveryAddressAddressLine1 : "";
    let deliveryAddressAddressLine2 = orderData ? orderData.deliveryAddressAddressLine2 : "";
    let deliveryAddressPin = orderData ? orderData.deliveryAddressPin : "";
    let deliveryAddressMobileNumber = orderData ? orderData.deliveryAddressMobileNumber : "";


    return (
      shipmentId === "" ? // If shipmentId is not coming, then show all details of Order
        <PageTemplate
          history={history}
          subSection={false}
          deliverySection={false}
          righticon1={false}
          righticon2={false}
          customRighticon1={<MoreVertIcon />}
          title={'Order Details'}
        >
          {this.state.loading ? (
            null
          ) :
            <section>
              {/* {
                this.state.showAlertBox === true ? <AlertBox /> : null
              } */}
              <AlertBox open={this.state.showAlertBox} handleClose={this.handleClose} handleConfirmButton={this.handleConfirmButton} />
              {orderData ? (
                <OrderSummary
                  orderId={orderData.orderId}
                  amount={orderData.finalAmount}
                  totalItems={orderData.totalItems}
                  totalShipments={orderData.totalShipments}
                  orderedBy={orderData.orderedBy}
                  orderDate={orderData.orderDate}
                />
              ) : null}
              {/* <Divider /> */}

              {
                (this.state.allOrderCancelled && orderData !== undefined === true) ? <OrderCancelled /> : null
              }
              {shipmentsData &&
                shipmentsData.map((data, index) => {
                  return (
                    <section style={{ marginLeft: "10px", marginRight: "10px", marginBottom: "20px" }}>
                      <div className={classes.shipmentNumber}>
                        <ShipmentNumber
                          // shipmentId={data.deliverySlot}
                          currentShipment={index + 1}
                          totalShipment={orderData.totalShipments}
                          totalItems={data.items.length}
                        />
                      </div>
                      <section >
                        <Tracker status={data.shipmentStatus} statusHistory={data.statusHistory} />
                        <Divider />
                        <div className={classes.shipmentProducts}>
                          <SimilarItemsWidget widgetData={data.items} />
                        </div>
                      </section>
                      <Divider />
                      <div
                        style={{
                          backgroundColor: 'white',
                          paddingTop: '10px',
                          paddingBottom: '10px',
                          paddingLeft: '10px',
                          marginBottom: "10px",
                          display: "flex",
                          justifyContent: "flexStart"
                        }}
                      >
                        <Button
                          // onClick={e => { this.cancelShipment(data) }}
                          onClick={e => { this.setState({ showAlertBox: true }) }}
                          text="Cancel Shipment"
                          name="useLocation"
                          style={{ padding: '7px' }}
                          wrapperStyle={{ width: '41%', marginRight: "5px" }}
                          variant="subtitle2"
                          type="solidGray"
                        />
                        <Button
                          onClick={e => { }}
                          text="Call Kirana"
                          name="useLocation"
                          style={{ padding: '7px' }}
                          wrapperStyle={{ width: '41%' }}
                          type="solidGray"
                        />
                      </div>
                    </section>
                  )
                })}

              <OrderDetailsData
                orderValue={orderValue}
                totalItems={totalItems}
                productDiscount={productDiscount}
                couponValue={couponValue}
                delCharges={delCharges}
                youPaid={youPaid}
                totalSavings={totalSavings}
              />
              <PaymentMode paymentMode="COD" />
              <DeliveryAddress
                deliveryAddressName={deliveryAddressName}
                deliveryAddressAddressLine1={deliveryAddressAddressLine1}
                deliveryAddressAddressLine2={deliveryAddressAddressLine2}
                deliveryAddressPin={deliveryAddressPin}
                deliveryAddressMobileNumber={deliveryAddressMobileNumber}
              />
            </section>
          }
        </PageTemplate>
        : // if ShipmentId is coming, then show shipmentDetails particulary
        <PageTemplate
          history={history}
          subSection={false}
          deliverySection={false}
          righticon1={false}
          righticon2={false}
          customRighticon1={<MoreVertIcon />}
          title={'Order Details'}
        >

          {this.state.loading ? (
            null
          ) :
            <section>
              <AlertBox open={this.state.showAlertBox} handleClose={this.handleClose} handleConfirmButton={this.handleConfirmButton} />
              {orderData ? (
                <OrderSummary
                  orderId={orderData.orderId}
                  amount={orderData.finalAmount}
                  totalItems={orderData.totalItems}
                  totalShipments={orderData.totalShipments}
                  orderedBy={orderData.orderedBy}
                  orderDate={orderData.orderDate}
                />
              ) : null}
              <Divider />

              {
                (this.state.allOrderCancelled && orderData !== undefined === true) ? <OrderCancelled /> : null
              }
              {shipmentsData &&
                shipmentsData.map((data, index) => {
                  return (
                    <section style={{ marginLeft: "10px", marginRight: "10px", marginBottom: "20px" }}>
                      <div className={classes.shipmentNumber}>
                        <ShipmentNumber
                          shipmentId={data.deliverySlot}
                          currentShipment={index + 1}
                          totalShipment={orderData.totalShipments}
                          totalItems={data.items.length}
                        />
                      </div>
                      <section >
                        <Tracker status={data.shipmentStatus} statusHistory={data.statusHistory} />
                        <Divider />
                        <div className={classes.shipmentProducts}>
                          <SimilarItemsWidget widgetData={data.items} />
                        </div>
                      </section>
                      <div
                        style={{
                          backgroundColor: 'white',
                          paddingTop: '10px',
                          paddingBottom: '10px',
                          paddingLeft: '10px',
                          marginBottom: "10px",
                          display: "flex",
                          justifyContent: "flexStart"
                        }}
                      >
                        <Button
                          // onClick={e => { this.cancelShipment(data) }}
                          onClick={e => { this.setState({ showAlertBox: true }) }}
                          text="Cancel Shipment"
                          name="useLocation"
                          style={{ padding: '7px' }}
                          wrapperStyle={{ width: '41%', marginRight: "5px" }}
                          variant="subtitle2"
                          type="solidGray"
                        />
                        <Button
                          onClick={e => { }}
                          text="Call Kirana"
                          name="useLocation"
                          style={{ padding: '7px' }}
                          wrapperStyle={{ width: '41%' }}
                          type="solidGray"
                        />
                      </div>
                    </section>
                  )
                })}
            </section>
          }

        </PageTemplate>

    )
  }
}

export default OrderDetails
