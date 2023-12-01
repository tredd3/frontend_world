import React from 'react';
import injectSheet from 'react-jss';
import style from './style';
import Shipment from './Shipment';
import {
    ChevronRight,
    Typography
} from "../../materialUI";
import { formatDate } from "../../helper/utilites"

@injectSheet(style)

class Order extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showShipments: false
        }
    }

    getOrderDetails = orderId => e => {
        this.props.history.push(`/orderDetails/${orderId}`)
    }

    showShipments = e => {
        this.setState(prevState => ({ showShipments: !prevState.showShipments }))
    }

    render() {
        const { classes, history, orderData, index } = this.props;
        const { orderId, orderDate, orderedBy, finalAmount, totalItems, totalShipments, shipments } = orderData;
        const { showShipments } = this.state;
        const style = (showShipments || index === 0) ? { borderLeft: "4px solid #3996D9" } : {}
        return (
            <section className={classes.order} style={style}>
                <div className={classes.orderWrapper}>
                    <div className={classes.orderInfo} onClick={this.showShipments}>
                        <Typography className={classes.orderHeader}> Order Placed On {formatDate(new Date(orderDate))}</Typography>
                        <Typography className={classes.orderStore}>{orderedBy}</Typography>
                        <Typography className={classes.orderFooter}>
                            <span>{`₹ ${finalAmount}`}</span>
                            <span className={classes.dot}>&#183;</span><span>{`${totalItems} items`}</span>
                            {/* <span className={classes.dot}>&#183;</span><span>{`${totalShipments} Shipments`}</span> */}
                        </Typography>
                    </div>
                    <ChevronRight className={classes.orderChevron} onClick={this.getOrderDetails(orderId)} />
                </div>
                {
                    (showShipments && shipments.length > 0) ? (
                        <section className={classes.shipments}>
                            {shipments.map((shipment, index) => <Shipment key={index} shipmentData={shipment} orderId={orderId} shipmentNumber={index + 1} totalShipments={shipments.length} history={history} />)}
                        </section>
                    )
                        : null
                }

            </section>
        );
    }
}

export default Order
