import { getWishList, removeFromWishList } from '../wish-list';
import * as makeApiCall from '../helpers/make-api-call';
import { apiRoutes } from '../api-routes';
import mockDB from '../../mocks/db.json';

describe('Wish list service tests', () => {
  let makeApiCallSpy: jest.SpyInstance<Promise<unknown>>;

  beforeAll(() => {
    makeApiCallSpy = jest.spyOn(makeApiCall, 'default').mockImplementation(async () => mockDB.wishlist.Data);
  });

  afterEach(() => {
    makeApiCallSpy.mockClear();
  });

  it('should get items from wishlist correctly', async () => {
    const wishListData = await getWishList();
    expect(wishListData).toMatchSnapshot();
    expect(makeApiCallSpy).toHaveBeenCalledTimes(1);
    expect(makeApiCallSpy).toHaveBeenLastCalledWith(apiRoutes.getWishListData, {
      body: {
        productCategoryType: 'Wishlist'
      }
    });
  });

  it('should remove item from wishlist correctly', async () => {
    const dummySkuId = 1234;
    await removeFromWishList(dummySkuId);

    expect(makeApiCallSpy).toHaveBeenCalledTimes(1);
    expect(makeApiCallSpy).toHaveBeenLastCalledWith(apiRoutes.removeItemFromWishList, {
      body: {
        productCategoryId: '',
        productCategoryType: 'Wishlist',
        productType: 1,
        qty: 0,
        skuId: dummySkuId
      }
    });
  });
});
