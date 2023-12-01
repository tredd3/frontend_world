/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import useQueryParams from '../../hooks/use-query-params';
import AddressesCore from '../address/Addresses';
import { APIAddress } from '../../types';
import { getDefaultAddress, getAddressById } from '../../services/address';
import Button from '../uiControls/button';
import useSnackbar from '../../hooks/use-snackbar';
import SelectKiranaDrawer from '../address/SelectKiranaDrawer';
import useBoolean from '../../hooks/use-boolean';
import { trackShipments } from '../../helpers/analytics';
import { doesAddressChangeCart } from '../../services/cart';

const footer = css`
  display: block;
  padding: 0;
  background: #fff;
  margin-right: -15px;
  position: fixed;
  width: 100%;
  bottom: 0;
  z-index: 10;
`;

const Addresses: React.FC = () => {
  const { push, replace } = useHistory();
  const showSnackbar = useSnackbar();
  const [isDrawerOpen, openDrawer, closeDrawer] = useBoolean(false);
  const queryParam = useQueryParams();
  const addressId = Number(queryParam('addressId'));

  const onAddressSelected = useCallback((addressId: number) => {
    replace(`/cart/addresses?addressId=${addressId}`);
  }, [replace]);

  const onAddressFetched = useCallback(async () => {
    if (addressId) return;

    const defaultAddress = await getDefaultAddress();
    if (defaultAddress) replace(`/cart/addresses?addressId=${defaultAddress.id}`);
  }, [addressId, replace]);

  const isAddressSelected = useCallback((address: APIAddress) => {
    if (!addressId) return false;
    return addressId === address.id;
  }, [addressId]);

  const onDeliverToAddressClick = useCallback(async () => {
    const selectedAddress = await getAddressById(addressId);

    trackShipments('confirmDeliveryAddress');

    if (!selectedAddress || !selectedAddress.storeId) {
      openDrawer();
      return;
    }

    if (await doesAddressChangeCart(selectedAddress.id)) {
      push(`/cart/addresses/${addressId}/update`);
    } else {
      push(`/cart/addresses/${addressId}/delivery-options`);
    }
  }, [push, openDrawer, addressId]);

  const onSkipClick = useCallback(async () => {
    const address = await getAddressById(addressId);
    if (address && !address.storeId && !address.defaultStore) {
      closeDrawer();
      showSnackbar({ message: 'Please select kirana partner!', type: 'info' });
    } else {
      push(`/cart/addresses/${addressId}/delivery-options`);
    }
  }, [showSnackbar, push, addressId, closeDrawer]);

  const goToSelectKirana = useCallback(() => {
    replace(`/cart/addresses/${addressId}/select-kirana`);
  }, [replace, addressId]);

  return (
    <React.Fragment>
      <AddressesCore
        onAddressSelected={onAddressSelected}
        isAddressSelected={isAddressSelected}
        onAddressesFetched={onAddressFetched}
        pathPrefix="cart"
      />
      {addressId
        ? (
          <div css={footer}>
            <div css={css`padding: 10px;`}>
              <Button
                text="Deliver to this address"
                type="solidTulip"
                onClick={onDeliverToAddressClick}
                disable={false}
              />
            </div>
          </div>
        )
        : null}
      <SelectKiranaDrawer
        open={isDrawerOpen}
        onClose={closeDrawer}
        onOpen={openDrawer}
        goToSelectKirana={goToSelectKirana}
        skipKirana={onSkipClick}
      />
    </React.Fragment>
  );
};

export default Addresses;

