import mockDB from '../../mocks/db.json';
import * as UserService from '../user';
import * as makeApiCall from '../helpers/make-api-call';
import { apiRoutes } from '../api-routes';
import {
  getAddresses, addAddress, isAreaServiceable, updateAddress, deleteAddress, getDefaultAddress, getAddressById,
  updateAddressWithKirana, deleteKiranaFromAddress
} from '../address';

const { getUser } = UserService;

jest.mock('../../intents', () => ({
  getTokens: () => ({
    apiKey: 'dummy-api-key',
    accessToken: 'dummy-access-token'
  })
}));

describe('address service mocked tests', () => {
  let makeApiCallSpy;
  let getUserSpy;

  beforeAll(() => {
    getUserSpy = jest.spyOn(UserService, 'getUser').mockImplementation(async () => mockDB.user.Data);
    makeApiCallSpy = jest.spyOn(makeApiCall, 'default').mockImplementation(async () => mockDB.saveUserAddress.Data);
  });

  beforeEach(fetch.resetMocks);

  it('addAddress should prepare `address` string field and add it while making API request', async () => {
    fetch.mockResponseOnce(JSON.stringify(mockDB.user));
    fetch.mockResponseOnce(JSON.stringify(mockDB.saveUserAddress));

    const mockedAddress = mockDB.saveUserAddress.Data;
    const addressPayload = { ...mockedAddress };
    delete addressPayload.address;

    await addAddress({
      ...addressPayload,
      lat: mockDB.saveUserAddress.Data.latitude,
      lng: mockDB.saveUserAddress.Data.longitude
    });

    expect(makeApiCallSpy).toHaveBeenLastCalledWith(
      apiRoutes.saveAddress,
      { body: expect.objectContaining({ address: `${mockedAddress.cityName}, ${mockedAddress.pincode}` }) }
    );
  });

  it('updateAddress should prepare `address` string field and add it while making API request', async () => {
    fetch.mockResponseOnce(JSON.stringify(mockDB.user));
    fetch.mockResponseOnce(JSON.stringify(mockDB.saveUserAddress));

    const mockedAddress = mockDB.saveUserAddress.Data;
    const addressPayload = { ...mockedAddress };
    delete addressPayload.address;

    await updateAddress({
      ...addressPayload,
      lat: mockDB.saveUserAddress.Data.latitude,
      lng: mockDB.saveUserAddress.Data.longitude,
      id: '123'
    });

    expect(makeApiCallSpy).toHaveBeenLastCalledWith(
      apiRoutes.saveAddress,
      { body: expect.objectContaining({ address: `${mockedAddress.cityName}, ${mockedAddress.pincode}` }) }
    );
  });

  afterAll(() => {
    makeApiCallSpy.mockRestore();
    getUserSpy.mockRestore();
  });
});

describe('update address with kirana and delete kirana from address tests', () => {
  let updateUserSpy;

  beforeAll(() => {
    updateUserSpy = jest.spyOn(UserService, 'updateUser').mockImplementation(async () => mockDB.user.Data);
  });

  beforeEach(() => {
    getUser.clear();
    getAddresses.clear();
    fetch.resetMocks();
    updateUserSpy.mockClear();
  });

  it('should update user on adding kirana to default address', async () => {
    const mockAddresses = JSON.parse(JSON.stringify(mockDB.address));
    mockAddresses.Data.addresses[0].isDefault = true;

    fetch.mockResponseOnce(JSON.stringify(mockDB.user));
    fetch.mockResponseOnce(JSON.stringify(mockAddresses));
    fetch.mockResponseOnce(JSON.stringify({
      Control: { Status: 1 },
      Data: mockAddresses.Data.addresses[0]
    }));

    await updateAddressWithKirana(mockAddresses.Data.addresses[0].addressId, { storeId: 1234, storeName: 'test store' });
    expect(updateUserSpy).toHaveBeenLastCalledWith({
      storeId: 1234,
      storeName: 'test store'
    });
  });

  it('should skip updating user on adding kirana to non-default address', async () => {
    const mockAddresses = JSON.parse(JSON.stringify(mockDB.address));
    mockAddresses.Data.addresses[0].isDefault = false;

    fetch.mockResponseOnce(JSON.stringify(mockDB.user));
    fetch.mockResponseOnce(JSON.stringify(mockAddresses));
    fetch.mockResponseOnce(JSON.stringify({
      Control: { Status: 1 },
      Data: mockAddresses.Data.addresses[0]
    }));

    await updateAddressWithKirana(mockAddresses.Data.addresses[0].addressId, { storeId: 1234, storeName: 'test store' });
    expect(updateUserSpy).not.toHaveBeenCalled();
  });

  it('should update user on deleting kirana from default address', async () => {
    const mockAddresses = JSON.parse(JSON.stringify(mockDB.address));
    mockAddresses.Data.addresses[0].isDefault = true;

    fetch.mockResponseOnce(JSON.stringify(mockDB.user));
    fetch.mockResponseOnce(JSON.stringify(mockAddresses));
    fetch.mockResponseOnce(JSON.stringify({
      Control: { Status: 1 },
      Data: mockAddresses.Data.addresses[0]
    }));

    await deleteKiranaFromAddress(mockAddresses.Data.addresses[0].addressId);
    expect(updateUserSpy).toHaveBeenLastCalledWith({
      storeId: 0,
      storeName: ''
    });
  });

  it('should skip updating user on deleting kirana from address which is not default', async () => {
    const mockAddresses = JSON.parse(JSON.stringify(mockDB.address));
    mockAddresses.Data.addresses[0].isDefault = false;

    fetch.mockResponseOnce(JSON.stringify(mockDB.user));
    fetch.mockResponseOnce(JSON.stringify(mockAddresses));
    fetch.mockResponseOnce(JSON.stringify({
      Control: { Status: 1 },
      Data: mockAddresses.Data.addresses[0]
    }));

    await deleteKiranaFromAddress(mockAddresses.Data.addresses[0].addressId);
    expect(updateUserSpy).not.toHaveBeenCalled();
  });

  afterAll(() => {
    updateUserSpy.mockRestore();
  });
});

