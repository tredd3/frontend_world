import React, { useCallback, useState } from 'react';
import AddressesCore from '../address/Addresses';
import { APIAddress } from '../../types';
import { setDefaultAddress } from '../../services/address';
import ConfirmDialog from '../address/ConfirmDialog';
import useSnackbar from '../../hooks/use-snackbar';

const Addresses: React.FC = () => {
  const [selectedAddressId, setSelectedAddressId] = useState(0);
  const [forceReRenderKey, setForceReRenderKey] = useState(Date.now());
  const showSnackbar = useSnackbar();

  const isAddressSelected = useCallback((address: APIAddress) => address.isDefault, []);

  const makeAddressDefault = useCallback(async () => {
    try {
      await setDefaultAddress(selectedAddressId);
      setSelectedAddressId(0);
      setForceReRenderKey(Date.now()); // Ugly hack, I know. But keeps the rest clean.
      showSnackbar({ message: 'Successfully set a new default address', type: 'success' });
    } catch (e) {
      showSnackbar(e);
    }
  }, [selectedAddressId, setSelectedAddressId, showSnackbar]);

  return (
    <>
      <AddressesCore
        key={forceReRenderKey}
        onAddressSelected={setSelectedAddressId}
        isAddressSelected={isAddressSelected}
        pathPrefix="account"
      />
      <ConfirmDialog
        open={Boolean(selectedAddressId)}
        onClose={() => setSelectedAddressId(0)}
        onConfirm={makeAddressDefault}
        text="Do you want to make this address as your default address?"
        title="Make address default"
      />
    </>
  );
};

export default Addresses;
