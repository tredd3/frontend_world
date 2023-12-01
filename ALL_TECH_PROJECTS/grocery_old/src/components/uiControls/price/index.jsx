import * as React from "react";
import injectSheet from 'react-jss';
import style from './style';

@injectSheet(style)

class Price extends React.Component {

    discount(mrp, sp) {
        const difference = (mrp - sp).toFixed(2);
        return `Save ₹${difference} (${Math.round((difference / mrp) * 100)}%)`;
    }

    render() {
        const { classes, sp, mrp, style } = this.props;

        return (
            <div className={classes.priceWrapper} style={{ ...style }}>
                <span className="sp">{`₹${sp.toFixed(2)}`}</span>
                {mrp > sp ?
                    <React.Fragment>
                        <span className="mrp">{`₹${mrp.toFixed(2)}`}</span>
                        <br></br>
                        <span className="discount">{this.discount(Number(mrp), Number(sp))}</span>
                    </React.Fragment> : null}
            </div>
        );
    }
}

export default Price;
