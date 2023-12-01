import * as React from "react";
import style from "./style";
import CategoryItem from "./CategoryItem";
import injectSheet from "react-jss";
import { Typography, ChevronRight } from "../../materialUI";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import { shopByCategories } from "../../actions/shopByCategories";
import { ReactComponent as MinusIcon } from '../../assets/images/svg/minus_icon.svg';
import { ReactComponent as PlusIcon } from '../../assets/images/svg/plus_icon.svg';

// history is passed from route component and otherprops are passed from store
// dispatch is a store method and is passed as a prop by react-redux to the connected component

const ExpansionPanel = withStyles({
    root: {
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        boxShadow: 'none',
        '&:before': {
            display: 'none',
        },
        margin: "0 20px",
    },
    expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
    root: {
        marginBottom: -1,
        minHeight: 56,
        padding: 0,
        '&$expanded': {
            minHeight: 56,
        }
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
        display: 'flex',
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 6px",
        margin: "10px 0"
    },
    expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles({
    root: {
        padding: "0px"
    }
})(MuiExpansionPanelDetails);

@injectSheet(style)

class Category extends React.Component {
    constructor(props) {
        super(props);
        this.state = { dataFetched: false, subcategoryData: {} };
    }

    getSubcategories = CategoryId => (e, isExpanded) => {
        if (!this.state.dataFetched) {
            shopByCategories({ Level: 2, CategoryId })
                .then(response => this.setState({ dataFetched: true, subcategoryData: response.Data.Categories }, this.productsListPage))
                .catch(console.log("subcategories failed"))
        }
    }

    productsListPage = (e) => {
        if (this.props.searchVersion) {
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
    }

    getSubcategoryData = () => {
        return this.state.subcategoryData
    }

    render() {
        const { history, category, classes, expanded, handleChange, searchVersion = false } = this.props;
        const { subcategoryData } = this.state;
        const data = [{
            "CategoryId": 290,
            "CategoryName": "Salt & Sugar",
            "CategoryIcon": "https://jiomerchantsit.akamaized.net/static/category/SaltSugarxhdpi.png",
            "CategoryImage": "https://jiomerchantsit.akamaized.net/static/category/SaltSugarxhdpi.png"
        },
        {
            "CategoryId": 336,
            "CategoryName": "Vegetables & Fruits",
            "CategoryIcon": "https://jiomerchantsit.akamaized.net/static/category/VegetablesFruitsxhdpi.png",
            "CategoryImage": "https://jiomerchantsit.akamaized.net/static/category/VegetablesFruitsxhdpi.png"
        },
        {
            "CategoryId": 337,
            "CategoryName": "Pet Care",
            "CategoryIcon": "https://jiomerchantsit.akamaized.net/static/category/PetCarexhdpi.png",
            "CategoryImage": "https://jiomerchantsit.akamaized.net/static/category/PetCarexhdpi.png"
        },
        {
            "CategoryId": 418,
            "CategoryName": "Canned Food",
            "CategoryIcon": "https://jiomerchantsit.akamaized.net/static/category/canned-food.png",
            "CategoryImage": "https://jiomerchantsit.akamaized.net/static/category/canned-food.png"
        },
        {
            "CategoryId": 419,
            "CategoryName": "Frozen Vegetarian",
            "CategoryIcon": "https://jiomerchantsit.akamaized.net/static/category/FrozenVegetablesxhdpi.png",
            "CategoryImage": "https://jiomerchantsit.akamaized.net/static/category/FrozenVegetablesxhdpi.png"
        }];

        return (

            <ExpansionPanel square expanded={expanded} onChange={handleChange(category.CategoryId)}>
                <ExpansionPanelSummary aria-controls="panel1d-content" id="panel1d-header" onClick={this.getSubcategories(category.CategoryId)}>
                    <div className={classes.summary}>
                        <LazyLoadImage
                            alt={category.CategoryName}
                            height={"40px"}
                            effect="blur"
                            src={category.CategoryImage}
                            width={"40px"} />

                        <Typography className={classes.primaryHeading}>{category.CategoryName}</Typography>
                    </div>
                    {!searchVersion ?
                        <span className={classes.expandIcon}>{expanded ? <MinusIcon /> : <PlusIcon />}</span>
                        : <ChevronRight style={{ paddingRight: 0 }} />}
                </ExpansionPanelSummary>
                {!searchVersion ?
                    (subcategoryData.length && expanded) ?
                        (<ExpansionPanelDetails>
                            <div className={classes.categoryItems}>
                                {subcategoryData.map((category, index) => <CategoryItem key={index} data={category} history={history} subcategoryData={this.getSubcategoryData} />)}
                            </div>
                        </ExpansionPanelDetails>) : null
                    : null}
            </ExpansionPanel>
        );
    }
}

export default Category;