describe('address service', () => {
  beforeEach(fetch.resetMocks);
  afterEach(getUser.clear);

  it('checkServiceablity should return true when we get a valid response', async () => {
    fetch.mockResponseOnce(JSON.stringify(mockDB.isPincodeServiceable));
    isAreaServiceable.clear();

    const isServiceable = await isAreaServiceable({ pincode: 400701 });
    expect(isServiceable).toBe(true);
  });

  it('checkServiceablity should return false when we get an error response', async () => {
    fetch.mockResponseOnce(JSON.stringify({
      Control: {
        Message: 'Currently service not available in your pincode 560103. Try a different location',
        MessageCode: 200,
        Status: 0
      }
    }));
    isAreaServiceable.clear();

    const isServiceable = await isAreaServiceable({ pincode: 400412 });
    expect(isServiceable).toBe(false);
  });

  it('getAddresses should give back correct response', async () => {
    fetch.mockResponseOnce(JSON.stringify(mockDB.user));
    fetch.mockResponseOnce(JSON.stringify(mockDB.address));
    const addresses = await getAddresses();
    expect(addresses).toMatchSnapshot();
  });

  it('getDefaultAddress should return the default response', async () => {
    fetch.mockResponseOnce(JSON.stringify(mockDB.user));
    fetch.mockResponseOnce(JSON.stringify(mockDB.address));
    const defaultAddress = await getDefaultAddress();
    expect(defaultAddress.id).toBe(10160497);
  });

  it('getAddressById should return the correct address', async () => {
    fetch.mockResponseOnce(JSON.stringify(mockDB.user));
    fetch.mockResponseOnce(JSON.stringify(mockDB.address));
    const address = await getAddressById(mockDB.address.Data.addresses[0].addressId);
    expect(address.id).toBe(mockDB.address.Data.addresses[0].addressId);
  });

  it('addAddress should give back correct response', async () => {
    fetch.mockResponseOnce(JSON.stringify(mockDB.user));
    fetch.mockResponseOnce(JSON.stringify(mockDB.saveUserAddress));
    const newAddress = await addAddress({
      ...mockDB.saveUserAddress.Data,
      lat: mockDB.saveUserAddress.Data.latitude,
      lng: mockDB.saveUserAddress.Data.longitude
    });
    expect(newAddress).toMatchSnapshot();
  });

  it('updateAddress should give back the correct response', async () => {
    fetch.mockResponseOnce(JSON.stringify(mockDB.user));
    fetch.mockResponseOnce(JSON.stringify(mockDB.saveUserAddress));
    const updatedAddress = await updateAddress({
      ...mockDB.saveUserAddress.Data,
      lat: mockDB.saveUserAddress.Data.latitude,
      lng: mockDB.saveUserAddress.Data.longitude,
      id: '123'
    });
    expect(updatedAddress).toMatchSnapshot();
  });

  it('deleteAddress should give back the correct response', async () => {
    fetch.mockResponseOnce(JSON.stringify(mockDB.user));
    fetch.mockResponseOnce(JSON.stringify(mockDB.removeUserAddress));
    await deleteAddress('123');
    expect(JSON.parse(fetch.mock.calls[0][1].body).Request.Body).toHaveProperty('addressId');
  });
});
