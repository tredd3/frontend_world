import * as React from "react";
import injectSheet from 'react-jss';
import style from './style';
import HorizontalSlider from "../../../uiControls/HorizontalSlider";
import { Typography } from "../../../../materialUI";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { imagesPath } from "../../../../config/serviceConstants";
import { shopByCategories } from "../../../../actions/shopByCategories";
@injectSheet(style)

class Widget1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = { subcategoryData: {} };
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
    render() {
        const { classes, widgetData, scrollposition } = this.props,
            data = widgetData.data.miscellaneous ? widgetData.data.miscellaneous : (widgetData.data.banners ? widgetData.data.banners : widgetData.data.products)

        if (data.length) {
            return (
                <HorizontalSlider>
                    {data.map((product, index) => (
                        <div className={classes.Widget1} key={index} onClick={this.getSubcategories(product.mscId)}>
                            <div className="imgContainer">
                                <LazyLoadImage
                                    alt={product.name}
                                    height={"auto"}
                                    effect="blur"
                                    scrollPosition={scrollposition}
                                    src={product.imageUrl}
                                    placeholderSrc={`${imagesPath}/placeholder_img.webp`}
                                    width={"100%"} />
                            </div>
                            <Typography className="productName">{product.name}</Typography>
                        </div>
                    )
                    )}
                </HorizontalSlider>
            );
        } else {
            return null;
        }
    }
}


export default Widget1;
