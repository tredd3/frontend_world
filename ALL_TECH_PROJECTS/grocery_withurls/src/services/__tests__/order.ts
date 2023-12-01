import { getOrderHistory, searchOrders } from '../order';
import { apiRoutes } from '../api-routes';
import * as makeApiCall from '../helpers/make-api-call';
import * as UserService from '../user';
import mockDB from '../../mocks/db.json';
import { OrderFilters } from '../../types';
import { pivotAPIUser } from '../helpers/pivots';

describe('order service', () => {
  let makeApiCallSpy: jest.SpyInstance<Promise<unknown>>;
  let getUserSpy: jest.SpyInstance<Promise<unknown>>;

  beforeAll(() => {
    getUserSpy = jest.spyOn(UserService, 'getUser').mockImplementation(async () => pivotAPIUser(mockDB.user.Data));
    makeApiCallSpy = jest.spyOn(makeApiCall, 'default').mockImplementation(async () => mockDB.listing.Data);
  });

  afterAll(() => {
    makeApiCallSpy.mockRestore();
    getUserSpy.mockRestore();
  });

  afterEach(() => {
    getUserSpy.mockClear();
  });

  it('should make API calls for order history with correct parameters without filters', async () => {
    const orders = await getOrderHistory({
      pageNumber: 1,
      pageSize: 10
    });

    expect(orders).toMatchObject(mockDB.listing.Data.orders);

    expect(getUserSpy).toHaveBeenCalledTimes(1);

    expect(makeApiCallSpy).toHaveBeenLastCalledWith(
      apiRoutes.getOrderHistory,
      {
        body: expect.objectContaining({
          customerId: mockDB.user.Data.userId,
          pageNumber: 1,
          pageSize: 10
        })
      }
    );
  });

  it('should make API calls for order history with correct parameters with filters', async () => {
    const mockFilters: OrderFilters = {
      orderType: 'test_order_type',
      timeFilter: {
        lessThanDate: '31-DEC-2017',
        greaterThanDate: '01-JAN-2017'
      }
    };
    const orders = await getOrderHistory({
      filters: mockFilters,
      pageNumber: 1,
      pageSize: 10
    });

    expect(orders).toMatchObject(mockDB.listing.Data.orders);

    expect(getUserSpy).toHaveBeenCalledTimes(1);

    expect(makeApiCallSpy).toHaveBeenLastCalledWith(
      apiRoutes.getOrderHistory,
      {
        body: expect.objectContaining({
          customerId: mockDB.user.Data.userId,
          pageNumber: 1,
          pageSize: 10,
          filter: mockFilters
        })
      }
    );
  });

  it('should make API calls for searching orders with correct parameters', async () => {
    const mockSearchParams = {
      pageNumber: 1,
      pageSize: 10,
      searchText: 'test'
    };

    const orders = await searchOrders(mockSearchParams);
    expect(orders).toMatchObject(mockDB.listing.Data.orders);

    expect(getUserSpy).toHaveBeenCalledTimes(1);
    expect(makeApiCallSpy).toHaveBeenLastCalledWith(
      apiRoutes.searchOrderHistory,
      {
        body: expect.objectContaining({
          customerId: mockDB.user.Data.userId,
          pageNumber: 1,
          pageSize: 10,
          itemName: 'test'
        })
      }
    );
  });
});
