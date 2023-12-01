import * as React from "react";
import style from "./style";
import injectSheet from "react-jss";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
@injectSheet(style)
class OrderDetailsData extends React.Component {
    render() {
        const { classes, orderValue, totalItems, productDiscount, couponValue, delCharges, youPaid, totalSavings } = this.props;
        return (
            <div className={classes.orderSummaryDiv}>
                <Typography style={{ paddingBottom: "10px", fontWeight: 600 }} >
                    Order Summary
                </Typography>
                <section className={classes.orderSummaryCommon}>
                    <Typography style={{ fontWeight: 600 }}>
                        Order Value
                    </Typography>
                    <Typography style={{ fontWeight: 600 }}>
                        &#8377;  {orderValue}
                    </Typography>
                </section>

                <section className={classes.orderSummaryCommon}>
                    <Typography>
                        Product Discount
                    </Typography>
                    <Typography>
                        &#8377; {productDiscount}
                    </Typography>
                </section>

                <section className={classes.orderSummaryCommon}>
                    <Typography>
                        Coupon Discount
                    </Typography>
                    <Typography>
                        &#8377; {couponValue}
                    </Typography>
                </section>

                <section className={classes.orderSummaryCommon}>
                    <Typography>
                        Delivery Charges
                    </Typography>
                    <Typography>
                        &#8377; {delCharges}
                    </Typography>
                </section>

                <Divider className={classes.orderDivider} />

                <section className={classes.orderYouPaid}>
                    <Typography style={{ fontWeight: 600 }}>
                        You Paid
                    </Typography>
                    <Typography style={{ fontWeight: 600 }}>
                        &#8377; {youPaid}
                    </Typography>
                </section>

                <section className={classes.orderSummaryCommon}>
                    <Typography style={{ color: "green" }}>
                        Saving
                    </Typography>
                    <Typography style={{ color: "green" }}>
                        &#8377; {totalSavings}
                    </Typography>
                </section>
            </div>
        )
    }
}
export default OrderDetailsData;