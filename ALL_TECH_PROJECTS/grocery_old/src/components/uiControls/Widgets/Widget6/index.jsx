import * as React from "react";
import injectSheet from 'react-jss';
import style from './style';
import { Typography } from "../../../../materialUI";
import HorizontalSlider from "../../../uiControls/HorizontalSlider";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { imagesPath } from "../../../../config/serviceConstants";
import { shopByCategories } from "../../../../actions/shopByCategories";

@injectSheet(style)

class Widget6 extends React.Component {
    constructor(props) {
        super(props);
        this.state = { subcategoryData: {} };
    }

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
    render() {
        const { classes, widgetData, scrollposition } = this.props,
            data = widgetData.data.miscellaneous ? widgetData.data.miscellaneous : (widgetData.data.banners ? widgetData.data.banners : widgetData.data.products),
            title = widgetData.title,
            deepLinkText = widgetData.deepLinkText;

        if (data.length) {
            return (
                <section className={classes.Widget6Wrapper}>
                    <div className={classes.Widget6Header}>
                        <Typography className="leftTextLabel">{title}</Typography>
                        <Typography className="rightTextLabel" >{deepLinkText}</Typography>
                    </div>
                    <HorizontalSlider>
                        {data.map((product, index) => (
                            <div className={classes.Widget6} key={index} onClick={this.getSubcategories(product.mscId)}>
                                <LazyLoadImage
                                    alt={product.name}
                                    height={"auto"}
                                    effect="blur"
                                    scrollPosition={scrollposition}
                                    src={product.imageUrl}
                                    placeholderSrc={`${imagesPath}/placeholder_img.webp`}
                                    width={"100%"} />
                            </div>
                        )
                        )}
                    </HorizontalSlider>
                </section>
            );
        } else {
            return null;
        }
    }
}

export default Widget6;