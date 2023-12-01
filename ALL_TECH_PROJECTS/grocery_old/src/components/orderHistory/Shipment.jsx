import React from 'react';
import injectSheet from 'react-jss';
import style from './style';
import {
    ChevronRight,
    Typography
} from "../../materialUI";

@injectSheet(style)

class Shipment extends React.Component {

    getOrderDetails = (orderId, shipmentId) => e => {
        this.props.history.push(`/orderDetails/${orderId}/${shipmentId}`)
    }

    render() {
        let { classes, orderId, shipmentData, shipmentNumber, totalShipments } = this.props;
        const { shipmentId, statusHistory, shipmentTotal, shipmentItemCount, deliverySlot } = shipmentData;

        return (
            <div className={classes.shipment} onClick={this.getOrderDetails(orderId, shipmentId)}>
                <div className={classes.shipmentHeader}>
                    <div><span className="shipmentNumber">{`Shipment ${shipmentNumber} of ${totalShipments}`}</span><span className="totalShipments">{`(${shipmentItemCount} items)`}</span></div>
                    <span className="shipmentStatus">{statusHistory[0].status}</span>
                </div>
                <Typography className={classes.shipmentId}>{shipmentId}</Typography>
                <div className={classes.shipmentFooter}>
                    <div className="shipmentDetails">
                        <span>{`₹ ${shipmentTotal}`}</span>
                        {/* <span className={classes.dot}>&#183;</span><span>ArrivingToday,</span>
                        <span>{deliverySlot}</span> */}
                    </div>
                    <div className="shipmentView">
                        <span>View</span>
                        <ChevronRight className={classes.shipmentChevron} onClick={this.getOrderDetails(orderId)} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Shipment
