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
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Placeholder from '../../assets/images/icons/Placeholder.webp'

@injectSheet(style)
@connect(
    state => ({}),
    dispatch => {
        return {
            addItem: function (item) {
                debugger;
                dispatch(cartAddExistingItem(item));
            },
        };
    }
)
class SingleProduct extends React.Component {
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
        // console.log("The params are "+this.props.match.params);
        const quantity = this.state.quantity
        const classes = this.props.classes;
        const { ProductImage, ProductAlias, ProductName, rating, totalRatings, SP, MRP, ProductSkuId, IsFc, CategoryId, Coupons = {} } = this.props.data;
        let ProductImageNew = ProductImage;
        if (ProductImageNew.split("/images/")[0] == "https://uat-grocery.ril.com") {
            ProductImageNew = "https://preprod-static.jiomoney.com/grocery/images/" + ProductImageNew.split("/images/")[1];
        }
        let IsCoupon = false, couponValue;
        if (Object.keys(Coupons).length !== 0) {
            IsCoupon = true;
            couponValue = Coupons.DiscountAbsValue;
        }
        return (
            <div>
                <div className={classes.productInfo} >
                    {/*<div className={classes.productPic} style={{ backgroundImage: `url(${ProductImage})` }} onClick={e => this.props.showProductDisc(ProductSkuId, CategoryId)}>

                    </div>*/}
                    <div style={{ marginRight: '10px' }} onClick={e => this.props.showProductDisc(ProductSkuId, CategoryId)}>
                        <LazyLoadImage
                            alt={"img"}
                            effect="blur"
                            src={ProductImageNew}
                            placeholderSrc={Placeholder}
                            width={"100px"}
                            height={"100px"} />
                        {/* <img src={ProductImageNew} style={{maxHeight:170, width:'100%'}} /> */}
                    </div>
                    <div className={classes.detailsWrapper}>
                        <Typography className={classes.productName} onClick={e => this.props.showProductDisc(ProductSkuId, CategoryId)}>
                            {ProductAlias ? ProductAlias : ProductName}
                        </Typography>
                        <section className={classes.detailsSection}>
                            <div className={classes.priceWrapper} onClick={e => this.props.showProductDisc(ProductSkuId, CategoryId)}>
                                {/*<Rating rating={rating} totalRatings={totalRatings} />*/}
                                <Price sp={SP} mrp={MRP} style={{ marginTop: "12px" }} />
                                <Coupon available={IsCoupon} value={couponValue} style={{ marginTop: "6px" }} />
                            </div>
                            <div className={classes.buttonsWrapper}>
                                <Quantity handleChange={this.changeQuantity} SelectedQuantity={quantity} />
                                <Button text="Add" name="addToCart" style={{ padding: "5px", marginTop: "6px", fontWeight: 100 }} onClick={() => this.props.addItem({ ProductSkuId, Quantity: quantity, ProductType: IsFc })} type="solidGray" />
                            </div>
                        </section>
                    </div>
                </div>
                <Divider />
            </div>

        )
    }
}

export default SingleProduct;
