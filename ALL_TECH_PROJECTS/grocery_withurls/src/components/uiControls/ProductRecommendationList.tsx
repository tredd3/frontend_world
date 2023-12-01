/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import HorizontalSlider from './HorizontalSlider';
import STYLE_CONST from '../../constants/style';
import ProductRecommendationItem from './ProductRecommendationItem';
import { ProductPivot } from '../../types';
import { cartAddItem } from '../../actions/cart';
import { setPurchaseJourney, trackLink } from '../../helpers/analytics';
import { productSimilarItemsUrl } from '../../helpers/urls';

const { black, blue } = STYLE_CONST;

const styles = {
  container: css`
    padding: 14px;
    
    .leftTextLabel {
      color: ${black.black};
      font-weight: 600;
      font-size: 16px;
    }
    .rightTextLabel {
      color: ${blue.navyBlue};
      font-size: 14px;
    }
  `,
  header: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  title: css`
    color: ${black.black};
    font-weight: 600;
    font-size: 16px;
  `,
  link: css`
    color: ${blue.navyBlue};
    font-size: 14px;
  `
};

type Props = {
  addItem: (item: any) => void;
  products: ProductPivot[];
  productSkuId: number;
  title: string;
};

const ProductRecommendationList: React.FC<Props> = ({
  addItem,
  products,
  productSkuId,
  title
}) => {
  const history = useHistory();

  const handleClickSeeMore = () => {
    setPurchaseJourney('Deals');
    trackLink('See All', 'Todays Deals', 'Middle');
    history.push(productSimilarItemsUrl(productSkuId));
  };

  if (products && products.length) {
    return (
      <section css={styles.container}>
        <div css={styles.header}>
          <span css={styles.title}>{title}</span>
          <span
            css={styles.link}
            onClick={handleClickSeeMore}
          >
            See More
          </span>
        </div>
        <HorizontalSlider>
          {
            products.map(product => (
              <ProductRecommendationItem
                key={product.id}
                product={product}
                onAddProduct={() => {
                  addItem({ skuId: product.skuId, Quantity: 1, ProductType: product.isFc });
                }}
              />
            ))
          }
        </HorizontalSlider>
      </section>
    );
  }

  return null;
};

export default connect(
  state => ({ cart: (state as any).cart }),
  dispatch => ({ addItem: (item: any) => dispatch(cartAddItem(item) as any) })
)(ProductRecommendationList);
