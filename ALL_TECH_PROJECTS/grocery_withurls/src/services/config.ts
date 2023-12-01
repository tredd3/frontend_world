import promiseMemoize from 'promise-memoize';
import makeApiCall from './helpers/make-api-call';
import { apiRoutes } from './api-routes';
import { getUser } from './user';
import { APIConfig, ConfigPivot } from '../types';
import { pivotConfig } from './helpers/pivots';

export const getConfig = promiseMemoize(async (): Promise<ConfigPivot> => {
  const { userId } = await getUser();
  const { Configurations: apiConfig } = await makeApiCall<
    { customerId: number },
    {Configurations: APIConfig}
  >(apiRoutes.config, { body: { customerId: userId } });

  return pivotConfig(apiConfig);
});

export const deprecatedGetConfigDATA = async () => {
  try {
    const config = await getConfig();

    let LAST_ORDER_DETAILS = {};
    if (config.lastOrderDetails && Object.keys(config.lastOrderDetails).length !== 0) {
      LAST_ORDER_DETAILS = {
        TOTAL_ITEMS: config.lastOrderDetails.totalItems,
        ORDER_ID: config.lastOrderDetails.orderId,
        STORE_NAME: config.lastOrderDetails.storeName,
        TOTAL_SHIPMENT: config.lastOrderDetails.totalShipment,
        DELIVERED_DATE: config.lastOrderDetails.deliveredDate,
        STORE_ID: config.lastOrderDetails.storeName,
        ORDER_AMOUNT: config.lastOrderDetails.orderAmount,
        DELIVERED_TIME: config.lastOrderDetails.deliveredDate
      };
    }

    return {
      DEFAULT_PAGE_SIZE: config.pageSize,
      QTY_ERROR_MESSAGE: config.quantityErrorMessage,
      INVALID_OTP: config.invalidOTPMessage,
      MAX_COD_LIMIT: config.maxCODLimit,
      DELIVERY_CHARGE_THRESHOLD_AMOUNT: config.deliveryChargeThreshold,
      UNREAD_NOTIFICATION_COUNT: config.unreadNotificationCount,
      DELIVERY_CHARGES: config.deliveryCharges,
      COD_LIMIT_ERROR_MESSAGE: config.codLimitErrorMessage,
      WELCOME_PRODUCT_SKU: config.welcomeProductSKU,
      GENERIC_ERROR_MESSAGE: config.genericErrorMessage,
      MAX_QTY_LIMIT_PER_ITEM: config.maxQuantityLimitPerItem,
      LAST_ORDER_DETAILS
    };
  } catch (e) {
    return {};
  }
};
