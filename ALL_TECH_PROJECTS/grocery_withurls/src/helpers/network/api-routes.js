const endpointPrefix = 'jiokart/v1';
const endpointPostfix = 'jiogrocery';
const baseUrl = process.env.REACT_APP_BASE_URL || '';
const baseUrlLogin = process.env.REACT_APP_BASE_URL_LOGIN || '';

const apiEndpoints = {
  getDashboard: 'get/dashboard',
  viewAllDashboard: 'view/all/dashboard',
  checkServiceability: 'pincode/check',
  getStores: 'get/stores',
  getCart: 'get/cart',
  addCartItem: 'add/cart/item',
  removeCartItem: 'remove/cart/item',
  moveCartItem: 'move/item',
  getProductList: 'store/product',
  getCategories: 'get/categories',
  getSuggestions: 'suggestion',
  getProductSearch: 'product/search',
  addUser: 'add/user',
  saveAddress: 'save/user/address',
  getAddress: 'get/user/address',
  deleteAddress: 'remove/user/address',
  productDetails: 'store/product',
  similarItems: 'store/similar/items',
  orderDetails: 'order/details',
  orderHistory: 'order/listing',
  getDeliveryModes: 'get/delivery/modes',
  getLocation: 'google/places',
  searchOrderHistory: 'order/item/search',
  checkout: 'order/checkout',
  placeOrder: 'place/order',
  getUserDetail: 'get/user',
  addItemToWishList: 'add/item',
  removeItemToWishList: 'remove/item',
  getWishListData: 'get/item/list',
  getNewAccessToken: 'jm/auth/oauth/v2/token',
  sendOtp: 'idam/trialwifi/v3/dip/otp/send',
  verifyOtp: 'idam/trialwifi/v3/dip/otp/verify',
  validateuser: 'cr/v1/validateuser',
  cancelOrder: 'order/cancel',
  getConfig: 'customer/configurations',
  updateUser: 'update/user',
  orderRating: 'order/rating',
  getPaymentRequest: 'get/payment/request',
  getPaymentResponse: 'get/payment/response',
  getNotifications: 'notification/get',
  saveNotification: 'notification/save',
  clearNotifications: 'clear/notification',
  removeCartSavedItem: 'remove/item'
};

