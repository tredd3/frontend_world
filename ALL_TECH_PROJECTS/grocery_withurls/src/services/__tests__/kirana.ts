import { mocked } from 'ts-jest/utils';
import mockDB from '../../mocks/db.json';
import * as address from '../address';
import * as user from '../user';
import * as makeApiCall from '../helpers/make-api-call';
import { internalGetKiranaPage, getPaginatedKiranas } from '../kirana';
import { pivotAPIUser } from '../helpers/pivots';
import { APIAddress } from '../../types';

jest.mock('../address');
jest.mock('../user');

const { getUser } = mocked(user);
const { getAddressById, getDefaultAddress } = mocked(address);

describe('kiranas', () => {
  let makeApiCallSpy: jest.SpyInstance<Promise<unknown>>;

  afterEach(() => {
    makeApiCallSpy.mockRestore();
    getUser.mockReset();
    getAddressById.mockReset();
    getDefaultAddress.mockReset();
  });

  describe('internalGetKiranas', () => {
    it('should get kiranas without an address ID', async () => {
      getDefaultAddress.mockImplementation(
        async () => mockDB.address.Data.addresses[0] as unknown as APIAddress
      );
      getUser.mockImplementation(async () => pivotAPIUser(mockDB.user.Data));

      makeApiCallSpy = jest.spyOn(makeApiCall, 'default')
        .mockImplementationOnce(async () => mockDB.stores.Data);

      const results = await internalGetKiranaPage(0, { sort: 'closest-first' });

      expect(makeApiCallSpy.mock.calls[0]).toMatchSnapshot();
      expect(results!.nextPage).toBe(1);
      expect(results!.data).toMatchSnapshot();
      expect(getDefaultAddress).toHaveBeenCalledTimes(1);
      expect(getAddressById).not.toHaveBeenCalled();
    });

    it('should get kiranas with an address ID', async () => {
      getAddressById.mockImplementation(
        async () => mockDB.address.Data.addresses[0] as unknown as APIAddress
      );
      getUser.mockImplementation(async () => pivotAPIUser(mockDB.user.Data));

      makeApiCallSpy = jest.spyOn(makeApiCall, 'default')
        .mockImplementationOnce(async () => mockDB.stores.Data);

      const results = await internalGetKiranaPage(0, { addressId: 123123, sort: 'closest-first' });

      expect(makeApiCallSpy.mock.calls[0]).toMatchSnapshot();
      expect(results!.nextPage).toBe(1);
      expect(results!.data).toMatchSnapshot();
      expect(getAddressById).toHaveBeenCalledWith(123123);
      expect(getDefaultAddress).not.toHaveBeenCalled();
    });
  });

  describe('getPaginatedKiranas', () => {
    it('should give a paginated response', async () => {
      getDefaultAddress.mockImplementation(
        async () => mockDB.address.Data.addresses[0] as unknown as APIAddress
      );
      getUser.mockImplementation(async () => pivotAPIUser(mockDB.user.Data));

      const secondPage = { ...mockDB.stores.Data };
      delete secondPage.NextPage;

      makeApiCallSpy = jest.spyOn(makeApiCall, 'default')
        .mockImplementationOnce(async () => mockDB.stores.Data)
        .mockImplementationOnce(async () => secondPage);

      const page1 = await getPaginatedKiranas({ sort: 'closest-first' });

      expect(page1.loadNextPage).toBeInstanceOf(Function);
      expect(page1.data).toMatchSnapshot();

      const page2 = await page1.loadNextPage!();

      expect(page2.loadNextPage).toBe(null);
      expect(page2.data!.kiranas.length).toBeGreaterThan(page1.data!.kiranas.length);
    });
  });
});
