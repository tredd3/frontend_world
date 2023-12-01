/** @jsx jsx */
import React, { memo, useCallback } from 'react';
import { jsx, css } from '@emotion/core';
import { ShipmentProductPivot, CartPivot } from '../../../types/pivot';
import { ProductRenderVariations } from './types';
import Product from './Product';
import { OnCartUpdated } from '../types';
import {
  moveToSaveForLater, moveToCart, removeFromSavedLater, removeFromCartOnOrderReview
} from '../../../services/cart';
import { trackProduct } from '../../../helpers/analytics';
import useCartActions from '../../../hooks/use-cart-actions';
import { XOR } from '../../../types';

type BaseProps = {
  products: ShipmentProductPivot[];
  roundedTop?: boolean;
  onCartUpdated?: OnCartUpdated;
};

type PostCheckoutCartProps = {
  deliveryDateId: number;
  addressId: number;
};

type ProductsProps = XOR<
  BaseProps & { type: Exclude<ProductRenderVariations, 'review-cart'> },
  BaseProps & { type: 'review-cart' } & PostCheckoutCartProps>;

const listStyle = {
  basic: css`
    padding: 0;
    margin: 0;
  `,
  withMargin: css`
    margin: 10px;
  `,
  roundedTop: css`
    > li:first-of-type {
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
    }
  `
};

const trackCartEvent = (eventName: string, product: ShipmentProductPivot) => {
  trackProduct(eventName, {
    productID: product.skuId,
    quantity: product.selectedQuantity,
    price: product.selectedQuantity * product.mrp,
    productName: product.name,
    productCategory: product.categoryId
    // brandName: BrandName
  });
};

const Products: React.FC<ProductsProps> = ({
  roundedTop = true, products, type, onCartUpdated, deliveryDateId, addressId
}) => {
  const { changeQuantity, changeQuantityOnOrderReview, removeFromCart } = useCartActions();

  const onCartUpdatedWrapper = useCallback((updatedCart?: CartPivot) => {
    onCartUpdated && onCartUpdated(updatedCart);
  }, [onCartUpdated]);

  const onSaveForLater = useCallback(async (product: ShipmentProductPivot) => {
    trackCartEvent('saveForLater', product);
    await moveToSaveForLater(product);
    onCartUpdatedWrapper();
  }, [onCartUpdatedWrapper]);

  const onMoveToCart = useCallback(async (product: ShipmentProductPivot) => {
    trackCartEvent('moveToCart', product);
    await moveToCart(product);
    onCartUpdatedWrapper();
  }, [onCartUpdatedWrapper]);

  const onDeleteSavedForLater = useCallback(async (product: ShipmentProductPivot) => {
    trackCartEvent('deleteSavedForLater', product);
    await removeFromSavedLater(product);
    onCartUpdatedWrapper();
  }, [onCartUpdatedWrapper]);

  const onDelete = useCallback(async (product: ShipmentProductPivot) => {
    if (type === 'cart') {
      trackCartEvent('removeFromCart', { ...product, selectedQuantity: 0 });
      await removeFromCart(product);
      onCartUpdatedWrapper();
    } else if (type === 'review-cart') {
      trackCartEvent('removeFromCartOnOrderReview', { ...product, selectedQuantity: 0 });
      await removeFromCartOnOrderReview(product, deliveryDateId!, addressId!);
      onCartUpdatedWrapper();
    }
  }, [addressId, deliveryDateId, onCartUpdatedWrapper, removeFromCart, type]);

  const onChangeQuantity = useCallback(async (product: ShipmentProductPivot, quantity: number) => {
    if (type === 'cart') {
      await changeQuantity(product, quantity);
      onCartUpdatedWrapper();
    } else if (type === 'review-cart') {
      const updatedCart = await changeQuantityOnOrderReview(product, quantity, deliveryDateId!, addressId!);
      onCartUpdatedWrapper(updatedCart);
    }
  }, [addressId, changeQuantity, changeQuantityOnOrderReview, deliveryDateId, onCartUpdatedWrapper, type]);

  return (
    <ul css={[
      listStyle.basic,
      type !== 'review-cart' && listStyle.withMargin,
      roundedTop && listStyle.roundedTop
    ]}
    >
      {products.map(product => (
        <Product
          key={product.id}
          type={type}
          product={product}
          onSaveForLater={onSaveForLater}
          onMoveToCart={onMoveToCart}
          onDeleteSavedForLater={onDeleteSavedForLater}
          onDelete={onDelete}
          onChangeQuantity={onChangeQuantity}
        />
      ))}
    </ul>
  );
};

export default memo(Products);
