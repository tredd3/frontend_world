import * as React from "react";
import Typography from "@material-ui/core/Typography";
import injectSheet from "react-jss";
import style from "./style";
import { formatDate, formatTime } from "../../helper/utilites";
import Divider from "@material-ui/core/Divider";
@injectSheet(style)
class OrderSummary extends React.Component {

    render() {
        const { orderId, amount, totalItems, totalShipments, classes, orderedBy, orderDate } = this.props;
        let timeStamp = orderDate.split(' ')
        let date = timeStamp[0]
        let time = timeStamp[1]

        date = formatDate(new Date(date))
        time = formatTime(time)
        return (
            <div className={classes.orderSummary}>
                <div className={classes.orderSummary1}>
                    <Typography className={classes.typoOrderId}>
                        Order Id : {orderId}
                    </Typography>
                    <Typography className={classes.typoPrice}>
                        &#8377; {amount}
                    </Typography>
                </div>

                <Typography className={classes.typoItemsShipments}>
                    {orderedBy}
                </Typography>

                <div className={classes.orderSummary1} >
                    <Typography className={classes.typoItemsShipments}>
                        <span style={{ fontWeight: "600" }}> {totalItems} Items </span>  &#183; {totalShipments} Shipments
                </Typography>
                    <Typography style={{ fontSize: '12px' }}>
                        On {date}
                    </Typography>
                </div>
                <Divider />
            </div>
        )
    }
}
export default OrderSummary;