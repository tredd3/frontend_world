import * as React from "react";
import injectSheet from 'react-jss';
import style from './style';
import HorizontalSlider from "../../../uiControls/HorizontalSlider";
import { Typography } from "../../../../materialUI";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { imagesPath } from "../../../../config/serviceConstants";

@injectSheet(style)

class SimilarItemsWidget extends React.Component {
    render() {
        
        const { classes, widgetData, scrollposition } = this.props;
        let widgetData2 = [];
        let len = widgetData ? widgetData.length : 0;
        for (let i = 0; i < len; i++) {
            let data = {};
            data.name = widgetData[i].productName
            data.imageUrl = widgetData[i].productImage
            // if(widgetData[i].productImage.split("/images/")[0] == "https://uat-grocery.ril.com"){
            //     data.imageUrl = "https://preprod-static.jiomoney.com/grocery/images/" + widgetData[i].productImage.split("/images/")[1];
            //   }
            //   else{
            //     data.imageUrl = widgetData[i].productImage
            //   }
            data.quantity = widgetData[i].quantity
            data.price = widgetData[i].mrp
            widgetData2.push(data);
        }

        return (
            <HorizontalSlider>
                {widgetData2.map((product, index) => (
                    <div className={classes.SimilarItemsWidget} key={index} >
                        <LazyLoadImage
                            alt={product.name}
                            height={"auto"}
                            effect="blur"
                            scrollPosition={scrollposition}
                            src={product.imageUrl}
                            placeholderSrc={`${imagesPath}/placeholder_img.webp`}
                            width={"30%"} />
                        <Typography className="productName">
                            {product.quantity} X  &#8377; {product.price}
                        </Typography>
                        <Typography className="productName">{product.name}</Typography>
                        
                    </div>
                )
                )}
            </HorizontalSlider>
        );
    }
}

export default SimilarItemsWidget;