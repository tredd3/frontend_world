/** @jsx jsx */
import { jsx, css } from '@emotion/core';

const label = css`
  margin-left: auto;
  font-size: 9px;
  text-transform: uppercase;
  padding: 0 5px;
  color: #fff;
  position: absolute;
  right: 10px;
  top: 10px;
`;

const defaultAddressLabel = css`
  background-color: #616267;
`;

export const DefaultLabel: React.FC<{ show: boolean }> = ({ show }) => {
  if (!show) return null;

  return (
    <div css={[label, defaultAddressLabel]}>
      Default address
    </div>
  );
};

const newAddressLabel = css`
  background-color: green;
`;

const isMoreThanFiveMinsAgo = (date: Date) => (
  Date.now() - date.valueOf() > 1000 * 60 * 5
);

export const NewLabel: React.FC<{ addedDate: Date }> = ({ addedDate }) => {
  if (isMoreThanFiveMinsAgo(addedDate)) return null;

  return (
    <div css={[label, newAddressLabel]}>
      New
    </div>
  );
};
