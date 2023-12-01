/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { memo } from 'react';
import { ReactComponent as FilterIcon } from '../../assets/images/svg/Filter.svg';

const wrapper = css`
  display: flex;
  justify-content: space-between;
  padding: 10px 16px;
`;

const resultCountBlock = css`
  font-weight: bold;
  font-family: Open sans;
  font-size: 12.5px;
  color: #333333;
  text-transform: uppercase;
`;

const filterWrapper = css`
  display: flex;
  color: #0066C0;
  align-items: center;
  font-size: 13px;
  border: 0;
  background: none;
`;

type FilterBarProps = {
  resultsCount: number;
  openFilter?: (e: React.MouseEvent, toggle: boolean) => void;
  filterCount?: number;
};

const FilterBar: React.FC<FilterBarProps> = ({ resultsCount, openFilter, filterCount }) => (
  <div css={wrapper}>
    <span css={resultCountBlock}>
      {`${resultsCount} result${resultsCount !== 1 ? 's' : ''}`}
    </span>
    {
      openFilter ? (
        <button css={filterWrapper} onClick={e => openFilter(e, true)}>
          <FilterIcon />
          <span css={css`margin-left: 5px;`}>Sort/Filter</span>
          {filterCount ? (
            <span css={css`color: red;`}>
              {`(${filterCount})`}
            </span>
          ) : null}
        </button>
      ) : null
    }
  </div>
);

export default memo(FilterBar);
