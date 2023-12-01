import * as React from "react";
import Typography from "@material-ui/core/Typography";
import Home from '@material-ui/icons/Home';
class DeliveryAddress extends React.Component {

    render() {
        const { deliveryAddressName = "Rohit Chauhan", deliveryAddressAddressLine1 = "Prohit Nagar",
            deliveryAddressAddressLine2 = "Kota Jn.", deliveryAddressPin,
            deliveryAddressMobileNumber = "9805101311", deliveryAddressCity
        } = this.props;
        return (
            <div style={{ backgroundColor: "white" }}>
                <Typography>
                    Delivery Address
                </Typography>
                <div style={{ display: "flex" }}>
                    <Home />
                    <Typography style={{ alignSelf: "flex-end" }}>
                        {deliveryAddressName}
                        {/* Delivery Address */}
                    </Typography>
                </div>
                <Typography>
                    {deliveryAddressAddressLine1}, {deliveryAddressAddressLine2}
                </Typography>
                <Typography>
                    {deliveryAddressMobileNumber}
                </Typography>
            </div>
        )
    }
}
export default DeliveryAddress;