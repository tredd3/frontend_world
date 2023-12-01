/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import PageTemplate from '../uiControls/PageTemplate/PageTemplate';

const style = css`
  width: 100vw;
  height: 100vh;
  border: none;
`;

export default () => (
  <PageTemplate
    whiteBackground={false}
    lefticon2={false}
    righticon1={false}
    righticon2={false}
    subSection={false}
    showHeader
    title="Terms & Conditions"
  >
    <iframe
      title="Terms and conditions"
      css={style}
      height={window.innerHeight}
      width={window.innerWidth}
      frameBorder={0}
      src="https://static.jiomoney.com/static/coupon/jiomarttnc.html"
    />
  </PageTemplate>
);
