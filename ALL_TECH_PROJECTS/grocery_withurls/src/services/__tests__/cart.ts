import { getCart } from '../cart';
import * as makeApiCall from '../helpers/make-api-call';
import { apiRoutes } from '../api-routes';
import mockDB from '../../mocks/db.json';
import * as UserService from '../user';
import { pivotAPIUser } from '../helpers/pivots';
import { APIUser } from '../../types';

const mockUserWithPreferredStore = {
  customerName: 'Anurag Grover',
  status: 1,
  registrationDate: 1582185826567,
  addedDate: 1582185826567,
  lastUpdatedDate: 1585829941243,
  dob: '2007-07-30',
  gender: 1,
  firstName: 'Anurag',
  lastName: 'Grover',
  // eslint-disable-next-line max-len
  deviceId: 'ZDFLRFItWHJuVjg6QVBBOTFiSEZnSTU2RWRNem93UFotUU5sWGxfcm9VeXpTZFFCeGR1cVMxTlU4\nbkFaNVJQNzR4THk0ZnRSU2M0OHdBbU9lUU1saVcxRnRnTk1GRXl3dVotdVNoMGlSU1NmYmVwMGRr\neDE2N1h6Sm1keVRRTFlFRzhrZ1VPaHJFT1BsZjlUSG1JWDVKR20=\n',
  deviceType: 'ANDROID',
  preferences: {
    latitude: 19.05516658822881,
    longitude: 73.06983741392456,
    storeId: 1005474,
    pincode: 410210,
    storeName: 'Shobhana Stores',
    city: 'Navi Mumbai'
  },
  userId: 10041542,
  emailId: 'abc@gmail.com',
  mobileNumber: 9971597788
} as APIUser;

jest.mock('../../intents', () => ({
  getTokens: () => ({
    apiKey: 'dummy-api-key',
    accessToken: 'dummy-access-token'
  })
}));

describe('cart service tests for user with no selected store in preferences', () => {
  let makeApiCallSpy: jest.SpyInstance<Promise<unknown>>;
  let getUserSpy: jest.SpyInstance<Promise<unknown>>;

  beforeAll(() => {
    getUserSpy = jest.spyOn(UserService, 'getUser').mockImplementation(async () => pivotAPIUser(mockDB.user.Data));
    makeApiCallSpy = jest.spyOn(makeApiCall, 'default').mockImplementation(async () => mockDB.cart.Data);
  });

  beforeEach(() => {
    makeApiCallSpy.mockClear();
    // getCart.clear();
  });

  afterAll(() => {
    makeApiCallSpy.mockRestore();
    getUserSpy.mockRestore();
  });

  test('getCart for user with no default store', async () => {
    const cartData = await getCart();
    expect(cartData).toMatchSnapshot();

    expect(makeApiCallSpy).toHaveBeenCalledTimes(1);
    expect(makeApiCallSpy).toHaveBeenLastCalledWith(apiRoutes.getCart, {
      body: {
        userId: mockDB.user.Data.userId
      },
      headers: {
        StoreId: '0'
      }
    });
  });

  // test('addCartItem', async () => {
  //   const oldCart = await getCart();
  //   const cartData = await addCartItem({
  //     action: 0,
  //     product: [{ skuId: 1, qty: 2, productType: 2 }]
  //   });
  //   expect(cartData).toMatchSnapshot();

  //   expect(makeApiCallSpy).toHaveBeenCalledTimes(3);
  //   expect(makeApiCallSpy).toHaveBeenNthCalledWith(2, apiRoutes.addCartItem, {
  //     body: {
  //       userId: mockDB.user.Data.userId,
  //       cartId: oldCart.cartId,
  //       action: 0,
  //       product: [{ skuId: 1, qty: 2, productType: 2 }]
  //     }
  //   });
  // });

  // test('removeCartItem', async () => {
  //   const cartData = await removeCartItem({
  //     cartId: 1,
  //     type: 0
  //   });
  //   expect(cartData).toMatchSnapshot();

  //   expect(makeApiCallSpy).toHaveBeenCalledTimes(2);
  //   expect(makeApiCallSpy).toHaveBeenNthCalledWith(1, apiRoutes.removeCartItem, {
  //     body: {
  //       cartId: 1,
  //       qty: 0,
  //       type: 0
  //     }
  //   });
  // });

  // test('saveCartItemForLater', async () => {
  //   const cartData = await saveCartItemForLater({
  //     cartId: 1,
  //     qty: '1',
  //     productType: 2
  //   });
  //   expect(cartData).toMatchSnapshot();

  //   expect(makeApiCallSpy).toHaveBeenCalledTimes(2);
  //   expect(makeApiCallSpy).toHaveBeenNthCalledWith(1, apiRoutes.moveCartItem, {
  //     body: {
  //       cartId: 1,
  //       qty: '1',
  //       productType: 2,
  //       moveType: 'SaveForLater'
  //     }
  //   });
  // });

  // test('confirmChangedCart', async () => {
  //   await confirmChangedCart();

  //   expect(makeApiCallSpy).toHaveBeenCalledTimes(1);
  //   expect(makeApiCallSpy).toHaveBeenLastCalledWith(apiRoutes.getCart, {
  //     body: {
  //       userId: mockDB.user.Data.userId,
  //       action: 1
  //     }
  //   });
  // });
});

