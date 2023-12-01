import React from "react";
import Rating from "../uiControls/rating";
import Price from "../uiControls/price";
import Coupon from "../uiControls/coupon";
import Button from "../uiControls/button";
import { Typography } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import style from './style';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';
import { cartAddExistingItem } from '../../actions/cart';
import Quantity from "../uiControls/Quantity"

@injectSheet(style)
@connect(
    state => ({}),
    dispatch => {
        return {
            addItem: function (item) {
                dispatch(cartAddExistingItem(item));
            },
        };
    }
)
class SingleWishListProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: 1
        }
    }

    changeQuantity = event => {
        this.setState({ quantity: parseInt(event.target.value) });
    }

    render() {
        const quantity = this.state.quantity
        const classes = this.props.classes;
        const { ProductImage, ProductAlias, rating, totalRatings, SP, MRP, IsCoupon, couponValue, ProductSkuId, IsFc, CategoryId } = this.props.data;
        return (
            <div>
                <div className={classes.productInfo} >
                    <div className={classes.productPic} style={{ backgroundImage: `url(${ProductImage})` }} onClick={e => this.props.showProductDisc(ProductSkuId, CategoryId)}>
                        {/* <img className={classes.productPic} src={ProductImage} alt={ProductName} /> */}
                    </div>
                    <div className={classes.detailsWrapper}>
                        <Typography className={classes.productName}>
                            {ProductAlias}
                        </Typography>
                        <section className={classes.detailsSection}>
                            <div className={classes.priceWrapper}>
                                {/* <Rating rating={rating} totalRatings={totalRatings} /> */}
                                <Price sp={SP} mrp={MRP} style={{ marginTop: "12px" }} />
                            </div>
                        </section>
                        <div style={{ display: "flex", justifyContent: "space-between", marginRight: "10px" }}>
                            <Button text="Delete" name="addToCart" style={{ padding: "6px", paddingLeft: "25px", paddingRight: "25px", marginTop: "6px" }} onClick={() => this.props.deleteWishListItem(ProductSkuId)} type="solidGray" />
                            <Button text="Add to cart" name="addToCart" style={{ padding: "6px", paddingLeft: "18px", paddingRight: "18px", marginTop: "6px" }} onClick={() => this.props.addToCart(ProductSkuId, 1, IsFc)} type="solidGray" />
                        </div>
                    </div>
                </div>
                <Divider />
            </div>

        )
    }
}

export default SingleWishListProduct;
