import promiseMemoize from 'promise-memoize';
import makeApiCall from './helpers/make-api-call';
import { apiRoutes } from './api-routes';
import { getUser, updateUser } from './user';
import { APIBaseAddress, APIAddress, AddressPivot } from '../types';
import { pivotAPIAddress } from './helpers/pivots';

export type APIAddressRequest = APIBaseAddress & {
  addressId: number;
  addedDate: string;
};

// eslint-disable-next-line camelcase, @typescript-eslint/camelcase
export const DEPRECATED_convertAddressToAPIAddress = ({ id, addedDate, ...address }: APIAddress): APIAddressRequest => (
  { addressId: id, addedDate: addedDate.toDateString(), ...address }
);

type AreaType = { pincode: number};
export const isAreaServiceable = promiseMemoize(async ({ pincode }: AreaType) => {
  try {
    await makeApiCall<AreaType, {}>(apiRoutes.checkServiceability, { body: { pincode } });
    return true;
  } catch (e) {
    return false;
  }
}, { resolve: 'json' });

export const getAddresses = promiseMemoize(async (): Promise<AddressPivot[]> => {
  const { userId } = await getUser();
  const { addresses } = await makeApiCall<{ userId: number }, {addresses: APIAddressRequest[]}>(apiRoutes.getAddress, { body: { userId } });
  return addresses.map(pivotAPIAddress);
});

export const getAddressById = async (id: number): Promise<AddressPivot | undefined> => {
  const addresses = (await getAddresses()) || [];
  return addresses.find(address => address.id === id);
};

type UpdateAddressRequest = (APIAddressRequest | APIBaseAddress) & { userId?: number };

export const updateAddress = async (address: Omit<APIBaseAddress, 'address'> | APIAddress): Promise<APIAddress> => {
  const { id } = address as APIAddress;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { addedDate, ...remainingAddress } = address as APIAddress;
  const newAddress = await makeApiCall<UpdateAddressRequest, APIAddressRequest>(apiRoutes.saveAddress, {
    body: {
      ...(id && { addressId: id }),
      ...({ userId: (await getUser()).userId }),
      ...remainingAddress,
      address: `${remainingAddress.cityName}, ${remainingAddress.pincode}`
    }
  });

  getAddresses.clear();
  return pivotAPIAddress(newAddress);
};

export const addAddress = (address: Omit<APIBaseAddress, 'address'>) => updateAddress(address);

export const deleteAddress = async (id: number) => {
  getAddresses.clear();
  return makeApiCall<{ addressId: number }, void>(
    apiRoutes.deleteAddress, { body: { addressId: id } }
  );
};

export const setDefaultAddress = async (id: number) => {
  const address = await getAddressById(id);
  if (!address) throw new Error('An address with this id doesn\'t exist');

  await makeApiCall<{ addressId: number; isDefault: boolean }, APIAddressRequest>(apiRoutes.saveAddress, {
    body: {
      addressId: id,
      isDefault: true
    }
  });
  getAddresses.clear();

  await updateUser({
    lat: address.latitude,
    lng: address.longitude,
    pincode: address.pincode,
    storeId: address.storeId,
    storeName: address.storeName
  });

  return address;
};

export const getDefaultAddress = async () => {
  const addresses = await getAddresses();
  const defaultAddress = addresses.find(address => address.isDefault);
  if (defaultAddress) return defaultAddress;

  if (!addresses.length) return null;

  await setDefaultAddress(addresses[0].id);
  return addresses[0];
};

export const updateAddressWithKirana = async (addressId: number, { storeId, storeName }: { storeId: number; storeName: string }) => {
  const address = await getAddressById(addressId);

  if (!address) throw new Error('Couldn\'t find an address with this id');

  const updatedAddress = await updateAddress({ ...address, storeId, storeName });

  if (address.isDefault) {
    await updateUser({ storeId, storeName });
  }

  return updatedAddress;
};

export const deleteKiranaFromAddress = async (addressId: number) => updateAddressWithKirana(addressId, { storeId: 0, storeName: '' });

export const getStoreIdFromAddressId = async (addressId: number) => {
  const address = await getAddressById(addressId);

  if (!address) return null;

  return address.storeId || address.defaultStore || null;
};

export const getPincodeFromLatLng = async ({ lat, lng }: {lat: number; lng: number}): Promise<string> => {
  const geocoder = new window.google.maps.Geocoder();
  const pincode = new Promise<string>((resolve, reject) => {
    geocoder.geocode({ location: new window.google.maps.LatLng(lat, lng) }, (results, status) => {
      if (status === window.google.maps.GeocoderStatus.OK) {
        const len = results[0].address_components.length;
        resolve(results[0].address_components[len - 1].long_name);
      } else {
        reject();
      }
    });
  });
  return pincode;
};
