import { mocked } from 'ts-jest/utils';
import {
  getCart, getUserIdStoreIdAndCartId, getDeliveryModes,
  deliveryDateByDateId, applyAddressChangeToCart, checkoutWithDeliveryDate
} from '../internal';
import mockDB from '../../../mocks/db.json';
import * as makeApiCall from '../../helpers/make-api-call';
import { apiRoutes } from '../../api-routes';
import { pivotAPIUser, pivotAPIAddress } from '../../helpers/pivots';
import * as user from '../../user';
import * as address from '../../address';

jest.mock('../../user');
jest.mock('../../address');
const { getUser } = mocked(user);
const { getStoreIdFromAddressId, getAddressById } = mocked(address);

describe('cart: internal', () => {
  let makeApiCallSpy: jest.SpyInstance<Promise<unknown>>;

  afterEach(() => {
    getCart.clear();
    getUser.mockClear();
    makeApiCallSpy.mockRestore();
    getDeliveryModes.clear();
    applyAddressChangeToCart.clear();
    checkoutWithDeliveryDate.clear();
  });

  describe('getCart', () => {
    it('should get the cart with the user\'s default store ID', async () => {
      getUser.mockImplementation(async () => pivotAPIUser(mockDB.user.Data));
      makeApiCallSpy = jest
        .spyOn(makeApiCall, 'default')
        .mockImplementation(async () => mockDB.cart.Data);

      const cart = await getCart();
      expect(makeApiCallSpy).toHaveBeenCalledTimes(1);
      expect(makeApiCallSpy.mock.calls[0][0]).toBe(apiRoutes.getCart);
      expect(makeApiCallSpy.mock.calls[0][1]).toEqual({
        body: { userId: (await getUser()).userId },
        headers: { StoreId: '0' }
      });
      expect(cart).toMatchSnapshot();
    });

    it('should get the cart with the user\'s default store ID', async () => {
      getUser.mockImplementation(async () => ({
        ...pivotAPIUser(mockDB.user.Data),
        preferences: { storeId: 123123 }
      }));
      const { userId, preferences: { storeId } } = await getUser();
      makeApiCallSpy = jest
        .spyOn(makeApiCall, 'default')
        .mockImplementation(async () => mockDB.cart.Data);

      await getCart();

      expect(makeApiCallSpy).toHaveBeenCalledTimes(1);
      expect(makeApiCallSpy.mock.calls[0][0]).toBe(apiRoutes.getCart);
      expect(makeApiCallSpy.mock.calls[0][1]).toEqual({
        body: { userId, storeId },
        headers: { StoreId: String(storeId) }
      });
    });

    it('should get the cart with the specified store ID', async () => {
      getUser.mockImplementation(async () => pivotAPIUser(mockDB.user.Data));
      const { userId } = await getUser();
      makeApiCallSpy = jest
        .spyOn(makeApiCall, 'default')
        .mockImplementation(async () => mockDB.cart.Data);

      await getCart(321321);

      expect(makeApiCallSpy).toHaveBeenCalledTimes(1);
      expect(makeApiCallSpy.mock.calls[0][0]).toBe(apiRoutes.getCart);
      expect(makeApiCallSpy.mock.calls[0][1]).toEqual({
        body: { userId, storeId: 321321 },
        headers: { StoreId: '321321' }
      });
    });
  });

  describe('getUserIdStoreIdAndCartId', () => {
    it('should return store ID from user profile when addressId isn\'t passed in', async () => {
      getUser.mockImplementation(async () => ({
        ...pivotAPIUser(mockDB.user.Data),
        preferences: { storeId: 999999 }
      }));
      const { userId } = await getUser();
      makeApiCallSpy = jest
        .spyOn(makeApiCall, 'default')
        .mockImplementation(async () => mockDB.cart.Data);

      const result = await getUserIdStoreIdAndCartId();

      expect(result).toEqual({ userId, storeId: 999999, cartId: mockDB.cart.Data.CartId });
      expect(makeApiCallSpy).toHaveBeenCalledTimes(1);
    });

    it('should return store ID from user addresses when addressId is passed in', async () => {
      getUser.mockImplementation(async () => ({
        ...pivotAPIUser(mockDB.user.Data),
        preferences: { storeId: 999999 }
      }));
      const { userId } = await getUser();
      makeApiCallSpy = jest
        .spyOn(makeApiCall, 'default')
        .mockImplementation(async () => mockDB.cart.Data);
      getStoreIdFromAddressId.mockImplementation(async () => 111111);

      const result = await getUserIdStoreIdAndCartId(123123);

      expect(result).toEqual({ userId, storeId: 111111, cartId: mockDB.cart.Data.CartId });
      expect(makeApiCallSpy).toHaveBeenCalledTimes(1);
    });

    it('should throw when addressId is passed in and there\'s store ID for that address ID', async () => {
      getUser.mockImplementation(async () => ({
        ...pivotAPIUser(mockDB.user.Data),
        preferences: { storeId: 999999 }
      }));
      makeApiCallSpy = jest
        .spyOn(makeApiCall, 'default')
        .mockImplementation(async () => mockDB.cart.Data);
      getStoreIdFromAddressId.mockImplementation(async () => null);
      expect.assertions(1);

      await expect(getUserIdStoreIdAndCartId(123123))
        .rejects
        .toBeInstanceOf(Error);
    });
  });

  describe('getDeliveryModes', () => {
    it('should get the delivery modes for an address ID', async () => {
      getUser.mockImplementation(async () => ({
        ...pivotAPIUser(mockDB.user.Data),
        preferences: { storeId: 999999 }
      }));
      getAddressById.mockImplementation(async () => (
        pivotAPIAddress(mockDB.address.Data.addresses[0] as address.APIAddressRequest)
      ));
      getStoreIdFromAddressId.mockImplementation(async () => 123123);
      makeApiCallSpy = jest
        .spyOn(makeApiCall, 'default')
        .mockImplementationOnce(async () => mockDB.cart.Data)
        .mockImplementationOnce(async () => mockDB.modes.Data);

      const result = await getDeliveryModes(111111);

      expect(makeApiCallSpy.mock.calls[0][0]).toBe(apiRoutes.getCart);
      expect(makeApiCallSpy.mock.calls[0][1].headers).toEqual({ StoreId: '999999' });
      expect(makeApiCallSpy.mock.calls[1][0]).toBe(apiRoutes.getDeliveryModes);
      expect(makeApiCallSpy.mock.calls[1][1]).toEqual({
        body: {
          OrderValue: mockDB.cart.Data.TotalPay,
          Pincode: mockDB.address.Data.addresses[0].pincode,
          StoreId: 123123
        },
        headers: {
          StoreId: '123123'
        }
      });
      expect(result).toMatchSnapshot();
    });
  });

  describe('deliveryDateByDateId', () => {
    it('should return delivery dates for a date id', async () => {
      getUser.mockImplementation(async () => ({
        ...pivotAPIUser(mockDB.user.Data),
        preferences: { storeId: 999999 }
      }));
      getAddressById.mockImplementation(async () => (
        pivotAPIAddress(mockDB.address.Data.addresses[0] as address.APIAddressRequest)
      ));
      getStoreIdFromAddressId.mockImplementation(async () => 123123);
      makeApiCallSpy = jest
        .spyOn(makeApiCall, 'default')
        .mockImplementationOnce(async () => mockDB.cart.Data)
        .mockImplementationOnce(async () => mockDB.modes.Data);

      const result = await deliveryDateByDateId(111111, mockDB.modes.Data.StoreOrder.StorePickup[0].DateId);

      expect(makeApiCallSpy.mock.calls[1][0]).toBe(apiRoutes.getDeliveryModes);
      expect(makeApiCallSpy.mock.calls[1][1].headers).toEqual({ StoreId: '123123' });
      expect(result).toBe(mockDB.modes.Data.StoreOrder.StorePickup[0].DateValue);
    });
  });

  describe('applyAddressChangeToCart', () => {
    it('should throw when address doesn\'t have a store ID', async () => {
      getStoreIdFromAddressId.mockImplementation(async () => null);

      await expect(applyAddressChangeToCart(123123))
        .rejects
        .toBeInstanceOf(Error);
    });

    it('should set the cartHasBeenUpdated flag to false if there\'s no cart change', async () => {
      getUser.mockImplementation(async () => ({
        ...pivotAPIUser(mockDB.user.Data),
        preferences: { storeId: 999999 }
      }));
      getStoreIdFromAddressId.mockImplementation(async () => 123123);
      makeApiCallSpy = jest
        .spyOn(makeApiCall, 'default')
        .mockImplementation(async () => mockDB.cart.Data);

      const result = await applyAddressChangeToCart(999999);
      expect(makeApiCallSpy.mock.calls[0][0]).toBe(apiRoutes.getCart);
      expect(makeApiCallSpy.mock.calls[0][1]).toEqual({
        body: { storeId: 999999, userId: (await getUser()).userId },
        headers: { StoreId: '999999' }
      });
      expect(makeApiCallSpy.mock.calls[1][1]).toEqual({
        body: { storeId: 123123, userId: (await getUser()).userId },
        headers: { StoreId: '123123' }
      });
      expect(result.cartHasBeenUpdated).toBe(false);
      expect(result.oldCart).toEqual(result.newCart);
    });

    it('should set the cartHasBeenUpdated flag to true if there\'s a cart change', async () => {
      getUser.mockImplementation(async () => ({
        ...pivotAPIUser(mockDB.user.Data),
        preferences: { storeId: 999999 }
      }));
      getStoreIdFromAddressId.mockImplementation(async () => 123123);
      makeApiCallSpy = jest
        .spyOn(makeApiCall, 'default')
        .mockImplementationOnce(async () => mockDB.cart.Data)
        .mockImplementationOnce(async () => ({
          ...mockDB.cart.Data,
          TotalPay: mockDB.cart.Data.TotalPay + 10
        }));

      const result = await applyAddressChangeToCart(999999);

      expect(makeApiCallSpy.mock.calls[0][0]).toBe(apiRoutes.getCart);
      expect(makeApiCallSpy.mock.calls[0][1]).toEqual({
        body: { storeId: 999999, userId: (await getUser()).userId },
        headers: { StoreId: '999999' }
      });
      expect(makeApiCallSpy.mock.calls[1][1]).toEqual({
        body: { storeId: 123123, userId: (await getUser()).userId },
        headers: { StoreId: '123123' }
      });
      expect(result.cartHasBeenUpdated).toBe(true);
      expect(
        result.newCart.totalPayableAmount - result.oldCart.totalPayableAmount
      ).toEqual(10);
    });
  });

  describe('checkoutWithDeliveryDate', () => {
    it('should throw if it couldn\'t find a matching address', async () => {
      getUser.mockImplementation(async () => pivotAPIUser(mockDB.user.Data));
      getStoreIdFromAddressId.mockImplementation(async () => 111111); // Doesn't matter
      getAddressById.mockImplementation(async () => undefined);
      makeApiCallSpy = jest
        .spyOn(makeApiCall, 'default')
        .mockImplementation(async () => mockDB.cart.Data);

      await expect(checkoutWithDeliveryDate(123123, 1))
        .rejects
        .toBeInstanceOf(Error);
    });

    it('should call checkout correctly', async () => {
      getUser.mockImplementation(async () => pivotAPIUser(mockDB.user.Data));
      getStoreIdFromAddressId.mockImplementation(async () => 111111); // Doesn't matter
      getAddressById.mockImplementation(async () => (
        pivotAPIAddress(mockDB.address.Data.addresses[0] as address.APIAddressRequest)
      ));
      makeApiCallSpy = jest
        .spyOn(makeApiCall, 'default')
        .mockImplementationOnce(async () => mockDB.cart.Data)
        .mockImplementationOnce(async () => mockDB.modes.Data)
        .mockImplementationOnce(async () => mockDB.checkout.Data);

      const result = await checkoutWithDeliveryDate(123123, mockDB.modes.Data.StoreOrder.StorePickup[0].DateId);

      const getMockCalls = (path: string) => makeApiCallSpy.mock.calls
        .filter(([p]) => p === path);

      expect(getMockCalls(apiRoutes.getCart).length).toBe(1);
      expect(getMockCalls(apiRoutes.getCart)[0][1].headers).toEqual({ StoreId: '0' });
      expect(getMockCalls(apiRoutes.checkout)).toMatchSnapshot();
      expect(result).toMatchSnapshot();
    });
  });
});
