import * as React from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircleOutline";
import Typography from "@material-ui/core/Typography";
import injectSheet from "react-jss";
import style from "./style";
import PageTemplate from "../uiControls/PageTemplate/PageTemplate";
import ShipmentNumber from "../orders/ShipmentNumber";
import Tracker from "../orders/Tracker";
import Response from "./ShipmentResponse";
import Divider from "@material-ui/core/Divider";
import { similarItems } from "../../actions/similarItems";
import { orderDetails } from "../../actions/orderDetails";
import { connect } from "react-redux";
import SimilarItems from "../uiControls/Widgets/Widget7/index";
import NoResult from "../uiControls/NoResults";
@injectSheet(style)
@connect(
    state => {
        return {
            similarItemResult: state.similarItems,
            orderDetailsResult: state.orderDetails
        }
    },
    dispatch => {
        return {
            similarItems: function (categoryId, productSkuId) {
                dispatch(similarItems(categoryId, productSkuId))
            },
            orderDetails: function (orderId) {
                dispatch(orderDetails(orderId));
            },
        }
    }
)
class OrderPlaced extends React.Component {

    componentDidMount() {
        const { orderId } = this.props.match.params;
        this.props.orderDetails(orderId);
        this.props.similarItems(75, 10005599)
    }

    handleSeeMore = (productSkuId, categoryId) => {
        return (
            () => {
                let { history } = this.props;
                console.log(history);
                history.push({
                    pathname: '/productsList/similarItems',
                    state: {
                        productSkuId: productSkuId,
                        categoryId: categoryId
                    }
                })
                console.log(history);
                console.log("Ready to move");
            }
        )
    }

    render() {
        const { classes, history } = this.props;
        let shipmentsData = [], totalShipments, orderId, orderTotal;
        let Response = this.props.orderDetailsResult;

        if (Response.length) {
            shipmentsData = Response.Data.orders[0].shipments;
            totalShipments = Response.Data.orders[0].totalShipments;
            orderId = this.props.match.params.orderId;
            orderTotal = Response.Data.orders[0].orderTotal;
        }

        let similarItemsData = this.props.similarItemResult.Data ? this.props.similarItemResult.Data : {}
        similarItemsData = similarItemsData.Products ? similarItemsData.Products : [];
        let widgetDataSimItems = {};
        widgetDataSimItems.title = "Similar Items";
        widgetDataSimItems.deepLinkText = "See More";
        widgetDataSimItems.data = {};
        widgetDataSimItems.data.products = similarItemsData ? similarItemsData : [];

        let categoryId = 75;
        let productSkuId = 10005599

        return (
            <PageTemplate
                history={history}
                subSection={false}
                deliverySection={false}
                lefticon2={false}
                righticon2={false}
                title={'JioMart'}>

                <section className={classes.placedDiv}>
                    <div className={classes.checkCircleDiv}>
                        <CheckCircleIcon />
                    </div>
                    <div className={classes.thankYouTextDiv}>
                        <Typography className={classes.thankYouText}>
                            Thank you for shopping with us
                    </Typography>
                    </div>
                    <div className={classes.orderIdTextDiv}>
                        <Typography>
                            Order Id : {this.props.match.params.orderId}
                        </Typography>
                    </div>
                </section>
                {
                    shipmentsData.map((data, index) => {
                        return (
                            <section>
                                <div className={classes.shipmentNumber}>
                                    <ShipmentNumber
                                        shipmentId={data.deliverySlot}
                                        currentShipment={index + 1}
                                        totalShipment={totalShipments}
                                        totalItems={data.items.length}
                                        orderTotal={orderTotal}
                                    />
                                </div>
                                <div className={classes.tracker}>
                                    <Tracker status={data.shipmentStatus} />
                                </div>
                                {
                                    index < (totalShipments - 1) ?
                                        <Divider style={{ marginTop: "15px" }} /> :
                                        null
                                }

                            </section>
                        )
                    })
                }
                <section style={{
                    background: "white",
                    marginTop: "15px"
                }}>
                    {
                        widgetDataSimItems.data.products.length > 0 ?
                            <SimilarItems widgetData={widgetDataSimItems} handleSeeMore={this.handleSeeMore(productSkuId, categoryId)} />
                            :
                            null
                    }
                </section>
            </PageTemplate>
        )
    }
}
export default OrderPlaced;

