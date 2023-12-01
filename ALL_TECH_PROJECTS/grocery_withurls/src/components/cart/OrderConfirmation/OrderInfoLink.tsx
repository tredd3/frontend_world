/** @jsx jsx */
import { ReactNode, memo } from 'react';
import { jsx, css } from '@emotion/core';
import { ChevronRight } from '../../Material-UI';

const styles = {
  wrapper: css`
    margin: 19px 15px 0;
    border-radius: 2px;
  `,
  title: css`
    margin-bottom: 7px;
    font-weight: 600;
    font-size: 14px;
    margin-bottom: 5px;
  `,
  content: css`
    border: 1px solid rgb(223, 223, 223);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
    border-radius: 2px;
    background-color: #fff;
    font-size: 12px;
    width: 100%;
    text-align: left;
    color: #333;
  `
};

type Props = {
  onClick: () => unknown;
  title: string;
  icon: ReactNode;
  contentLine1: string;
  contentLine2?: string | ReactNode;
}

const OrderInfoLink = ({
  onClick,
  title,
  icon,
  contentLine1,
  contentLine2
}: Props) => (
  <div css={styles.wrapper}>
    <div css={styles.title}>{title}</div>
    <button css={styles.content} onClick={onClick}>
      <div css={css`padding-left: 10px; display: flex; align-items: center;`}>
        {icon}
        <div css={css`margin: 0 5px 0 15px;`}>
          <div>{contentLine1}</div>
          {contentLine2}
        </div>
      </div>
      <ChevronRight style={{ color: '#0066C0' }} />
    </button>
  </div>
);

export default memo(OrderInfoLink);
