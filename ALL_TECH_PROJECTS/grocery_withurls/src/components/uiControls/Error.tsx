/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/core';
import { NoOrder as DefaultErrorIcon } from '../../assets/images/svg';
import Button from './button';

const styles = {
  ctr: css`
    flex: 1;
    text-align: center;
    padding: 60px 30px;
  `,
  errorMessage: css`
    font-weight: 700;
    font-size: 16px;
    text-align: center;
    margin: 12px 0;
  `,
  ctaCtr: css`
    width: 60%;
    display: inline-block;
  `
};

type Props = {
  errorMessage?: string;
  ctaEnabled?: boolean;
  ctaText?: string;
  onClickCta?: () => unknown;
};

const ErrorComponent: React.FC<Props> = ({
  errorMessage = 'Something went wrong',
  ctaEnabled,
  ctaText = 'Try again',
  onClickCta
}) => (
  <div css={styles.ctr}>
    <DefaultErrorIcon />
    <div css={styles.errorMessage}>{errorMessage}</div>

    {
      ctaEnabled
        ? (
          <div css={styles.ctaCtr}>
            <Button text={ctaText} type="solidTulip" onClick={onClickCta} />
          </div>
        )
        : null
    }
  </div>
);

export default ErrorComponent;
