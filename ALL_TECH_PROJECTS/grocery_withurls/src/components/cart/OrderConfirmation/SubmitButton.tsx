/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Link } from 'react-router-dom';
import Button from '../../uiControls/button';

const styles = {
  termsWrapper: css`
    font-size: 12px;
    padding: 8px;
    text-align: center;
  `,
  termsLink: css`
    font-weight: 600;
    color: inherit;
    text-decoration: none;
  `
};

const SubmitButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <div>
    <Button
      wrapperStyle={{ padding: 15, paddingBottom: 0, fontWeight: 600 }}
      text="Place Your Order"
      type="solidTulip"
      onClick={onClick}
    />
    <div css={styles.termsWrapper}>
        You agree to
        &nbsp;
      <Link
        css={styles.termsLink}
        to="/cart/terms"
      >
          Terms and Conditions
      </Link>
        &nbsp;
        by placing this order
    </div>
  </div>
);

export default SubmitButton;
