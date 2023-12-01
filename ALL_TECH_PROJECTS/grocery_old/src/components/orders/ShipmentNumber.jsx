import * as React from "react";
import injectSheet from "react-jss";
import Typography from "@material-ui/core/Typography"
import style from "./style";


@injectSheet(style)
class ShipmentNumber extends React.Component {

    render() {
        const { classes, shipmentId, currentShipment, totalShipment, totalItems, orderTotal } = this.props;
        return (
            <div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography >
                        <span className={classes.currentShipmentNumber}> Shipment {currentShipment}  </span> ({totalItems} item)
                    </Typography>
                    {
                        orderTotal ?
                            <Typography style={{ fontWeight: "bold" }}>
                                &#8377; {orderTotal}
                            </Typography> :
                            null
                    }
                </div>

                {/* <Typography>
                    ID : {shipmentId}
                </Typography> */}
            </div>
        )
    }
}
export default ShipmentNumber;