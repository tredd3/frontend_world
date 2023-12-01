import * as React from "react";
import injectSheet from 'react-jss';
import style from './style';
import { Typography } from "../../../../materialUI";
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { shopByCategories } from "../../../../actions/shopByCategories";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { imagesPath } from "../../../../config/serviceConstants";

@injectSheet(style)

class Widget12 extends React.Component {
    constructor(props) {
        super(props);
        this.state = { subcategoryData: {} };
    }
    // productsListPage = (productName) => (e) => {
    //     this.props.history.push({
    //         pathname: `/productsList/${productName}`,
    //         state: {
    //             routeType: "BRAND_DEEPLINK"
    //         }
    //     })
    // }

    getSubcategories = (CategoryId = 0) => (e, isExpanded) => {
        shopByCategories({ Level: 2, CategoryId })
            .then(response => this.setState({ subcategoryData: response.Data.Categories }, this.productsListPage))
            .catch(() => {
                this.props.history.push({
                    pathname: `/productsList/no_results`,
                    state: {
                        subcategoryData: [],
                        routeType: "NO_RESULTS"
                    }
                })
            })
    }

    productsListPage = (e) => {
        const subcategoryData = this.state.subcategoryData;
        const productName = subcategoryData ? subcategoryData[0].CategoryName : "";
        this.props.history.push({
            pathname: `/productsList/${productName}`,
            state: {
                subcategoryData: subcategoryData,
                routeType: "SUB_CATEGORY"
            }
        })
    }

    seeMore = (e) => {
        this.props.history.push('/shopby-category')
    }
    render() {
        const { classes, widgetData } = this.props,
            data = widgetData.data.miscellaneous ? widgetData.data.miscellaneous : (widgetData.data.banners ? widgetData.data.banners : widgetData.data.products),
            title = widgetData.title,
            //  deepLink = widgetData.deepLink,
            deepLinkText = widgetData.deepLinkText;

        if (data.length) {
            return (
                <LazyLoadComponent effect="blur">
                    <section className={classes.Widget12Wrapper}>
                        <div className={classes.Widget12Header}>
                            <span className={classes.productGridTitle}>{title}</span>
                            <span className={classes.seeMoreLink} onClick={this.seeMore}>{deepLinkText}</span>
                        </div>
                        <div className={classes.productGrid}>
                            {data.map((product, i) => (<div key={i} className={classes.productCell} onClick={this.getSubcategories(product.mscId)}>
                                <div className="imgContainer">
                                    <LazyLoadImage
                                        alt={product.name+" image"}
                                        effect="blur"
                                        src={product.imageUrl}
                                        width={"100%"}
                                        height={"100%"}
                                        className={classes.productImage}
                                        placeholderSrc={`${imagesPath}/placeholder_img.webp`}
                                            />
                                    {/* <img src={product.imageUrl} alt={product.name + ' Image'} className={classes.productImage} /> */}
                                </div>
                                <Typography className={classes.productTitle} >{product.name}</Typography>
                            </div>))}
                        </div>
                    </section>
                </LazyLoadComponent>
            );
        } else {
            return null;
        }
    }
}


export default Widget12;
