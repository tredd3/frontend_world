import { createSelector } from 'reselect';

export const addresses = state => state.userAddress.addresses || [];
export const addressById = id => createSelector(
  addresses, addresses => addresses.find(({ addressId }) => Number(id) === addressId)
);
export const defaultAddress = createSelector(
  addresses, addresses => addresses.find(({ isDefault }) => isDefault)
);
