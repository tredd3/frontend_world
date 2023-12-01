import promiseMemoize from 'promise-memoize';
import makeApiCall from './helpers/make-api-call';
import { apiRoutes } from './api-routes';
import {
  APIOrder, OrderFilters, APIOrderShipment
} from '../types';
import { getUser } from './user';
import { getConfig } from './config';

type GetOrderHistoryPayload = {
  filters?: OrderFilters | null;
  pageNumber: number;
  pageSize: number;
}

type GetOrderHistoryRequest = {
  customerId: number;
  filter?: OrderFilters;
  pageNumber: number;
  pageSize: number;
}

// TODO memoize this basis params
export const getOrderHistory = async (payload: GetOrderHistoryPayload) => {
  const {
    pageNumber, pageSize, filters
  } = payload;

  const { userId } = await getUser();
  const request: GetOrderHistoryRequest = {
    customerId: userId,
    pageNumber,
    pageSize
  };

  if (filters) {
    request.filter = { ...filters };
  }

  const data = await makeApiCall<GetOrderHistoryRequest, { orders: APIOrder[] }>(apiRoutes.getOrderHistory, {
    body: request
  });

  return data.orders;
};

type SearchOrdersPayload = {
  pageNumber: number;
  pageSize: number;
  searchText: string;
};

type SearchOrdersRequest = {
  customerId: number;
  pageNumber: number;
  pageSize: number;
  itemName: string;
};

export const searchOrders = promiseMemoize(async (payload: SearchOrdersPayload) => {
  const { userId } = await getUser();
  const { pageNumber, pageSize, searchText: itemName } = payload;

  const data = await makeApiCall<SearchOrdersRequest, { orders: APIOrder[] }>(apiRoutes.searchOrderHistory, {
    body: {
      customerId: userId,
      pageNumber,
      pageSize,
      itemName
    }
  });

  return data.orders;
}, {
  resolve: 'json'
});

type GetOrderDetailRequest = {
  customerId: number;
  orderId: string;
  pageNumber: number;
  pageSize: number;
}

export const getOrderDetails = async (orderId: string): Promise<APIOrder | null> => {
  const { userId: customerId } = await getUser();

  const data = await makeApiCall<GetOrderDetailRequest, { orders: APIOrder[] }>(apiRoutes.getOrderDetails, {
    body: {
      customerId,
      orderId,
      pageNumber: 0,
      pageSize: 1
    }
  });

  return data.orders[0] || null;
};

type CancelShipmentRequest = {
  masterOrderId: number;
  CancelItems: ShipmentRequestItem[];
  ShipType: number;
  UserId: number;
}

type ShipmentRequestItem = {
  ArticleId: string;
  ItemId: string;
  SKUId: string;
  Type: string;
  OrderId: string;
}

const ApiShipmentType = {
  NONFC: 1,
  FC: 2,
  DEFAULT: 3 // still no idea what 3 means
};

export const cancelShipment = async (orderId: number, shipment: APIOrderShipment) => {
  const { userId } = await getUser();

  const { shipmentType = 'DEFAULT' } = shipment;

  return makeApiCall<CancelShipmentRequest, null>(apiRoutes.cancelOrder, {
    body: {
      masterOrderId: orderId,
      CancelItems: shipment.items.map(
        ({
          articleId, itemId, skuId, itemType, cartId
        }) => ({
          ArticleId: articleId,
          ItemId: itemId,
          SKUId: skuId,
          Type: itemType,
          OrderId: cartId // for some reason this is cartId
        })
      ),
      ShipType: ApiShipmentType[shipmentType],
      UserId: userId
    }
  });
};

type RateOrderRequest = {
  StoreId: number;
  OrderId: number;
  CustomerId: number;
  Rating: string;
  Comment: string;
}

export const rateOrder = async (rating = 0) => {
  const { userId: customerId } = await getUser();
  const { lastOrderDetails } = await getConfig();
  if (!lastOrderDetails) throw new Error('Last order not found');
  const { storeId, orderId } = lastOrderDetails;
  const body = {
    StoreId: storeId,
    OrderId: orderId,
    CustomerId: customerId || 0,
    Rating: rating.toString(),
    Comment: ''
  };

  getConfig.clear();
  return makeApiCall<RateOrderRequest, null>(apiRoutes.orderRating, { body });
};
