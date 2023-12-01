import * as React from "react";
import Typography from "@material-ui/core/Typography";
import Home from '@material-ui/icons/Home';
import style from "./style";
import injectSheet from "react-jss";
@injectSheet(style)
class DeliveryAddress extends React.Component {

    render() {
        const { deliveryAddressName = "Rohit Chauhan", deliveryAddressAddressLine1 = "Prohit Nagar",
            deliveryAddressAddressLine2 = "Kota Jn.", deliveryAddressPin,
            deliveryAddressMobileNumber = "9805101311", deliveryAddressCity,
            classes
        } = this.props;
        return (
            <div className={classes.dlv}>
                <Typography >
                    Delivery Address
                </Typography>
                <div className={classes.dlvIconTextWrapper}>
                    <Home />
                    <Typography className={classes.addressName}>
                        {deliveryAddressName}
                        {/* Delivery Address */}
                    </Typography>
                </div>
                <Typography className={classes.addressText}>
                    {deliveryAddressAddressLine1}, {deliveryAddressAddressLine2}, {deliveryAddressPin}
                </Typography>
                <Typography className={classes.addressText} >
                    {deliveryAddressMobileNumber}
                </Typography>
            </div >
        )
    }
}
export default DeliveryAddress;