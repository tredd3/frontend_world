import * as React from 'react';
import { withStyles } from '@material-ui/core';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { Typography } from '../Material-UI';
import CategoryItem from './CategoryItem';
import style from './style';
import Image from '../uiControls/Image';

import { shopByCategories } from '../../actions/shopByCategories';
import { ReactComponent as MinusIcon } from '../../assets/images/svg/minus_icon.svg';
import { ReactComponent as PlusIcon } from '../../assets/images/svg/plus_icon.svg';
import { categoryUrl } from '../../helpers/urls';

const ExpansionPanel = withStyles({
  root: {
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:before': {
      display: 'none'
    },
    margin: '0 20px'
  },
  expanded: {}
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    marginBottom: -1,
    minHeight: 56,
    padding: 0,
    '&$expanded': {
      minHeight: 56
    }
  },
  content: {
    '&$expanded': {
      margin: '12px 16px'
    },
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 6px',
    margin: '10px 16px'
  },
  expanded: {}
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles({
  root: {
    padding: '0px'
  }
})(MuiExpansionPanelDetails);

export default withStyles(style)(
  class Category extends React.Component {
    constructor(props) {
      super(props);
      this.state = { dataFetched: false, subcategoryData: {} };
    }

    getSubcategories = CategoryId => () => {
      if (this.props.searchVersion) {
        this.productsListPage(CategoryId);
      } else if (!this.state.dataFetched) {
        shopByCategories({ Level: 2, CategoryId })
          .then(response => this.setState({ dataFetched: true, subcategoryData: response.Data.Categories }, this.productsListPage));
      }
    }

    productsListPage = id => {
      if (this.props.searchVersion) {
        this.props.history.push(categoryUrl(id));
      }
    }

    getSubcategoryData = () => this.state.subcategoryData

    render() {
      const {
        history, category, classes, expanded, handleChange, searchVersion = false
      } = this.props;
      const { subcategoryData } = this.state;
      const parentCatId = category.CategoryId;

      return (

        <ExpansionPanel square expanded={expanded} onChange={handleChange(category.CategoryId)}>
          <ExpansionPanelSummary
            aria-controls="panel1d-content"
            id="panel1d-header"
            onClick={this.getSubcategories(category.CategoryId)}
          >
            <div className={classes.summary}>
              <div className={classes.mainCatImgWrapper}>
                <Image
                  height={40}
                  alt={category.CategoryName}
                  src={category.CategoryImage}
                  placeHolderSpanWrapper={classes.mainCatPlaceHolderWrapper}
                />
              </div>

              <Typography className={classes.primaryHeading}>{category.CategoryName}</Typography>
            </div>
            {!searchVersion
              ? <span className={classes.expandIcon}>{expanded ? <MinusIcon /> : <PlusIcon />}</span>
              : null}
          </ExpansionPanelSummary>
          {!searchVersion
            ? (subcategoryData.length && expanded)
              ? (
                <ExpansionPanelDetails>
                  <div className={classes.categoryItems}>
                    {subcategoryData.map((subCategory, index) => (
                      <CategoryItem
                        key={index}
                        data={subCategory}
                        parentCategoryName={category.CategoryName}
                        history={history}
                        subcategoryData={this.getSubcategoryData}
                        parentCatId={parentCatId}
                      />
                    ))}
                  </div>
                </ExpansionPanelDetails>
              ) : null
            : null}
        </ExpansionPanel>
      );
    }
  }
);
