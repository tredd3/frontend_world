import * as React from "react";
import injectSheet from 'react-jss';
import style from './style';
import { connect } from "react-redux";
import { Typography } from "../../../../materialUI";
import HorizontalSlider from "../../../uiControls/HorizontalSlider";
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Price from "../../price"
import Rating from "../../rating"
import Coupon from "../../coupon"
import Offer from "../../offer"
import Button from "../../button"
import { cartAddExistingItem } from "../../../../actions/cart";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Quantity from '../../../uiControls/Quantity'
import { getProductQty } from '../../../../helper/utilites'
import { imagesPath } from "../../../../config/serviceConstants";

@injectSheet(style)
@connect(
    state => ({ cart: state.cart }),
    dispatch => {
        return {
            addItem: function (item) {
                dispatch(cartAddExistingItem(item));
            }
        }
    }
)

class Widget7 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            productQuantity: 0
        }
    }
    handleQuantity = event => {
        this.setState({ productQuantity: parseInt(event.target.value) })
    }
    clickHandler = (params) => async e => {
        const { homePageSeeMore, history, handleSeeMore } = this.props;
        if (handleSeeMore) {
            handleSeeMore()
        } else {
            await homePageSeeMore(params)
            history.push({
                pathname: `/productsList/dashboard_items`,
                state: {
                    routeType: "DASHBOARD_SEEMORE"
                }
            })
        }
    }

    render() {
        const { classes, widgetData, addItem, history } = this.props,
            data = widgetData.data.miscellaneous ? widgetData.data.miscellaneous : (widgetData.data.banners ? widgetData.data.banners : widgetData.data.products),
            title = widgetData.title,
            type = widgetData.type,
            subType = widgetData.subType,
            //  deepLink = widgetData.deepLink,
            deepLinkText = widgetData.deepLinkText;

        if (data && data.length) {
            return (
                <section className={classes.Widget7Wrapper}>
                    <div className={classes.Widget7Header}>
                        <span className="leftTextLabel">{title}</span>
                        <span className="rightTextLabel" onClick={this.clickHandler({ type, subType, bannerId: -1 })} >{deepLinkText}</span>
                    </div>
                    <HorizontalSlider>
                        <Widget data={data} classes={classes} addItem={addItem} history={history} onClickSimilaritem={this.props.onClickSimilaritem} handleQuantity={this.handleQuantity} productQuantity={this.state.productQuantity} />
                    </HorizontalSlider>
                </section>

            );
        } else {
            return null;
        }

    }
}

const Widget = ({ data, classes, scrollposition, addItem, history, onClickSimilaritem }) => {
    const handleChange = (ProductSkuId, IsFc) => event => {
        addItem({ ProductSkuId, Quantity: 1, ProductType: IsFc })
    }
    const clickHandler = (categoryId, productSkuId) => e => {
        /*
            Added by Rohit
            if history object is coming, then we can route to that page.
            if not(like call from pdp page only), then we will not pass history prop
        */
        if (history !== undefined) {
            history.push(`/productDescription/${categoryId}/${productSkuId}`);
        }
        else
            onClickSimilaritem(productSkuId, categoryId);
    }
    return (
        <React.Fragment>
            {data.map((product, index) => {
                const { ProductImage, ProductName, totalRatings, rating, MRP, SP, CouponResult, CategoryId, ProductSkuId, IsFc } = product;
                const couponAvailable = CouponResult ? true : false;
                const couponValue = couponAvailable ? CouponResult.DiscountAbsValue : "";
                const productQty = getProductQty(ProductSkuId);
                return (
                    <LazyLoadComponent effect="blur" scrollPosition={scrollposition} key={index} >
                        <div className={classes.Widget7} >
                            <section className="section1" onClick={clickHandler(CategoryId, ProductSkuId)}>
                                <div className="imageWrapper" >
                                    <div className="imageDiv">
                                        <LazyLoadImage
                                            alt={"img"}
                                            effect="blur"
                                            src={ProductImage}
                                            width={"100%"}
                                            height={"100%"}
                                            placeholderSrc={`${imagesPath}/placeholder_img.webp`}
                                        />
                                        <Offer sp={SP} mrp={MRP} />
                                    </div>
                                </div>
                                <Typography className="productName">{ProductName}</Typography>
                            </section>
                            <section className="section2">
                                {/* <Rating rating={rating} totalRatings={totalRatings} style={{ marginBottom: "6px" }} /> */}
                                <Price sp={SP} mrp={MRP} />
                                <Coupon available={couponAvailable} value={couponValue} style={{ marginBottom: "10px" }} />
                                {productQty ? <Quantity quantity={productQty} ProductSkuId={ProductSkuId} IsFc={IsFc} replaceQuantity fromWidget={true} /> : <Button text="Add" name="addToCart" type="solidGray" style={{ padding: "6px", "fontWeight": 100 }} onClick={handleChange(ProductSkuId, IsFc)} />}
                            </section>
                        </div>
                    </LazyLoadComponent>
                )
            }
            )}
        </React.Fragment>
    )
}

export default Widget7;
