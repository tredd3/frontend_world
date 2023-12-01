import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import PageTemplate from '../uiControls/PageTemplate/PageTemplate';
import style from './style';
import { shopByCategories } from '../../actions/shopByCategories';
import Category from './Category';
import IntersectionObserver from '../IntersectionObserver';
import UserLocation from '../uiControls/UserLocation';
import { pipe } from '../../helpers/functional';
import { trackPage } from '../../helpers/analytics';

export default pipe(
  withRouter,
  withStyles(style),
  connect(
    state => ({
      shopByCategoriesResult: state.shopByCategories,
      storeId: state.userAddress.address.storeId
    }),
    dispatch => ({
      shopByCategories: params => dispatch(shopByCategories(params))
    })
  )
)(
  class ShopByCategory extends React.Component {
    constructor(props) {
      super(props);
      this.state = { expanded: false };
    }

    componentDidMount() {
      if (Object.keys(this.props.shopByCategoriesResult).length === 0) {
        this.props.shopByCategories();
      }
      trackPage('Shop By Category Page');
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
      const expand = isExpanded ? CategoryId : false;
      this.setState({ expanded: expand });
    }

    render() {
      const {
        history, shopByCategoriesResult, classes, searchVersion = false, cartVersion = false
      } = this.props;
      const { expanded } = this.state;
      const Categories = (shopByCategoriesResult && shopByCategoriesResult.Data) ? shopByCategoriesResult.Data.Categories : [];

      if (cartVersion) {
        return (
          <>
            <h1 className={classes.heading}>Shop By Category</h1>
            <div className={classes.contentWrapper}>
              {Categories.length > 0 ? (
                Categories.map((category, index) => ((index % 30 !== 0 || index === 0)
                  ? (
                    <Category
                      key={index}
                      category={category}
                      history={history}
                      expanded={expanded === category.CategoryId}
                      handleChange={this.handleChange}
                    />
                  ) : (
                    <IntersectionObserver key={index} onVisible={this.fetchMore} index={index}>
                      <Category
                        key={index}
                        category={category}
                        history={history}
                        expanded={expanded === category.CategoryId}
                        handleChange={this.handleChange}
                      />
                    </IntersectionObserver>
                  )))
              ) : null}
            </div>
          </>
        );
      }

      if (searchVersion) {
        return (
          <>
            <h1 className={classes.heading}>Shop By Category</h1>
            <div className={classes.contentWrapper}>
              {Categories.length > 0 ? (
                Categories.map((category, index) => ((index % 30 !== 0 || index === 0)
                  ? (
                    <Category
                      key={index}
                      category={category}
                      history={history}
                      expanded={expanded === category.CategoryId}
                      handleChange={this.handleChange}
                      searchVersion={searchVersion}
                    />
                  ) : (
                    <IntersectionObserver key={index} onVisible={this.fetchMore} index={index}>
                      <Category
                        key={index}
                        category={category}
                        history={history}
                        expanded={expanded === category.CategoryId}
                        handleChange={this.handleChange}
                        searchVersion={searchVersion}
                      />
                    </IntersectionObserver>
                  )))
              ) : null}
            </div>
          </>
        );
      }
      return (
        <PageTemplate history={history} subSection={false} deliverySection={false} whiteBackground>
          <UserLocation />
          <h1 className={classes.heading}>Shop By Category</h1>
          <div className={classes.contentWrapper}>
            {Categories.length > 0 ? (
              Categories.map((category, index) => ((index % 30 !== 0 || index === 0)
                ? (
                  <Category
                    key={index}
                    category={category}
                    history={history}
                    expanded={expanded === category.CategoryId}
                    handleChange={this.handleChange}
                  />
                ) : (
                  <IntersectionObserver key={index} onVisible={this.fetchMore} index={index}>
                    <Category
                      key={index}
                      category={category}
                      history={history}
                      expanded={expanded === category.CategoryId}
                      handleChange={this.handleChange}
                    />
                  </IntersectionObserver>
                )))
            ) : null}
          </div>
        </PageTemplate>
      );
    }
  }
);
