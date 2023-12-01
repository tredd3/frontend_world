import React from 'react';
import HorizontalProductsListItem from './HorizontalProductsListItem';
import HorizontalSlider from '../HorizontalSlider';
import { DashboardProductPivot } from '../../../types';

type Props = {
  products: DashboardProductPivot[];
};

const Products = ({
  products
}: Props) => {
  if (products && products.length) {
    return (
      <HorizontalSlider>
        { products.map(product => <HorizontalProductsListItem key={product.id} product={product} />) }
      </HorizontalSlider>
    );
  }

  return null;
};

export default Products;
