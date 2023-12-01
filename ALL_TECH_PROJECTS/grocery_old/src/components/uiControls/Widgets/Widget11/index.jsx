import * as React from "react";
import injectSheet from 'react-jss';
import style from './style';
import { Typography } from "../../../../materialUI";
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import { shopByCategories } from "../../../../actions/shopByCategories";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Placeholder from '../../../../assets/images/icons/Placeholder.webp';

@injectSheet(style)

class Widget11 extends React.Component {
    constructor(props) {
        super(props);
        this.state = { subcategoryData: {} };
    }

    productsListPage = (productName) => (e) => {
        this.props.history.push({
            pathname: `/productsList/${productName}`,
            state: {
                routeType: "BRAND_DEEPLINK"
            }
        })
    }

    getSubcategories = CategoryId => e => {
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
        const productName = (subcategoryData && subcategoryData[0]) ? subcategoryData[0].CategoryName : "";
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
                <LazyLoadComponent>
                    <section className={classes.Widget11Wrapper}>
                        <div className={classes.Widget11Header}>
                            <span className={classes.productGridTitle}>{title}</span>
                            <span className={classes.seeMoreLink} onClick={this.seeMore}>{deepLinkText}</span>
                        </div>
                        <div className={classes.productGrid}>
                            {data.map((product, i) => {
                                let categoryId = product.mscId || product.CategoryId,
                                    imageSrc = product.imageUrl || product.ProductImage,
                                    productName = product.name || product.ProductName;

                                return (<div key={i} className={classes.productCell} onClick={this.getSubcategories(categoryId)}>
                                    <div className="imageContainer">
                                        <LazyLoadImage
                                            alt={"img"}
                                            maxHeight={105}
                                            effect="blur"
                                            src={imageSrc}
                                            placeholderSrc={""}
                                            width={"100%"}
                                            height={"100%"} />
                                    </div>
                                    <Typography className={classes.productTitle} >{productName}</Typography>
                                </div>)
                            })}
                        </div>
                    </section>
                </LazyLoadComponent>
            );
        } else {
            return null;
        }
    }
}


export default Widget11;
