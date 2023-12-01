import mockDB from '../../mocks/db.json';
import * as UserService from '../user';
import { getKiranas } from '../kirana';
import * as addressService from '../address';
import * as makeApiCall from '../helpers/make-api-call';
import { pivotAPIUser } from '../helpers/pivots';

jest.mock('../../intents', () => ({
  getTokens: () => ({
    apiKey: 'dummy-api-key',
    accessToken: 'dummy-access-token'
  })
}));

describe('kirana', () => {
  describe('getKiranas service method tests', () => {
    beforeEach(fetch.resetMocks);
    afterEach(() => {
      UserService.getUser.clear();
      addressService.getAddresses.clear();
    });

    it('should get a list of kiranas without any args', async () => {
      fetch.mockResponseOnce(JSON.stringify(mockDB.user));
      fetch.mockResponseOnce(JSON.stringify(mockDB.address));
      fetch.mockResponseOnce(JSON.stringify(mockDB.stores));

      const kiranaInfo = await getKiranas();
      expect(JSON.parse(fetch.mock.calls[2][1].body).Data.Request.Body.CustomerId).toBe(mockDB.user.Data.userId);
      expect(JSON.parse(fetch.mock.calls[2][1].body).Data.Request.Body).toMatchSnapshot();
      expect(kiranaInfo).toMatchSnapshot();
    });

    it('should get a list of kiranas when an addressId is provided', async () => {
      fetch.mockResponseOnce(JSON.stringify(mockDB.user));
      fetch.mockResponseOnce(JSON.stringify(mockDB.address));
      fetch.mockResponseOnce(JSON.stringify(mockDB.stores));

      const address = mockDB.address.Data.addresses[0];
      const kiranaInfo = await getKiranas({ addressId: address.addressId });
      expect(JSON.parse(fetch.mock.calls[2][1].body).Data.Request.Body.Pincode).toBe(address.pincode);
      expect(JSON.parse(fetch.mock.calls[2][1].body).Data.Request.Body).toMatchSnapshot();
      expect(kiranaInfo).toMatchSnapshot();
    });

    it('should send the sort key when provided', async () => {
      fetch.mockResponseOnce(JSON.stringify(mockDB.user));
      fetch.mockResponseOnce(JSON.stringify(mockDB.address));
      fetch.mockResponseOnce(JSON.stringify(mockDB.stores));

      const kiranaInfo = await getKiranas({ sort: 'alphabetical' });
      expect(JSON.parse(fetch.mock.calls[2][1].body).Data.Request.Body.FilterType).toBe(3);
      expect(JSON.parse(fetch.mock.calls[2][1].body).Data.Request.Body).toMatchSnapshot();
      expect(kiranaInfo).toMatchSnapshot();
    });

    it('should send the page number when provided', async () => {
      fetch.mockResponseOnce(JSON.stringify(mockDB.user));
      fetch.mockResponseOnce(JSON.stringify(mockDB.address));
      fetch.mockResponseOnce(JSON.stringify(mockDB.stores));

      const kiranaInfo = await getKiranas({ page: 2 });
      expect(JSON.parse(fetch.mock.calls[2][1].body).Data.Request.Body.PageNo).toBe(2);
      expect(JSON.parse(fetch.mock.calls[2][1].body).Data.Request.Body).toMatchSnapshot();
      expect(kiranaInfo).toMatchSnapshot();
    });
  });

  describe('kirana service tests for underlying APIs', () => {
    let makeApiCallSpy;
    let getAddressByIdSpy;
    let getDefaultAddressSpy;

    beforeAll(() => {
      makeApiCallSpy = jest.spyOn(makeApiCall, 'default').mockImplementation(async () => mockDB.stores.Data);
      jest.spyOn(UserService, 'getUser').mockImplementation(async () => pivotAPIUser(mockDB.user.Data));
      getAddressByIdSpy = jest.spyOn(addressService, 'getAddressById').mockImplementation(async () => mockDB.address.Data);
      getDefaultAddressSpy = jest.spyOn(addressService, 'getDefaultAddress').mockImplementation(async () => mockDB.address.Data);
    });

    afterAll(() => {
      makeApiCallSpy.mockRestore();
      getAddressByIdSpy.mockRestore();
      getDefaultAddressSpy.mockRestore();
    });

    afterEach(() => {
      makeApiCallSpy.mockClear();
      getAddressByIdSpy.mockClear();
      getDefaultAddressSpy.mockClear();
    });

    it('should call underlying API methods correctly when address id is passed', async () => {
      const addressId = 'test_address_id';
      await getKiranas({ addressId });
      expect(getAddressByIdSpy).toHaveBeenCalledTimes(1);
      expect(getDefaultAddressSpy).not.toHaveBeenCalled();
      expect(makeApiCallSpy).toHaveBeenCalledTimes(1);
    });

    it('should call underlying API methods correctly when address id is not passed by picking default address', async () => {
      await getKiranas({});
      expect(getAddressByIdSpy).not.toHaveBeenCalled();
      expect(getDefaultAddressSpy).toHaveBeenCalledTimes(1);
      expect(makeApiCallSpy).toHaveBeenCalledTimes(1);
    });

    it('should not memoize the getKiranas call', async () => {
      const addressId = 'test_address_id';
      await getKiranas({ addressId });
      await getKiranas({ addressId });

      expect(makeApiCallSpy).toHaveBeenCalledTimes(2);

      await getKiranas();
      await getKiranas();
      expect(makeApiCallSpy).toHaveBeenCalledTimes(4);
    });
  });
});
