import * as React from "react";
import { connect } from "react-redux";
import PageTemplate from "../uiControls/PageTemplate/PageTemplate";
import style from "./style";
import injectSheet from "react-jss";
import { shopByCategories } from "../../actions/shopByCategories";
import Category from "./Category";
import IntersectionObserver from "../IntersectionObserver";
import UserLocation from "../uiControls/Location/UserLocation";
// history is passed from route component and otherprops are passed from store
// dispatch is a store method and is passed as a prop by react-redux to the connected component

@injectSheet(style)

@connect(
    state => {
        return {
            shopByCategoriesResult: state.shopByCategories,
            storeId: state.userAddress.address.storeId,
        };
    },
    dispatch => {
        return {
            shopByCategories: function (params) {
                dispatch(shopByCategories(params));
            }
        };
    }
)

class ShopByCategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = { expanded: false };
    }

    componentDidMount() {
        if (Object.keys(this.props.shopByCategoriesResult).length === 0) {
            this.props.shopByCategories();
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.storeId !== this.props.storeId) {
            this.props.shopByCategories();
        }
    }

    fetchMore = () => {
        this.props.shopByCategories({ increasePagenumber: true });
    }

    handleChange = CategoryId => (e, isExpanded) => {
        let expand = isExpanded ? CategoryId : false;
        this.setState({ expanded: expand });
    }

    render() {
        const { history, shopByCategoriesResult, classes, searchVersion = false } = this.props;
        const { expanded } = this.state;
        const Categories = (shopByCategoriesResult && shopByCategoriesResult.Data) ? shopByCategoriesResult.Data.Categories : [];

        if (searchVersion) {
            return (
                <React.Fragment>
                    <h1 className={classes.heading}>Shop By Category</h1>
                    <div className={classes.contentWrapper}>
                        {Categories.length > 0 ? (
                            Categories.map((category, index) =>
                                (index % 30 !== 0 || index === 0) ?
                                    <Category key={index} category={category}
                                        history={history}
                                        expanded={expanded === category.CategoryId}
                                        handleChange={this.handleChange} searchVersion={searchVersion} /> :
                                    <IntersectionObserver key={index} onVisible={this.fetchMore} index={index}>
                                        <Category key={index} category={category}
                                            history={history}
                                            expanded={expanded === category.CategoryId}
                                            handleChange={this.handleChange} searchVersion={searchVersion} />
                                    </IntersectionObserver>
                            )
                        ) : null}
                    </div>
                </React.Fragment>
            );
        } else {
            return (
                <PageTemplate history={history} subSection={false} deliverySection={false} whiteBackground>
                    <UserLocation />
                    <h1 className={classes.heading}>Shop By Category</h1>
                    <div className={classes.contentWrapper}>
                        {Categories.length > 0 ? (
                            Categories.map((category, index) =>
                                (index % 30 !== 0 || index === 0) ?
                                    <Category key={index} category={category}
                                        history={history}
                                        expanded={expanded === category.CategoryId}
                                        handleChange={this.handleChange} /> :
                                    <IntersectionObserver key={index} onVisible={this.fetchMore} index={index}>
                                        <Category key={index} category={category}
                                            history={history}
                                            expanded={expanded === category.CategoryId}
                                            handleChange={this.handleChange} />
                                    </IntersectionObserver>
                            )
                        ) : null}
                    </div>
                </PageTemplate>
            );
        }

    }
}

export default ShopByCategory;