/** @jsx jsx */
import { jsx, css, ClassNames } from '@emotion/core';
import { Radio } from '@material-ui/core';
import { memo } from 'react';
import { DefaultLabel, NewLabel } from './AddressLabels';
import { EditButton, DeleteButton } from './AddressButtons';
import KiranaBlock from './KiranaBlock';
import AddressTag from './AddressTag';
import { APIAddress } from '../../types';

// eslint-disable-next-line @typescript-eslint/camelcase, camelcase
const addressLines = (address: APIAddress) => (
  [address.addressLine1, address.addressLine2, address.addressLine3]
    .join(', ')
);

const wrapper = css`
  position: relative;
  padding: 5px 15px 0 10px;
  margin-bottom: 10px;
  background: #fff;
`;

const label = css`
  display: flex;
  align-items: flex-start;
  padding-top: 5px;
`;

const addressWrapper = css`
  margin-left: 10px;
  font-size: 12px;
`;

const dimmedAddressWrapper = css`
  opacity: 0.7;
`;

const addressHeading = css`
  color: rgba(0, 0, 0, 0.87);
  font-size: 14px;
  font-weight: 400;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  line-height: 1.46429em;
  margin: 0;
  padding-top: 2px;
`;

const addressButtons = css`
  position: absolute;
  right: 15px;
  top: 30px;
  display: flex;
  max-height:27px;
`;

type SingleAddressProps = {
  // eslint-disable-next-line @typescript-eslint/camelcase, camelcase
  address: APIAddress;
  onAddressSelected: (id: number) => void;
  isSelected: boolean;
  onDeleteKirana: React.MouseEventHandler<HTMLButtonElement>;
  onDeleteAddress: (id: number) => void;
  editHref: string;
  kiranaHref: string;
};

const SingleAddress: React.FC<SingleAddressProps> = ({
  address, onAddressSelected, isSelected,
  onDeleteKirana, editHref, kiranaHref, onDeleteAddress
}) => (
  <div css={wrapper}>
    <DefaultLabel show={address.isDefault} />
    {
      !address.isDefault ? <NewLabel addedDate={address.addedDate} /> : null
    }
    <div css={addressButtons}>
      <EditButton href={editHref} />
      {!address.isDefault && (
        <DeleteButton onClick={() => onDeleteAddress(address.id)} />
      )}
    </div>

    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
    <label css={label} htmlFor={`${address.id}`}>
      <ClassNames>
        {({ css }) => (
          <Radio
            id={`${address.id}`}
            name="address"
            color="primary"
            disableRipple
            value={address.id}
            checked={isSelected}
            onClick={() => onAddressSelected(address.id)}
            classes={{
              root: css`padding: 0;`
            }}
          />
        )}
      </ClassNames>
      <div css={[addressWrapper, !isSelected && dimmedAddressWrapper]}>
        <h2 css={addressHeading}>
          {address.firstName}
          {' '}
          {address.lastName}
        </h2>
        <AddressTag tag={address.addressTag} />
        <p>
          {addressLines(address)}
          <br />
          {address.address}
        </p>
        <p>{address.phoneNumber}</p>
      </div>
    </label>
    <KiranaBlock
      storeId={address.storeId}
      storeName={address.storeName}
      selectKiranaHref={kiranaHref}
      onDeleteClick={onDeleteKirana}
    />
  </div>
);

export default memo(SingleAddress);
