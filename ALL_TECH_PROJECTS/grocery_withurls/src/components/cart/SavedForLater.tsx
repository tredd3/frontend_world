/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/core';
import Products from './Products';
import { ShipmentProductPivot } from '../../types';
import { OnCartUpdated } from './types';

const styles = {
  wrapper: css`background-color: #fff;`,
  title: css`
    font-size: 16px;
    font-weight: 600;
    padding: 10px 0 0 10px;
  `,
  count: css`
    font-size: 12px;
    font-weight: 400;
  `
};

type Props = {
  products: ShipmentProductPivot[];
  onCartUpdated: OnCartUpdated;
};

const SavedForLater: React.FC<Props> = ({
  products,
  onCartUpdated
}) => (
  <div css={styles.wrapper}>
    <h2 css={styles.title}>
      Saved for later
      <span css={styles.count}>{` (${products.length} items)`}</span>
    </h2>
    <Products products={products} type="save-for-later" onCartUpdated={onCartUpdated} />
  </div>
);

export default SavedForLater;
