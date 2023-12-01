/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useState, useEffect, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  getDefaultAddress, deleteKiranaFromAddress, deleteAddress, getAddresses
} from '../../services/address';
import useQueryParams from '../../hooks/use-query-params';
import ConfirmDialog from './ConfirmDialog';
import SingleAddress from './SingleAddress';
import { APIAddress } from '../../types';
import useSnackbar from '../../hooks/use-snackbar';
import { NoAddress } from '../../assets/images/svg';

const styles = {
  addressListCard: css`
    background-color: #f2f2f2;
    padding-bottom: 63px;
  `,
  head: css`
    margin: 10px 0px 15px;
    font-size: 14px;
  `,
  myAddTitle: css`
    font-weight: 600;
  `,
  addAddress: css`
    color: #0066C0;
    text-decoration: none;
    position: absolute;
    right: 15px;
  `,
  root: css`
    margin-left: 15px;
    margin-right: 15px;
    margin-bottom: 15px;
    margin-top: -15px;
    font-size: 14px;
    padding-top: 15px;
  `
};

type AddressProps = {
  onAddressesFetched?: (addresses: APIAddress[]) => void;
  onAddressSelected: (addressId: number) => void;
  isAddressSelected: (address: APIAddress) => boolean;
  pathPrefix: 'cart' | 'account';
};

const Addresses: React.FC<AddressProps> = ({
  onAddressesFetched, onAddressSelected, isAddressSelected, pathPrefix
}) => {
  const { replace } = useHistory();
  const queryParam = useQueryParams();
  const [addressIdToDelete, setAddressIdToDelete] = useState<number | null>(null);
  const [addresses, setAddresses] = useState<APIAddress[]>([]);
  const showSnackbar = useSnackbar();

  const fetchAddresses = useCallback(async () => {
    try {
      const addresses = await getAddresses();
      setAddresses(addresses);
      if (onAddressesFetched) onAddressesFetched(addresses);
    } catch (e) {
      showSnackbar(e);
    }
  }, [setAddresses, onAddressesFetched, showSnackbar]);

  useEffect(() => { fetchAddresses(); }, [fetchAddresses]);

  const closeDeleteModal = useCallback(() => setAddressIdToDelete(null), []);

  const onDeleteKirana = useCallback((address: APIAddress) => async () => {
    try {
      await deleteKiranaFromAddress(address.id);
      await fetchAddresses();
    } catch (e) {
      showSnackbar(e);
    }
  }, [fetchAddresses, showSnackbar]);

  const onDeleteAddress = useCallback(async () => {
    if (addressIdToDelete === null) return;
    try {
      await deleteAddress(addressIdToDelete);
      closeDeleteModal();
      showSnackbar({ message: 'Successfully deleted address', type: 'success' });
      await fetchAddresses();
      if (Number(queryParam('addressId')) === addressIdToDelete) {
        const defaultAddress = await getDefaultAddress();
        if (defaultAddress) replace(`/cart/addresses?addressId=${defaultAddress.id}`);
      }
    } catch (e) {
      showSnackbar(e);
    }
  }, [closeDeleteModal, fetchAddresses, showSnackbar, addressIdToDelete, queryParam, replace]);

  return (
    <div css={styles.root}>
      <div css={styles.addressListCard}>
        <p css={styles.head}>
          <span css={styles.myAddTitle}>My addresses</span>
          <Link css={styles.addAddress} to={`/${pathPrefix}/addresses/add/map`}>
            + Add address
          </Link>
        </p>
        {addresses.length > 0
          ? (
            addresses.map(address => (
              <SingleAddress
                address={address}
                onAddressSelected={onAddressSelected}
                isSelected={isAddressSelected(address)}
                onDeleteKirana={onDeleteKirana(address)}
                onDeleteAddress={setAddressIdToDelete}
                editHref={`/${pathPrefix}/addresses/${address.id}/map`}
                kiranaHref={`/${pathPrefix}/addresses/${address.id}/select-kirana`}
                key={address.id}
              />
            ))
          )
          : <NoAddress />}
        <ConfirmDialog
          open={Boolean(addressIdToDelete)}
          onClose={closeDeleteModal}
          onConfirm={onDeleteAddress}
          text="Do you want to remove this address?"
          title="Delete address"
        />
      </div>
    </div>
  );
};

export default Addresses;