describe('cart service tests for users with already selected store in preferences', () => {
  let makeApiCallSpy: jest.SpyInstance<Promise<unknown>>;
  let getUserSpy: jest.SpyInstance<Promise<unknown>>;

  beforeAll(() => {
    getUserSpy = jest.spyOn(UserService, 'getUser').mockImplementation(async () => pivotAPIUser(mockUserWithPreferredStore));
    makeApiCallSpy = jest.spyOn(makeApiCall, 'default').mockImplementation(async () => mockDB.cart.Data);
  });

  beforeEach(() => {
    makeApiCallSpy.mockClear();
    // getCart.clear();
  });

  afterAll(() => {
    makeApiCallSpy.mockRestore();
    getUserSpy.mockRestore();
  });

  // test('getCart for user with default store selected in preferences', async () => {
  //   const makeApiCallSpy = jest.spyOn(makeApiCall, 'default').mockImplementation(async () => mockDB.cart.Data);
  //   const getUserSpy = jest.spyOn(UserService, 'getUser').mockImplementation(async () => pivotAPIUser(mockUserWithPreferredStore));

  //   const cartData = await getCart();
  //   expect(cartData).toMatchSnapshot();

  //   expect(makeApiCallSpy).toHaveBeenCalledTimes(1);
  //   expect(makeApiCallSpy).toHaveBeenLastCalledWith(apiRoutes.getCart, {
  //     body: {
  //       userId: mockUserWithPreferredStore.userId,
  //       storeId: mockUserWithPreferredStore.preferences.storeId
  //     },
  //     headers: {
  //       StoreId: `${mockUserWithPreferredStore.preferences.storeId}`
  //     }
  //   });

  //   makeApiCallSpy.mockRestore();
  //   getUserSpy.mockRestore();
  // });

  // test('getCart for user with default store selected in preferences but for passed storeId parameter in call', async () => {
  //   const makeApiCallSpy = jest.spyOn(makeApiCall, 'default').mockImplementation(async () => mockDB.cart.Data);
  //   const getUserSpy = jest.spyOn(UserService, 'getUser').mockImplementation(async () => pivotAPIUser(mockUserWithPreferredStore));
  //   const mockStoreId = 12344321;

  //   const cartData = await getCart(mockStoreId);
  //   expect(cartData).toMatchSnapshot();

  //   expect(makeApiCallSpy).toHaveBeenCalledTimes(1);
  //   expect(makeApiCallSpy).toHaveBeenLastCalledWith(apiRoutes.getCart, {
  //     body: {
  //       userId: mockUserWithPreferredStore.userId,
  //       storeId: mockStoreId
  //     },
  //     headers: {
  //       StoreId: `${mockStoreId}`
  //     }
  //   });

  //   makeApiCallSpy.mockRestore();
  //   getUserSpy.mockRestore();
  // });

  // test('addCartItem', async () => {
  //   const makeApiCallSpy = jest.spyOn(makeApiCall, 'default').mockImplementation(async () => mockDB.cart.Data);
  //   const getUserSpy = jest.spyOn(UserService, 'getUser').mockImplementation(async () => pivotAPIUser(mockUserWithPreferredStore));

  //   const oldCart = await getCart();
  //   const cartData = await addCartItem({
  //     action: 0,
  //     product: [{ skuId: 1, qty: 2, productType: 2 }]
  //   });
  //   expect(cartData).toMatchSnapshot();

  //   expect(makeApiCallSpy).toHaveBeenCalledTimes(3);
  //   expect(makeApiCallSpy).toHaveBeenNthCalledWith(2, apiRoutes.addCartItem, {
  //     body: {
  //       userId: mockUserWithPreferredStore.userId,
  //       cartId: oldCart.cartId,
  //       action: 0,
  //       product: [{ skuId: 1, qty: 2, productType: 2 }],
  //       storeId: mockUserWithPreferredStore.preferences.storeId
  //     },
  //     headers: { StoreId: `${mockUserWithPreferredStore.preferences.storeId}` }
  //   });

  //   makeApiCallSpy.mockRestore();
  //   getUserSpy.mockRestore();
  // });
});
