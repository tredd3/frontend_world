/** @jsx jsx */
import React from 'react';
import { jsx, css, SerializedStyles } from '@emotion/core';
import CouponDrawer from './CouponDrawer';
import CouponIcon from '../../../assets/images/icons/coupon2.png';
import InfoIcon from '../../../assets/images/svg/info2.svg';
import { ProductPivot } from '../../../types';
import useBoolean from '../../../hooks/use-boolean';

const styles = {
  detail: css`
    display: flex;
    justify-content: space-between;
    border: 1px dashed #0CD82B;
    padding: 10px;
  `,
  list: css`
    color: #0066C0;
    border: 1px solid #C4C4C4;
    padding: 4px;
    font-size: 10px;
    margin: 0 2px 6px 0;
  `,
  icon: css`
    margin: 0 2px;
    width: 11px;
    height: 11px;
  `,
  infoDetail: css`
    font-size: 12px;
    font-weight: 600;
  `,
  infoList: css`
    color: #0066C0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  `
};

type Props = {
  coupon: ProductPivot['coupon'];
  variant: 'list' | 'detail';
  wrapperStyle?: SerializedStyles;
};

const Coupon = ({ wrapperStyle, coupon, variant }: Props) => {
  const [couponDrawerVisible, showCouponDrawer, hideCouponDrawer] = useBoolean(false);

  if (!coupon) {
    return null;
  }

  const renderCouponInfo = () => {
    if (variant === 'detail') {
      return (
        <React.Fragment>
          <div css={css`display: flex;`}>
            <img src={CouponIcon} alt="Coupon" css={css`height: 30px; margin: 0 5px 0 8px;`} />
            <div css={css`font-size: 12px; font-weight: 600;`}>
              <div css={css`color: '#079A18';`}>Coupon Available</div>
              <div css={css`color: '#7b6f6f';`}>{coupon.title}</div>
            </div>
          </div>
          <img src={InfoIcon} alt="coupon-info" style={{ marginRight: '2px' }} />
        </React.Fragment>
      );
    }

    return (
      <div css={css`display: flex; align-items: center;`}>
        <img src={CouponIcon} alt="Coupon" css={css`width: 11px; margin: 0 2px;`} />
        <div css={styles.infoList}>{`Coupon Available | ₹ ${coupon.discountAmount} OFF`}</div>
      </div>
    );
  };

  return (
    <div
      css={[variant === 'detail' ? styles.detail : styles.list, wrapperStyle]}
      onClick={e => {
        e.stopPropagation();
        showCouponDrawer();
      }}
    >
      {renderCouponInfo()}

      <CouponDrawer
        description={coupon.description}
        title={coupon.title}
        discountValue={`${coupon.discountAmount}`}
        drawerState={couponDrawerVisible}
        closeCouponDrawer={e => {
          e.stopPropagation();
          hideCouponDrawer();
        }}
      />
    </div>
  );
};

export default Coupon;
