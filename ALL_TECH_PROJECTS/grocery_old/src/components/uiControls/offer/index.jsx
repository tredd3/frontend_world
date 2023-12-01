import * as React from "react";
import injectSheet from 'react-jss';
import style from './style';
import { ReactComponent as OfferIcon } from '../../../assets/images/svg/offer.svg';

@injectSheet(style)

class Offer extends React.Component {
    discount(mrp, sp) {
        const difference = (mrp - sp).toFixed(2);
        return `${Math.round((difference / mrp) * 100)}%`;
    }

    render() {
        const { classes, sp, mrp, style } = this.props;

        if (mrp > sp) {
            return (
                <div className={classes.OfferIcon} style={{ ...style }}>
                    <OfferIcon />
                    <div className={classes.OfferWrapper}>
                        <span className="discount">{this.discount(mrp, sp)}</span>
                        <span className="off">OFF</span>
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }
}

export default Offer;
