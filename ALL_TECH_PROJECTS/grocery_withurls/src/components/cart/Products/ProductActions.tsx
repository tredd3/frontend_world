/** @jsx jsx */
import React, { memo, useCallback } from 'react';
import { jsx, css } from '@emotion/core';
import { ShipmentProductPivot } from '../../../types/pivot';
import Quantity from '../../uiControls/Quantity';
import Button from '../../uiControls/button';
import { ProductRenderVariations } from './types';
import { ActionHandlers } from '../types';

const buttonStyles = {
  wrapper: { display: 'inline-block', marginLeft: 7 },
  inner: { padding: '6px 5px', fontWeight: 600 }
};

type ProductActionsProps = {
  type: ProductRenderVariations;
  product: ShipmentProductPivot;
} & ActionHandlers;

const ProductActions: React.FC<ProductActionsProps> = ({
  type, product,
  onSaveForLater, onMoveToCart, onDeleteSavedForLater, onDelete, onChangeQuantity
}) => {
  const onClickSaveForLater = useCallback(() => onSaveForLater(product), [product, onSaveForLater]);
  const onClickMoveToCart = useCallback(() => onMoveToCart(product), [product, onMoveToCart]);
  const onClickDeleteSavedForLater = useCallback(() => onDeleteSavedForLater(product), [product, onDeleteSavedForLater]);
  const onClickDeleteFromCart = useCallback(() => onDelete(product), [product, onDelete]);
  const onChangeQuantityWrapper = useCallback(
    ({ target: { value } }) => onChangeQuantity(product, Number(value)),
    [product, onChangeQuantity]
  );

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div css={css`margin-top: 6px;`} onClick={e => e.stopPropagation()}>
      {(type === 'cart' || type === 'review-cart') && (
        <div style={{ width: 70, display: 'inline-block', height: 40 }}>
          <Quantity
            value={product.selectedQuantity}
            onChange={onChangeQuantityWrapper}
          />
        </div>
      )}
      <Button
        type="solidGray"
        text="Delete"
        name="continue"
        onClick={type === 'save-for-later' ? onClickDeleteSavedForLater : onClickDeleteFromCart}
        wrapperStyle={buttonStyles.wrapper}
        style={buttonStyles.inner}
      />

      {type === 'save-for-later' && (
        <Button
          type="solidGray"
          text="Move to Cart"
          name="continue"
          onClick={onClickMoveToCart}
          wrapperStyle={buttonStyles.wrapper}
          style={buttonStyles.inner}
        />
      )}

      {type === 'cart' && (
        <Button
          type="solidGray"
          text="Save for later"
          name="continue"
          onClick={onClickSaveForLater}
          wrapperStyle={buttonStyles.wrapper}
          style={buttonStyles.inner}
        />
      )}
    </div>
  );
};

export default memo(ProductActions);
