/** @jsx jsx */
import React, { useState } from 'react';
import { jsx, css } from '@emotion/core';
import { useHistory } from 'react-router-dom';
import Price from '../uiControls/Price';
import Coupon from '../uiControls/coupon/Coupon';
import Button from '../uiControls/button';
import Quantity from '../uiControls/Quantity';
import Image from '../uiControls/Image';
import OfferSticker from '../uiControls/OfferSticker';
import { trackProduct, getPurchaseJourney } from '../../helpers/analytics';
import { queryStringToObject } from '../../helpers/functional';
import { DashboardProductPivot, ProductPivot } from '../../types';
import useCartActions from '../../hooks/use-cart-actions';
import { productUrl } from '../../helpers/urls';

const styles = {
  wrapper: css`
    display: flex;
    margin: 8px 0 15px;
    padding-bottom: 8px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  `,
  buttons: css`
    display: flex;
    flex-direction: column;
    width: 75px;
    margin-top: 5px;
    padding-right: 5px;
  `
};

export default ({ product }: { product: DashboardProductPivot }) => {
  const [quantity, setQuantity] = useState(1);
  const history = useHistory();
  const { addToCart } = useCartActions();
  const changeQuantity = (e: React.ChangeEvent<HTMLSelectElement>) => setQuantity(Number(e.target.value));

  const trackLinkClick = (
    productID: number, productPrice: number, productName: string, productCategory: { name: string }, brandName: string
  ) => trackProduct('prodView', {
    productID,
    quantity,
    price: quantity * productPrice,
    productCategory: productCategory.name,
    brandName,
    productName
  });

  const {
    images, name, sp, mrp, skuId, category, coupon, brandName
  } = product;

  return (
    <div css={styles.wrapper}>
      <div
        css={css`margin-right: 10px; position: relative;`}
        onClick={() => {
          trackLinkClick(skuId, mrp, name, category, brandName);
          history.push(productUrl(skuId));
        }}
      >
        <Image
          width={100}
          alt={name}
          src={images[0]}
        />
        <OfferSticker sp={sp} mrp={mrp} topOffset={-7} leftOffset={-7} />
      </div>
      <div css={css`width: 100%; overflow: hidden;`}>
        <div
          css={css`font-size: 14px; color: #000;`}
          onClick={() => {
            trackLinkClick(skuId, mrp, name, category, brandName);
            history.push(productUrl(skuId));
          }}
        >
          {name}
        </div>
        <section css={css`display: flex; justify-content: space-between;`}>
          <div css={css`width: 65%; padding-top: 4px;`} onClick={() => history.push(`/productDescription/${category.id}/${skuId}`)}>
            <Price sp={sp} mrp={mrp} />
            <Coupon
              coupon={coupon}
              wrapperStyle={css`margin-top: 6px;`}
              variant="list"
            />
          </div>
          <div css={styles.buttons}>
            <Quantity onChange={changeQuantity} value={quantity} />
            <Button
              text="Add"
              name="addToCart"
              style={{ padding: '5px', marginTop: '6px', fontWeight: 600 }}
              onClick={async () => {
                const queryFilterObj = queryStringToObject(history.location.search.split('?')[1]);

                const filterSection = {
                  filterSelection: 'categoryName' in queryFilterObj || 'brandName' in queryFilterObj,
                  sortSelection: 'sort' in queryFilterObj
                };
                trackProduct('addToCart', {
                  productID: skuId,
                  quantity,
                  price: quantity * mrp,
                  productCategory: category.name,
                  brandName,
                  purchaseJourney: getPurchaseJourney(),
                  productName: name
                }, filterSection);

                await addToCart(product as unknown as ProductPivot, quantity);
              }}
              type="solidGray"
            />
          </div>
        </section>
      </div>
    </div>
  );
};

