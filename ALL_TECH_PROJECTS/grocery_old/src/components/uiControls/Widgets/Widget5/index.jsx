import * as React from "react";
import injectSheet from 'react-jss';
import style from './style';
import HorizontalSlider from "../../../uiControls/HorizontalSlider";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { imagesPath } from "../../../../config/serviceConstants";

@injectSheet(style)

class Widget5 extends React.Component {
    clickHandler = (params) => async e => {
        const { homePageSeeMore, history } = this.props;
        await homePageSeeMore(params)
        history.push({
            pathname: `/productsList/dashboard_items`,
            state: {
                routeType: "DASHBOARD_SEEMORE"
            }
        })
    }
    render() {
        const { classes, widgetData, scrollposition } = this.props,
            data = widgetData.data.miscellaneous ? widgetData.data.miscellaneous : (widgetData.data.banners ? widgetData.data.banners : widgetData.data.products),
            type = widgetData.type,
            subType = widgetData.subType;

        if (data.length) {
            return (
                <HorizontalSlider className={classes.Widget5Wrapper} >
                    {data.map((product, index) => (
                        <div className={classes.Widget5} key={index} onClick={this.clickHandler({ type, subType, bannerId: product.bannerId })}>
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
            );
        } else {
            return null;
        }
    }
}

export default Widget5;