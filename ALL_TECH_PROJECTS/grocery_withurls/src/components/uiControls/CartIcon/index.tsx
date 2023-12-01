/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React from 'react';
import useCartCount from '../../../hooks/use-cart-count';
import cartIcon from './cart-minus.svg';
import cartIconGray from '../../../assets/images/svg/Cart-01.svg';

const styles = {
  root: css`
    position: relative;
    width: 30px;
  `,
  cartImage: css`
    position: absolute;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
  `,
  cartItems: css`
    font-size: 12px;
    font-family: inherit;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -2px;
    margin-right: -50%;
    transform: translate(-42%, -110%);
    color: #fff;
  `,
  cartItemsBottom: css`
    font-size: 12px;
    font-family: inherit;
    position: absolute;
    top: 35%;
    left: 53%;
    margin-top: -2px;
    margin-right: -50%;
    transform: translate(-42%, -110%);
    color: #004D9C;
  `
};

const CartIcon: React.FC<{ position: 'top' | 'bottom'}> = ({
  position = 'bottom'
}) => {
  const { cartCount } = useCartCount();

  return (
    <React.Fragment>
      {
        position === 'top' ? (
          <div css={styles.root}>
            <img src={cartIcon} alt="cart icon" css={styles.cartImage} />
            {cartCount !== 0 && <span css={styles.cartItems}>{cartCount}</span>}
          </div>
        ) : (
          <React.Fragment>
            {cartCount !== 0 && <span css={styles.cartItemsBottom}>{cartCount}</span>}
            <img src={cartIconGray} alt="cart icon" />
          </React.Fragment>
        )
      }
    </React.Fragment>
  );
};

export default CartIcon;
