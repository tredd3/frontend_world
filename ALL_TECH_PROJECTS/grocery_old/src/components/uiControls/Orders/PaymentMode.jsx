import * as React from "react";
import Typography from "@material-ui/core/Typography";
import PaymentIcon from "@material-ui/icons/CreditCard";
import injectSheet from "react-jss";
import style from "./style";
@injectSheet(style)
class PaymentMode extends React.Component {

    constructor(props) {
        super(props);
    }
    render() {
        const { paymentMode, classes } = this.props;
        return (
            <div className={classes.paymentMode}>
                <Typography>
                    Payment Method
                </Typography>
                <div className={classes.paymentModeDiv1}>
                    <PaymentIcon />
                    <Typography>
                        {paymentMode}
                    </Typography>
                </div>
            </div>
        )
    }
}
export default PaymentMode;