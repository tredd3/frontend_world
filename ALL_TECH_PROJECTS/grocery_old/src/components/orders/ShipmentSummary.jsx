import * as React from "react";
import Typography from "@material-ui/core/Typography";
import style from "./style";
import injectSheet from "react-jss";

@injectSheet(style)
class ShipmentSummary extends React.Component {

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.shipmentSummary}>
                <section >
                    <Typography>
                        Arriving Early, <span style={{ color: "blue" }}>Today</span>
                    </Typography>
                    <Typography style={{
                        fontSize: "10px"
                    }}>
                        Served by Balaji Kirana Store
                   </Typography>
                </section>
            </div>

        )
    }
}
export default ShipmentSummary;