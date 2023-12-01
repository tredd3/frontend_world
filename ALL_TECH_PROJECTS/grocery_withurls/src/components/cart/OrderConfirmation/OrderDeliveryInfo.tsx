import React, { memo } from 'react';
import { useHistory } from 'react-router-dom';
import { AddressHomeOn, AddressWorkOn, AddressOthersOn } from '../../../assets/images/svg';
import { AddressPivot } from '../../../types';
import OrderInfoLink from './OrderInfoLink';

const getAddressIcon = (type: string) => {
  switch (type) {
    case 'Home':
      return (<AddressHomeOn />);
    case 'Work':
      return (<AddressWorkOn />);
    case 'Others':
      return (<AddressOthersOn />);
    default:
      return (<AddressOthersOn />);
  }
};

const OrderDeliveryInfo = ({
  address: {
    id, addressTag, firstName, lastName, address, addressLine1, addressLine2
  }
}: { address: AddressPivot }) => {
  const history = useHistory();

  return (
    <OrderInfoLink
      onClick={() => history.push(`/cart/addresses?addressId=${id}`)}
      title="Deliver to"
      icon={getAddressIcon(addressTag)}
      contentLine1={`${firstName} ${lastName} ${address}, ${addressLine1}, ${addressLine2}`}
    />
  );
};

export default memo(OrderDeliveryInfo);