const API_ROUTES_SECO = {
  getNewAccessToken: `${baseUrl}/${apiEndpoints.getNewAccessToken}`,
  getDashboard: `${baseUrl}/${endpointPrefix}/${endpointPostfix}/${apiEndpoints.getDashboard}`,
  viewAllDashboard: `${baseUrl}/${endpointPrefix}/${endpointPostfix}/${apiEndpoints.viewAllDashboard}`,
  getStores: `${baseUrl}/${endpointPrefix}/${apiEndpoints.getStores}`,
  getCart: `${baseUrl}/${endpointPrefix}/${endpointPostfix}/${apiEndpoints.getCart}`,
  addCartItem: `${baseUrl}/${endpointPrefix}/${apiEndpoints.addCartItem}`,
  removeCartItem: `${baseUrl}/${endpointPrefix}/${apiEndpoints.removeCartItem}`,
  moveCartItem: `${baseUrl}/${endpointPrefix}/${endpointPostfix}/${apiEndpoints.moveCartItem}`,
  getCategories: `${baseUrl}/${endpointPrefix}/${apiEndpoints.getCategories}`,
  getProductList: `${baseUrl}/${endpointPrefix}/${endpointPostfix}/${apiEndpoints.getProductList}`,
  checkServiceability: `${baseUrl}/${endpointPrefix}/${endpointPostfix}/${apiEndpoints.checkServiceability}`,
  getProductSearch: `${baseUrl}/${endpointPrefix}/${endpointPostfix}/${apiEndpoints.getProductSearch}`,
  getSuggestions: `${baseUrl}/${endpointPrefix}/${endpointPostfix}/${apiEndpoints.getSuggestions}`,
  addUser: `${baseUrl}/${endpointPrefix}/${endpointPostfix}/${apiEndpoints.addUser}`,
  saveAddress: `${baseUrl}/${endpointPrefix}/${endpointPostfix}/${apiEndpoints.saveAddress}`,
  getAddress: `${baseUrl}/${endpointPrefix}/${endpointPostfix}/${apiEndpoints.getAddress}`,
  deleteAddress: `${baseUrl}/${endpointPrefix}/${endpointPostfix}/${apiEndpoints.deleteAddress}`,
  getProductDetails: `${baseUrl}/${endpointPrefix}/${endpointPostfix}/${apiEndpoints.productDetails}`,
  getSimilarItems: `${baseUrl}/${endpointPrefix}/${endpointPostfix}/${apiEndpoints.similarItems}`,
  getOrderDetails: `${baseUrl}/${endpointPrefix}/${endpointPostfix}/${apiEndpoints.orderDetails}`,
  getOrderHistory: `${baseUrl}/${endpointPrefix}/${endpointPostfix}/${apiEndpoints.orderHistory}`,
  getDeliveryModes: `${baseUrl}/${endpointPrefix}/${apiEndpoints.getDeliveryModes}`,
  getLocation: `${baseUrl}/${endpointPrefix}/${endpointPostfix}/${apiEndpoints.getLocation}`,
  searchOrderHistory: `${baseUrl}/${endpointPrefix}/${endpointPostfix}/${apiEndpoints.searchOrderHistory}`,
  checkout: `${baseUrl}/${endpointPrefix}/${apiEndpoints.checkout}`,
  placeOrder: `${baseUrl}/${endpointPrefix}/${apiEndpoints.placeOrder}`,
  getUserDetail: `${baseUrl}/${endpointPrefix}/${endpointPostfix}/${apiEndpoints.getUserDetail}`,
  getWishListData: `${baseUrl}/${endpointPrefix}/${endpointPostfix}/${apiEndpoints.getWishListData}`,
  addItemToWishList: `${baseUrl}/${endpointPrefix}/${endpointPostfix}/${apiEndpoints.addItemToWishList}`,
  removeItemToWishList: `${baseUrl}/${endpointPrefix}/${endpointPostfix}/${apiEndpoints.removeItemToWishList}`,
  sendOtp: `${baseUrlLogin}/${apiEndpoints.sendOtp}`,
  verifyOtp: `${baseUrlLogin}/${apiEndpoints.verifyOtp}`,
  validateuser: `${baseUrl}/${apiEndpoints.validateuser}`,
  cancelOrder: `${baseUrl}/${endpointPrefix}/${apiEndpoints.cancelOrder}`,
  getConfig: `${baseUrl}/${endpointPrefix}/logged/${apiEndpoints.getConfig}`,
  updateUser: `${baseUrl}/${endpointPrefix}/${endpointPostfix}/${apiEndpoints.updateUser}`,
  orderRating: `${baseUrl}/${endpointPrefix}/${apiEndpoints.orderRating}`,
  getPaymentRequest: `${baseUrl}/${endpointPrefix}/${apiEndpoints.getPaymentRequest}`,
  getPaymentResponse: `${baseUrl}/${endpointPrefix}/${apiEndpoints.getPaymentResponse}`,
  getNotifications: `${baseUrl}/${endpointPrefix}/${endpointPostfix}/${apiEndpoints.getNotifications}`,
  saveNotification: `${baseUrl}/${endpointPrefix}/${endpointPostfix}/${apiEndpoints.saveNotification}`,
  clearNotifications: `${baseUrl}/${endpointPrefix}/${endpointPostfix}/${apiEndpoints.clearNotifications}`,
  removeCartSavedItem: `${baseUrl}/${endpointPrefix}/${endpointPostfix}/${apiEndpoints.removeCartSavedItem}`
};

const API_ROUTES = API_ROUTES_SECO;

export default API_ROUTES;

export const openApi = [
  API_ROUTES.checkServiceability,
  API_ROUTES.getStores,
  API_ROUTES.getProductDetails,
  API_ROUTES.getSimilarItems,
  API_ROUTES.getLocation,
  API_ROUTES.sendOtp,
  API_ROUTES.getDashboard
];
export const withDataApi = [
  API_ROUTES.getCategories,
  API_ROUTES.addCartItem,
  API_ROUTES.removeCartItem,
  API_ROUTES.getStores,
  API_ROUTES.getDeliveryModes,
  API_ROUTES.checkout,
  API_ROUTES.placeOrder,
  API_ROUTES.getPaymentRequest,
  API_ROUTES.getPaymentResponse,
  API_ROUTES.orderRating
];
export const withStoreId = [
  API_ROUTES.getCart,
  API_ROUTES.addCartItem,
  API_ROUTES.removeCartItem,
  API_ROUTES.placeOrder,
  API_ROUTES.getDeliveryModes,
  API_ROUTES.checkout,
  API_ROUTES.placeOrder,
  API_ROUTES.saveAddress,
  API_ROUTES.getAddress,
  API_ROUTES.getPaymentResponse,
  API_ROUTES.removeCartSavedItem
];

export const v2Apis = [
  API_ROUTES.getPaymentResponse,
  API_ROUTES.getOrderHistory,
  API_ROUTES.getCart,
  API_ROUTES.cancelOrder
];

export const v3Apis = [API_ROUTES.getOrderDetails];
