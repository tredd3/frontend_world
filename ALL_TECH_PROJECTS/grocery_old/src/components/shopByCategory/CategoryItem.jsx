import * as React from "react";
import style from "./style";
import injectSheet from "react-jss";
import { Typography } from "../../materialUI";

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
// history is passed from route component and otherprops are passed from store
// dispatch is a store method and is passed as a prop by react-redux to the connected component

@injectSheet(style)

class CategoryItem extends React.Component {

    productsListPage = (CategoryName, CategoryId) => (e) => {
        this.props.history.push({
            pathname: `/productsList/${CategoryName}`,
            state: {
                categoryId: CategoryId,
                routeType: "SUB_CATEGORY",
                subcategoryData:this.props.subcategoryData()
            }
        })
    }

    render() {
        const { classes, data } = this.props;
        const { CategoryImage, CategoryName, CategoryId } = data;
        return (
            <div className={classes.categoryItem} onClick={this.productsListPage(CategoryName, CategoryId)}>
                <LazyLoadImage
                    alt={CategoryName}
                    height={"40px"}
                    effect="blur"
                    src={CategoryImage}
                    width={"40px"} />
                <Typography className="title">{CategoryName}</Typography>
            </div>
        )
    }
}

export default CategoryItem;
