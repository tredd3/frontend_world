import * as React from "react";
import injectSheet from 'react-jss';
import style from './style';
import HorizontalSlider from "../uiControls/HorizontalSlider";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

@injectSheet(style)

class SubcategoryWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedProduct: 0 //for ALL  subcategory products
        }
    }

    clickHandler = (product) => event => {
        this.setState({
            selectedProduct: product.CategoryId
        })
        this.props.clickHandler(product.CategoryName, product.CategoryId);
    }

    render() {
        const { classes, data, scrollposition } = this.props;
        const selectedStyle = { border: "1px solid #0066C0" }
        const style = { border: "1px solid #dbdbdb" }

        if (data.length) {
            return (
                <HorizontalSlider style={{ margin: "16px", width: "auto" }}>
                    {/* <div className={classes.SubcategoryWidget} style={(this.state.selectedProduct === 0) ? selectedStyle : style} onClick={this.clickHandler({ CategoryId: 0, CategoryName: "ALL" })}>
                        ALL
                    </div> */}
                    {data.map((product, index) => (
                        <div className={classes.SubcategoryWidget} style={(product.CategoryId === this.state.selectedProduct) ? selectedStyle : style} key={index} onClick={this.clickHandler(product)}>
                            <LazyLoadImage
                                alt={product.CategoryName}
                                height={"auto"}
                                effect="blur"
                                scrollPosition={scrollposition}
                                src={product.CategoryImage}
                                width={"100%"} />
                            <p className="categoryName">{product.CategoryName}</p>
                        </div>
                    )
                    )
                    }
                </HorizontalSlider >
            );
        } else {
            return null;
        }
    }
}

export default SubcategoryWidget;
