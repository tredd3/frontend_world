/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import ShopByCategory from '../../shopByCategory/ShopByCategory';

const styles = {
  wrapper: css`margin: 0 15px 15px 15px;`,
  heading: css`
    font-size: 16px;
    font-weight: 600;
  `,
  message: css`font-size: 14px;`
};

export default () => (
  <div css={styles.wrapper}>
    <h2 css={styles.heading}>Your Shopping Cart is empty</h2>
    <p css={styles.message}>
      Continue shopping on the JioMart, learn about today's deals, or visit
      your WishList.
    </p>
    <ShopByCategory cartVersion />
  </div>
);
