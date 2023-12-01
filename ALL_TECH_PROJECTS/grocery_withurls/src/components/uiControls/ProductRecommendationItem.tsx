/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { ProductPivot } from '../../types';
import Image from './Image';
import OfferSticker from './OfferSticker';
import { Typography } from '../Material-UI';
import Coupon from './coupon/Coupon';
import Price from './Price';
import Button from './button';
import { trackProduct, setPurchaseJourney } from '../../helpers/analytics';
import { productUrl } from '../../helpers/urls';

const styles = {
  container: css`
    min-width: 42%;
    max-width: 42%;
    margin-right: 15px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  `,
  imageWrapper: css`
    width: 90px;
    height: 90px;
    margin: 15px auto 10px auto;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  imageCtr: css`
    height: 100%;
    width: 100%;
    position: relative;
  `,
  image: css`
    object-fit: fill;
  `
};

type Props = {
  product: ProductPivot;
  onAddProduct: () => void;
};

const ProductRecommendationItem: React.FC<Props> = ({
  product,
  onAddProduct
}) => {
  const history = useHistory();
  const {
    images,
    name,
    mrp,
    sp,
    category,
    skuId,
    brandName,
    coupon
  } = product;

  const handleAddProduct = () => {
    trackProduct('addToCart', {
      productID: skuId,
      quantity: 1,
      price: mrp,
      productName: name,
      productCategory: category.name,
      brandName,
      purchaseJourney: 'Deals'
    });

    onAddProduct();
  };

  const handleClick = () => {
    setPurchaseJourney('Deals');
    history.push(productUrl(skuId));
  };

  return (
    <div css={styles.container}>
      <section onClick={handleClick}>
        <div css={styles.imageWrapper}>
          <div css={styles.imageCtr}>
            <Image css={styles.image} height={90} alt="img" src={images[0]} />
            <OfferSticker sp={sp} mrp={mrp} topOffset={-12} leftOffset={-13} />
          </div>
        </div>
        <Typography className="productName">{name}</Typography>
      </section>
      <section className="section2">
        <Price sp={sp} mrp={mrp} />
        <Coupon coupon={coupon} wrapperStyle={css`margin-bottom: 10px;`} variant="list" />
        <Button
          text="Add"
          name="addToCart"
          type="solidGray"
          style={{ padding: '6px', fontWeight: 600 }}
          onClick={handleAddProduct}
        />
      </section>
    </div>
  );
};

export default ProductRecommendationItem;
