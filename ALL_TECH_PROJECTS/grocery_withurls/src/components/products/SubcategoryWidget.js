import React from 'react';
import { withStyles } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import style from './style';
import HorizontalSlider from '../uiControls/HorizontalSlider';
import { pipe, objectToQueryString } from '../../helpers/functional';
import { getUrlParams } from '../../helpers/utilities';
import Image from '../uiControls/Image';
import { subCategoryUrl } from '../../helpers/urls';

export default pipe(
  withRouter,
  withStyles(style)
)(
  class SubcategoryWidget extends React.Component {
    constructor(props) {
      super(props);
      this.state = { l2CategoryId: 0 };
    }

    componentDidMount() {
      const {
        subcategories, history, match
      } = this.props;
      this.setState({
        l2CategoryId: Number(match.params.subCategoryId || Number(subcategories[0].id))
      });
      if (!match.params.subCategoryId) {
        history.replace(subCategoryUrl(match.params.categoryId, subcategories[0].id));
      }
      // onSubcategorySelected();
    }

    replaceQueryParam = id => objectToQueryString({
      catId: getUrlParams('catId'),
      subcatId: id
    })

    clickHandler = product => () => {
      const { history, match } = this.props;
      this.setState({ l2CategoryId: product.id });
      history.replace(subCategoryUrl(match.params.categoryId, product.id));
      // onSubcategorySelected();
    }

    render() {
      const { classes, subcategories } = this.props;
      const selectedStyle = { border: '1px solid #0066C0' };
      const style = { border: '1px solid #dbdbdb' };
      if (!subcategories.length) return null;

      return (
        <HorizontalSlider style={{ margin: '16px', width: 'auto' }}>
          {subcategories.map((product, index) => (
            <div
              className={classes.SubcategoryWidget}
              style={
                ((this.state.l2CategoryId === 0 && index === 0) || product.id === this.state.l2CategoryId)
                  ? selectedStyle
                  : style
              }
              key={index}
              onClick={this.clickHandler(product)}
            >
              <Image
                width={68}
                alt={product.name}
                src={product.image}
                placeHolderSpanWrapper={classes.placeHolderWrapper}
              />
              <p className="categoryName">{product.name}</p>
            </div>
          ))}
        </HorizontalSlider>
      );
    }
  }
);
