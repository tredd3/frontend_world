import * as React from "react";
import Adjust from "@material-ui/icons/Adjust";
import Typography from "@material-ui/core/Typography";
import injectSheet from "react-jss";
import style from "./style";
import ImageSlider from "../Widgets/Widget3/index";

@injectSheet(style)
class Coupon extends React.Component{
    render()
    {
        const {classes} = this.props;
        return(
            <div className = {classes.coupon2} >
                <div className = {classes.iconText}>
                    <span className = {classes.offerIcon}>
                        <Adjust/>
                    </span>
                    <span>
                        <Typography className = {classes.coupAvlText}>
                            COUPON AVAILABLE
                        </Typography>
                        <Typography className = {classes.isLoginText}>
                            Login to check eligibility 
                        </Typography>
                    </span> 
                </div>

                <span className={classes.information}>
                    <Adjust/>
                </span>

                {/* <ImageSlider widgetData = {widgetData}/> */}
            </div>
        )
    }
}
export default Coupon;