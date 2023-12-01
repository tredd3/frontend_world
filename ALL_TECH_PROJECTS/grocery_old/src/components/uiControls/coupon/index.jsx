import * as React from "react";
import injectSheet from 'react-jss';
import style from './style';
//import { LocalOffer } from "../../../materialUI";
import { ReactComponent as CouponIcon } from '../../../assets/images/svg/coupon.svg';

@injectSheet(style)

class Coupon extends React.Component {
    render() {
        const { classes, available, value, style } = this.props;

        return null;
    }
}

export default Coupon;
