/** @jsx jsx */
import React, { useState, useEffect, useCallback } from 'react';
import { jsx, css } from '@emotion/core';
import { useHistory } from 'react-router-dom';
import { Button as Button2 } from '../Material-UI';
import Button from '../uiControls/button/index';
import Quantity from '../uiControls/Quantity';
import OfferSticker from '../uiControls/OfferSticker';
import { decodeDate } from '../../helpers/utilities';
import ProductImages from './ProductImages';
import Slider from '../uiControls/ImageOverlay/Slider';
import { ProductPivot } from '../../types';
import StyleConstants from '../../constants/style';
import { addItemToWishlist } from '../../services/product';
import { addToCart } from '../../services/cart';
import useSnackbar from '../../hooks/use-snackbar';
import useBoolean from '../../hooks/use-boolean';
import { trackProduct, getPurchaseJourney } from '../../helpers/analytics';
import useCartCount from '../../hooks/use-cart-count';
import Coupon from '../uiControls/coupon/Coupon';
import { cartUrl } from '../../helpers/urls';

const {
  blue, black, red, green, fontWeight
} = StyleConstants;

const styles = {
  ctr: css`
    padding: 15px;
    border-bottom: 5px solid #f5f5f5;
  `,
  categoryName: css`
    color: ${blue.sky};
    font-size: 14px;
    font-family: 'OPEN SANS';
    font-weight: 600;
  `,
  productName: css`
    font-size: 16px;
    font-family: 'OPEN SANS';
    font-weight: 600;
    color: ${black.black};
  `,
  productDescriptionImage: css`
    text-align: center;
    padding-top: 35px;
    height: 185px;
    width: 54%;
    margin: 0 auto;
    margin-bottom: 44px;
    position: relative;
  `,
  productMRP: css`
    color: ${black.lightGray};
  `,
  productPriceCtr: css`
    margin-bottom: 5px;
    color: ${black.lightGray};
    font-size: 16px;
  `,
  productPrice: css`
    color: ${red.speechRed};
    font-weight: ${fontWeight.semiBold};
    font-size: 20px;
  `,
  productSaveCtr: css`
    margin-bottom: 5px;
    color: ${black.lightGray};
    font-size: 15px;
    font-family: 'OPEN SANS';
  `,
  productSave: css`
    color: ${green.green};
    font-weight: ${fontWeight.semiBold};
  `,
  bestBefore: css`
    font-size: 16px;
  `,
  coupon: css`
    padding-top: 3px;
    padding-bottom: 3px;
  `,
  addAndBuyNow: css`
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  `,
  addToWishlistButton: css`
    margin-top: 10px;
    padding: 0px;
    color: rgb(26, 115, 233);
  `
};

const getPortalImageData = (images: ProductPivot['images']): {
  original: string;
  thumbnail: string;
}[] => images.map(imageUrl => ({ original: imageUrl, thumbnail: imageUrl }));

const ProductPrimarySection: React.FC<{ product: ProductPivot }> = ({
  product
}) => {
  const {
    images, coupon, bestBefore, skuId, mrp, sp, category: { name: categoryName }, name, brandName
  } = product;
  const { notifyCartHasUpdated } = useCartCount();
  const history = useHistory();
  const showSnackbar = useSnackbar();
  const [imageZoomed, zoomImage, unzoomImage] = useBoolean(false);
  const portalImageData = getPortalImageData(images);
  const [quantity, setQuantity] = useState<number>(1);
  const discountAmount = mrp - sp;
  const discountPercent = discountAmount ? ((discountAmount * 100) / mrp).toFixed(0) : 0;

  const trackWithProduct = useCallback((eventName: string) => {
    trackProduct(eventName, {
      productID: skuId,
      quantity,
      price: quantity * mrp,
      productCategory: categoryName,
      purchaseJourney: getPurchaseJourney(),
      productName: name,
      brandName
    });
  }, [brandName, categoryName, mrp, name, quantity, skuId]);

  const addToCartWrapper = async () => {
    try {
      await addToCart(product, quantity);
      notifyCartHasUpdated();
    } catch (e) {
      showSnackbar(e);
    }
  };

  useEffect(() => {
    trackWithProduct('prodView');
  }, [trackWithProduct]);

  const handleAddToCart = async () => {
    trackWithProduct('addToCart');
    await addToCartWrapper();
  };

  const handleBuyNow = async () => {
    trackWithProduct('buyNow');
    await addToCartWrapper();
    history.push(cartUrl);
  };

  const handleAddToWishlist = async () => {
    trackWithProduct('addToWishlist');
    try {
      await addItemToWishlist(skuId);
      showSnackbar({ message: 'Item added to WishList', type: 'success' });
    } catch (e) {
      showSnackbar({ message: 'Error while Adding to Wishlist', type: 'error' });
    }
  };

  return (
    <section css={styles.ctr}>
      <div css={styles.categoryName}>{brandName}</div>
      <div css={styles.productName}>{name}</div>
      <div css={styles.productDescriptionImage}>
        <OfferSticker sp={sp} mrp={mrp} topOffset={20} />
        <div onClick={zoomImage}>
          <ProductImages images={images} />
        </div>
      </div>

      <section css={css`margin-bottom: 10px;`}>
        <div css={styles.productPriceCtr}>
          M.R.P :
          <span css={[styles.productMRP, discountAmount ? css`text-decoration: strike-through;` : '']}>{` ₹ ${mrp.toFixed(2)}`}</span>
        </div>
        <div css={styles.productPriceCtr}>
          Price :
          <span css={styles.productPrice}>{` ₹ ${sp.toFixed(2)} `}</span>
          (inclusive of all taxes)
        </div>
        {
          discountAmount ? (
            <div css={styles.productSaveCtr}>
              You Save :
              <span css={styles.productSave}>{` ₹ ${discountAmount.toFixed(2)} `}</span>
              {`(${discountPercent} %)`}
            </div>
          ) : null
        }
        {
          bestBefore ? (
            <div css={styles.bestBefore}>
              Best Before :
              {/* Write a better date formatter */}
              <span css={css`font-weight: 600;`}>{` ${decodeDate(bestBefore)}`}</span>
            </div>
          ) : null
        }

        <Coupon coupon={coupon} variant="detail" wrapperStyle={css`margin: 5px 0;`} />
      </section>
      <div style={{ width: 80, display: 'inline-block' }}>

        <Quantity
          onChange={e => {
            setQuantity(parseInt(e.target.value, 10));
          }}
          value={quantity}
        />
      </div>

      <div css={styles.addAndBuyNow}>
        <Button
          onClick={handleAddToCart}
          text="Add to Cart"
          style={{ padding: '7px' }}
          wrapperStyle={{ width: '46%' }}
          type="solidGray"
        />
        <Button
          onClick={handleBuyNow}
          text="Buy Now"
          style={{ padding: '7px' }}
          wrapperStyle={{ width: '46%' }}
          type="solidTulip"
        />
      </div>
      <Button2
        style={{
          marginTop: '10px',
          padding: '0px',
          color: 'rgb(26, 115, 233)'
        }}
        onClick={handleAddToWishlist}
      >
        ADD TO WISHLIST
      </Button2>
      {imageZoomed ? (
        <Slider
          id="fullDiv"
          portalImageData={portalImageData}
          closeSliderPortal={unzoomImage}
        />
      ) : null}
    </section>
  );
};

export default ProductPrimarySection;
