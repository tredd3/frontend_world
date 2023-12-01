/** @jsx jsx */
import { useEffect, useState, useCallback } from 'react';
import { jsx, css } from '@emotion/core';
import { useHistory } from 'react-router-dom';
import { DashboardProductPivot, ProductPivot, ShipmentProductPivot } from '../../../types';
import Button from '../button';
import Coupon from '../coupon/Coupon';
import Price from '../Price';
import Quantity from '../Quantity';
import { getCart } from '../../../services/cart';
import Image from '../Image';
import OfferSticker from '../OfferSticker';
import { trackProduct, setPurchaseJourney } from '../../../helpers/analytics';
import useCartActions from '../../../hooks/use-cart-actions';
import { flatMap } from '../../../helpers/typed-utils';
import { productUrl } from '../../../helpers/urls';

const styles = {
  wrapper: css`
    min-width: 42%;
    max-width: 42%;
    margin-right: 15px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  `,
  productName: css`
    width: 100%;
    color: #000;
    font-size: 14px;
    max-height: calc(1.46429em * 2);
    overflow: hidden;
  `,
  imageWrapper: css`
    width: 90px;
    height: 90px;
    margin: 15px auto 10px;
  `,
  imageDiv: css`
    height: 100%;
    width: 100%;
    position: relative;
  `
};

type Props = {
  product: DashboardProductPivot;
}

const HorizontalProductsListItem = ({
  product
}: Props) => {
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const history = useHistory();
  const {
    images, name, mrp, sp, category, skuId, brandName, coupon
  } = product;
  const { addToCart, changeQuantity } = useCartActions();

  const onClick = () => {
    setPurchaseJourney('Deals');
    history.push(productUrl(skuId));
  };

  const setProductQuantity = useCallback(async () => {
    const cart = await getCart();
    const products = flatMap(cart.shipments, shipment => shipment.products);
    const selectedProduct = products.find(product => product.skuId === skuId);

    if (selectedProduct) {
      setSelectedQuantity(selectedProduct.selectedQuantity);
    }
  }, [skuId]);

  const onAddToCart = async () => {
    trackProduct('addToCart', {
      productID: skuId,
      quantity: 1,
      price: mrp,
      productName: name,
      productCategory: category.name,
      brandName,
      purchaseJourney: 'Deals'
    });

    await addToCart(product as ProductPivot);
    setProductQuantity();
  };

  const onChangeQuantity = async (quantity: number) => {
    setSelectedQuantity(quantity);
    await changeQuantity(product as unknown as ShipmentProductPivot, quantity);
    setProductQuantity();
  };

  useEffect(() => {
    setProductQuantity();
  }, [setProductQuantity]);

  return (
    <div css={styles.wrapper}>
      <section onClick={onClick}>
        <div css={styles.imageWrapper}>
          <div css={styles.imageDiv}>
            <Image height={90} alt="img" src={images[0]} />
            <OfferSticker sp={sp} mrp={mrp} topOffset={-12} leftOffset={-13} />
          </div>
        </div>
        <div css={styles.productName}>{name}</div>
      </section>
      <section>
        <Price sp={sp} mrp={mrp} />
        <Coupon coupon={coupon} variant="list" wrapperStyle={css`margin-bottom: 10px;`} />

        {selectedQuantity ? (
          <Quantity
            value={selectedQuantity}
            onChange={e => onChangeQuantity(Number(e.target.value))}
          />
        ) : (
          <Button
            text="Add"
            name="addToCart"
            type="solidGray"
            style={{ padding: '6px', fontWeight: 600 }}
            onClick={onAddToCart}
          />
        )}
      </section>
    </div>
  );
};

export default HorizontalProductsListItem;
