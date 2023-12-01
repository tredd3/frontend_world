import { mocked } from 'ts-jest/utils';
import mockDB from '../../../mocks/db.json';
import * as internal from '../internal';
import * as user from '../../user';
import * as config from '../../config';
import {
  pivotCartResponse, pivotProduct,
  pivotConfig, pivotShipmentProduct,
  pivotDeliveryMode,
  pivotAPIUser
} from '../../helpers/pivots';
import { APIProduct, APIStorePickup } from '../../../types/api';
import * as makeApiCall from '../../helpers/make-api-call';
import {
  addToCart, moveToSaveForLater, moveToCart,
  removeFromSavedLater, changeQuantity,
  removeFromCart, getDeliveryDates, confirmChangedCart
} from '../pre-checkout';
import { apiRoutes } from '../../api-routes';

jest.mock('../../user');
jest.mock('../internal');
jest.mock('../../config');

const {
  getCart, getUserIdStoreIdAndCartId, clearMemos, clearInternalCart, getDeliveryModes
} = mocked(internal);

const {
  getUser
} = mocked(user);

const { getConfig } = mocked(config);

describe('pre-checkout', () => {
  let makeApiCallSpy: jest.SpyInstance<Promise<unknown>>;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  clearMemos.mockImplementation(() => {});

  afterEach(() => {
    makeApiCallSpy.mockRestore();
  });

  describe('addToCart', () => {
    it.each([undefined, 1])(
      'should add an item to cart if it doesn\'t already exist',
      async arg => {
        getUserIdStoreIdAndCartId.mockImplementation(async () => ({
          userId: 111111, storeId: 222222, cartId: 333333
        }));
        getCart.mockImplementation(async () => pivotCartResponse(mockDB.cart.Data));
        getConfig.mockImplementation(async () => pivotConfig(mockDB.configurations.Data.Configurations));
        makeApiCallSpy = jest.spyOn(makeApiCall, 'default')
          .mockImplementationOnce(async () => mockDB.addItemToCart);

        await addToCart(pivotProduct(mockDB.product.Data.StoreProduct), arg);

        expect(makeApiCallSpy.mock.calls[0][0]).toBe(apiRoutes.addCartItem);
        expect(makeApiCallSpy.mock.calls[0][1]).toMatchSnapshot();
        expect(clearMemos).toHaveBeenCalled();
      }
    );

    it('should increase count if item already exists', async () => {
      getUserIdStoreIdAndCartId.mockImplementation(async () => ({
        userId: 111111, storeId: 222222, cartId: 333333
      }));
      getCart.mockImplementation(async () => pivotCartResponse(mockDB.cart.Data));
      getConfig.mockImplementation(async () => pivotConfig(mockDB.configurations.Data.Configurations));
      makeApiCallSpy = jest.spyOn(makeApiCall, 'default')
        .mockImplementationOnce(async () => mockDB.addItemToCart);

      await addToCart(
        pivotProduct(mockDB.cart.Data.Shipments[0].Product[0] as unknown as APIProduct),
        5
      );

      expect(makeApiCallSpy.mock.calls[0][0]).toBe(apiRoutes.addCartItem);
      expect(makeApiCallSpy.mock.calls[0][1]).toMatchSnapshot();
      expect(clearMemos).toHaveBeenCalled();
    });

    it('shouldn\'t allow adding new items than the max limit from config', async () => {
      getUserIdStoreIdAndCartId.mockImplementation(async () => ({
        userId: 111111, storeId: 222222, cartId: 333333
      }));
      getCart.mockImplementation(async () => pivotCartResponse(mockDB.cart.Data));
      getConfig.mockImplementation(async () => ({
        ...pivotConfig(mockDB.configurations.Data.Configurations),
        maxQuantityLimitPerItem: 5
      }));

      await expect(
        addToCart(pivotProduct(mockDB.product.Data.StoreProduct), 6)
      ).rejects.toBeInstanceOf(Error);
    });

    it('shouldn\'t allow adding to existing items than the max limit from config', async () => {
      getUserIdStoreIdAndCartId.mockImplementation(async () => ({
        userId: 111111, storeId: 222222, cartId: 333333
      }));
      const apiCart = JSON.parse(JSON.stringify(mockDB.cart.Data));
      apiCart.Shipments[0].Product[0].SelectedQuantity = 4;
      getCart.mockImplementation(async () => pivotCartResponse(apiCart));
      getConfig.mockImplementation(async () => ({
        ...pivotConfig(mockDB.configurations.Data.Configurations),
        maxQuantityLimitPerItem: 5
      }));

      await expect(addToCart(
        pivotProduct(mockDB.cart.Data.Shipments[0].Product[0] as unknown as APIProduct),
        2
      )).rejects.toBeInstanceOf(Error);
    });
  });

  describe('moveToSaveForLater', () => {
    it('should make the API call correctly', async () => {
      getUserIdStoreIdAndCartId.mockImplementation(async () => ({
        userId: 111111, storeId: 222222, cartId: 333333
      }));
      makeApiCallSpy = jest.spyOn(makeApiCall, 'default')
        .mockImplementation(async () => mockDB.saveForLater);

      await moveToSaveForLater(
        pivotShipmentProduct(mockDB.cart.Data.Shipments[0].Product[0])
      );

      expect(makeApiCallSpy.mock.calls[0][0]).toBe(apiRoutes.moveCartItem);
      expect(makeApiCallSpy.mock.calls[0][1]).toMatchSnapshot();
      expect(clearMemos).toHaveBeenCalled();
    });
  });

  describe('moveToCart', () => {
    it('should make the API call correctly', async () => {
      getUserIdStoreIdAndCartId.mockImplementation(async () => ({
        userId: 111111, storeId: 222222, cartId: 333333
      }));
      makeApiCallSpy = jest.spyOn(makeApiCall, 'default')
        .mockImplementation(async () => null);

      await moveToCart(
        pivotShipmentProduct(mockDB.cart.Data.Shipments[0].Product[0])
      );

      expect(makeApiCallSpy.mock.calls[0][0]).toBe(apiRoutes.moveCartItem);
      expect(makeApiCallSpy.mock.calls[0][1]).toMatchSnapshot();
      expect(clearMemos).toHaveBeenCalled();
    });
  });

  describe('removeFromSavedLater', () => {
    it('should make the API call correctly', async () => {
      clearInternalCart.mockImplementation(() => null);
      makeApiCallSpy = jest.spyOn(makeApiCall, 'default')
        .mockImplementation(async () => null);

      await removeFromSavedLater(
        pivotShipmentProduct(mockDB.cart.Data.Shipments[0].Product[0])
      );

      expect(makeApiCallSpy.mock.calls[0][0]).toBe(apiRoutes.removeCartSavedItem);
      expect(makeApiCallSpy.mock.calls[0][1]).toMatchSnapshot();
      expect(clearInternalCart).toHaveBeenCalled();
    });
  });

  describe('changeQuantity', () => {
    it('should change the quantity in cart as per the request', async () => {
      getUserIdStoreIdAndCartId.mockImplementation(async () => ({
        userId: 111111, storeId: 222222, cartId: 333333
      }));
      getConfig.mockImplementation(async () => pivotConfig(mockDB.configurations.Data.Configurations));
      makeApiCallSpy = jest.spyOn(makeApiCall, 'default')
        .mockImplementationOnce(async () => null);

      await changeQuantity(pivotShipmentProduct(mockDB.cart.Data.Shipments[0].Product[0]), 1);

      expect(makeApiCallSpy.mock.calls[0][0]).toBe(apiRoutes.addCartItem);
      expect(makeApiCallSpy.mock.calls[0][1]).toMatchSnapshot();
      expect(clearMemos).toHaveBeenCalled();
    });
  });

  it('should throw error if quantity is less than 1', async () => {
    getUserIdStoreIdAndCartId.mockImplementation(async () => ({
      userId: 111111, storeId: 222222, cartId: 333333
    }));
    getConfig.mockImplementation(async () => pivotConfig(mockDB.configurations.Data.Configurations));

    await expect(
      changeQuantity(pivotShipmentProduct(mockDB.cart.Data.Shipments[0].Product[0]), 0)
    ).rejects.toBeInstanceOf(Error);
  });

  it('should throw error if quantity is greater than max limit in config', async () => {
    getUserIdStoreIdAndCartId.mockImplementation(async () => ({
      userId: 111111, storeId: 222222, cartId: 333333
    }));
    getConfig.mockImplementation(async () => ({
      ...pivotConfig(mockDB.configurations.Data.Configurations),
      maxQuantityLimitPerItem: 5
    }));

    await expect(
      changeQuantity(pivotShipmentProduct(mockDB.cart.Data.Shipments[0].Product[0]), 6)
    ).rejects.toBeInstanceOf(Error);
  });

  describe('removeFromCart', () => {
    it('should make the API call correctly', async () => {
      getUserIdStoreIdAndCartId.mockImplementation(async () => ({
        userId: 111111, storeId: 222222, cartId: 333333
      }));
      makeApiCallSpy = jest.spyOn(makeApiCall, 'default')
        .mockImplementation(async () => mockDB.saveForLater);
      await removeFromCart(
        pivotShipmentProduct(mockDB.cart.Data.Shipments[0].Product[0])
      );

      expect(makeApiCallSpy.mock.calls[0][0]).toBe(apiRoutes.removeCartItem);
      expect(makeApiCallSpy.mock.calls[0][1]).toMatchSnapshot();
    });
  });

  describe('getDeliveryDates', () => {
    const addressId = 10160580;
    it('should return null if delivery modes not found', async () => {
      getDeliveryModes.mockImplementation(async () => []);
      const data = await getDeliveryDates(addressId);
      expect(data).toEqual([]);
      expect(getDeliveryModes).toHaveBeenCalledWith(addressId);
    });

    it('should return modes transformed as per the mapping function', async () => {
      getDeliveryModes.mockImplementation(
        async () => (mockDB.modes.Data.StoreOrder.StorePickup as APIStorePickup[]).map(pivotDeliveryMode)
      );
      const apiResp = await getDeliveryDates(addressId);
      expect(getDeliveryModes).toHaveBeenCalledWith(addressId);
      expect(apiResp).toMatchSnapshot();
    });
  });

  describe('confirmChangedCart', () => {
    it('should make the API call correctly', async () => {
      getUser.mockImplementation(async () => pivotAPIUser(mockDB.user.Data));

      makeApiCallSpy = jest.spyOn(makeApiCall, 'default')
        .mockImplementation(async () => mockDB.cart);

      await confirmChangedCart();
      expect(makeApiCallSpy.mock.calls[0][0]).toBe(apiRoutes.getCart);
      expect(makeApiCallSpy.mock.calls[0][1]).toMatchSnapshot();
    });
  });
});
