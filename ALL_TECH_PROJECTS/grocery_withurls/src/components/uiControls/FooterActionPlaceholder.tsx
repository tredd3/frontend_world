/** @jsx jsx */
import { jsx, css } from '@emotion/core';

const wrapper = css`
  position: fixed;
  bottom: 0;
  width: 100%;
  margin-bottom: 15px;
  text-align: center;
  display: flex;
`;

const inner = css`
  flex-grow: 0.85;
  margin: auto auto;
`;

const FooterActionPlaceholder: React.FC = ({ children }) => (
  <div css={wrapper}>
    <div css={inner}>
      {children}
    </div>
  </div>
);

export default FooterActionPlaceholder;
