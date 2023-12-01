/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { memo } from 'react';
import { APIAddress } from '../../types';
import { AddressHomeOn, AddressWorkOn, AddressOthersOn } from '../../assets/images/svg';

const AddressIcon: React.FC<{ type: APIAddress['addressTag'] }> = ({ type }) => {
  switch (type) {
    case 'home':
      return (<AddressHomeOn />);
    case 'work':
      return (<AddressWorkOn />);
    default:
      return (<AddressOthersOn />);
  }
};

const wrapper = css`
  padding: 7px 0;
  font-size: 14px;
  font-weight: 600;
`;

const iconWrapper = css`
  display: inline-block;
  margin-right: 10px;
`;

const capitalize = css`
  text-transform: capitalize;
`;

const AddressTag: React.FC<{ tag: APIAddress['addressTag'] }> = ({ tag }) => (
  <div css={wrapper}>
    <span css={iconWrapper}>
      <AddressIcon type={tag} />
    </span>
    <span css={capitalize}>{tag}</span>
  </div>
);

export default memo(AddressTag);
