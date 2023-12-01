/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { memo } from 'react';

import Drawer from '@material-ui/core/Drawer';
import { useHistory } from 'react-router-dom';
import Coupon1 from '../../../assets/images/icons/coupon1.png';
import { getMobileOperatingSystem } from '../../../helpers/utilities';

const titleWrapper = css`
  margin: 10px;
  display: flex;
  border: 1px solid #0CD82B;
  border-style: dashed;
  background-color: rgb(12, 216, 43, 0.21);
`;

const imgWrapper = css`
  border-right: 1px solid #0CD82B;
  border-right-style: dashed;
  display: flex;
  align-items: center;
  padding: 2px;
`;

const couponImg = css`
  align-self: center;
  height: 20px;
  padding: 2px;
`;

const couponTitleWrapper = css`
  align-self: center;
  padding: 2px;
  font-weight:400;
  font-size:16px;
`;

const couponTitle = css`
  margin-left: 5px;
`;

const discountWrapper = css`
  margin: 5px 10px ;
  font-size:16px;
  font-weight:400;
`;

const descriptionCss = css`
  margin: 5px 10px;
  font-size:16px;
  font-weight:400;
`;

type Props = {
  description: string;
  title: string;
  discountValue: string;
  drawerState: boolean;
  closeCouponDrawer: React.MouseEventHandler;
}

const CouponDrawer: React.FC<Props> = ({
  description, title, discountValue, drawerState, closeCouponDrawer
}) => {
  const history = useHistory();
  const bottomValue = getMobileOperatingSystem() !== 3
&& history.location.pathname === '/' ? '57px' : '0px';
  return (
    <Drawer
      anchor="bottom"
      PaperProps={{ style: { bottom: `${bottomValue}` } }}
      open={drawerState}
      onClose={closeCouponDrawer}
    >
      <div css={titleWrapper}>
        <div css={imgWrapper}>
          <img src={Coupon1} css={couponImg} alt="img" />
        </div>

        <div css={couponTitleWrapper}>
          <span css={couponTitle}>{title}</span>
        </div>
      </div>
      <span css={discountWrapper}>
      &#8377;
        { }
        {discountValue}
        { }
      off
      </span>
      <div css={descriptionCss}>
        {description?.split('\n').map((data, index) => <div key={index}>{data}</div>)}
      </div>
    </Drawer>
  );
};

export default memo(CouponDrawer);
