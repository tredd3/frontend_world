import * as React from "react";
import injectSheet from 'react-jss';
import style from './style';
import Slider from "react-slick";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { imagesPath } from "../../../../config/serviceConstants";


@injectSheet(style)

class Widget3 extends React.Component {
    clickHandler = (params) => async e => {
        const { homePageSeeMore, history, backgroundSlide } = this.props;
        if (backgroundSlide) {
            //portal code
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
        const { classes, widgetData, customSettings = {}, backgroundSlide = false } = this.props,
            data = widgetData.data.miscellaneous ? widgetData.data.miscellaneous : (widgetData.data.banners ? widgetData.data.banners : widgetData.data.products),
            type = widgetData.type,
            subType = widgetData.subType;

        const mainSettings = {
            dots: false,
            arrows: false,
            infinite: true,
            centerMode: true,
            speed: 500,
            slidesToShow: 1,
            centerPadding: "10px",
            swipeToSlide: true
        }
        const settings = { ...mainSettings, ...customSettings };

        if (data.length) {
            return (
                <Slider {...settings} className={(backgroundSlide) ? classes.backgroundSlideWidget3Wrapper : classes.Widget3Wrapper}>
                    {data.map((widget, index) => (<div className={(backgroundSlide) ? classes.backgroundSlide : "Widget3"} key={index} onClick={this.clickHandler({ type, subType, bannerId: widget.bannerId })}>
                      <div className={classes.imgContainer}>
                        {/* <img
                            src={widget.imageUrl}
                            alt={widget.name}
                        /> */}
                         <LazyLoadImage
                                alt={widget.name}
                                height={"auto"}
                                effect="blur"
                                src={widget.imageUrl}
                                placeholderSrc={`${imagesPath}/placeholder_img.webp`}
                                width={"100%"} />
                      </div>
                    </div>)
                    )}
                </Slider>
            );
        } else {
            return null;
        }
    }
}



export default Widget3
