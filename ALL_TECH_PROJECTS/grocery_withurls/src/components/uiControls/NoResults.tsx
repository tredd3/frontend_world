/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { memo } from 'react';

import { NoOrder } from '../../assets/images/svg';

const compWrapper = css`
  padding: 40px;
  color: black;
  text-align: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 65vh;
`;

const dashSearchWrapper = css`
  padding: '16px';
  color: 'red';
  width: '70%';
  font-size: '14px';`;

const dashLabel = css`
  font-weight:600;`;

const noResultLabel = css`
  margin-top: 20px;
  word-wrap: break-word;
`;

type Props = {
  text: string;
  icon?: React.ReactNode;
  page?: string;
};

const NoResults: React.FC<Props> = ({
  text, page, icon = (<NoOrder />)
}) => (page === 'dashSearch' ? (
  <div css={dashSearchWrapper}>
    <span>
      Found no results for
      {' '}
      <span css={dashLabel}>{text}</span>
    </span>
    <span>Check your spelling and search again</span>
  </div>
) : (
  <div css={compWrapper}>
    {icon}
    <span css={noResultLabel}>{text || 'No results found'}</span>
  </div>
));

export default memo(NoResults);
