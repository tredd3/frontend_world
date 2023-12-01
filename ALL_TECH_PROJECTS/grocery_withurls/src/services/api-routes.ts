const baseUrl = process.env.REACT_APP_BASE_URL || '';
const baseUrlLogin = process.env.REACT_APP_BASE_URL_LOGIN || '';

export const apiRoutes = {
  getNewAccessToken: `${baseUrl}/jm/auth/oauth/v2/token`,
  getDashboard: `${baseUrl}/jiokart/v1/jiogrocery/get/dashboard`,
  viewAllDashboard: `${baseUrl}/jiokart/v1/jiogrocery/view/all/dashboard`,
  getStores: `${baseUrl}/jiokart/v1/get/stores`,
  getCart: `${baseUrl}/jiokart/v1/jiogrocery/get/cart`,
  addCartItem: `${baseUrl}/jiokart/v1/add/cart/item`,
  removeCartItem: `${baseUrl}/jiokart/v1/remove/cart/item`,
  moveCartItem: `${baseUrl}/jiokart/v1/jiogrocery/move/item`,
  getCategories: `${baseUrl}/jiokart/v1/get/categories`,
  getProductList: `${baseUrl}/jiokart/v1/jiogrocery/store/product`,
  checkServiceability: `${baseUrl}/jiokart/v1/jiogrocery/pincode/check`,
  getProductSearch: `${baseUrl}/jiokart/v1/jiogrocery/product/search`,
  getSuggestions: `${baseUrl}/jiokart/v1/jiogrocery/suggestion`,
  addUser: `${baseUrl}/jiokart/v1/jiogrocery/add/user`,
  saveAddress: `${baseUrl}/jiokart/v1/jiogrocery/save/user/address`,
  getAddress: `${baseUrl}/jiokart/v1/jiogrocery/get/user/address`,
  deleteAddress: `${baseUrl}/jiokart/v1/jiogrocery/remove/user/address`,
  getProductDetails: `${baseUrl}/jiokart/v1/jiogrocery/store/product`,
  getSimilarItems: `${baseUrl}/jiokart/v1/jiogrocery/store/similar/items`,
  getOrderDetails: `${baseUrl}/jiokart/v1/jiogrocery/order/details`,
  getOrderHistory: `${baseUrl}/jiokart/v1/jiogrocery/order/listing`,
  getDeliveryModes: `${baseUrl}/jiokart/v1/get/delivery/modes`,
  getLocation: `${baseUrl}/jiokart/v1/jiogrocery/google/places`,
  searchOrderHistory: `${baseUrl}/jiokart/v1/jiogrocery/order/item/search`,
  checkout: `${baseUrl}/jiokart/v1/order/checkout`,
  placeOrder: `${baseUrl}/jiokart/v1/place/order`,
  getUserDetail: `${baseUrl}/jiokart/v1/jiogrocery/get/user`,
  getWishListData: `${baseUrl}/jiokart/v1/jiogrocery/get/item/list`,
  addItemToWishList: `${baseUrl}/jiokart/v1/jiogrocery/add/item`,
  removeItemFromWishList: `${baseUrl}/jiokart/v1/jiogrocery/remove/item`,
  sendOtp: `${baseUrlLogin}/idam/trialwifi/v3/dip/otp/send`,
  verifyOtp: `${baseUrlLogin}/idam/trialwifi/v3/dip/otp/verify`,
  validateuser: `${baseUrl}/cr/v1/validateuser`,
  cancelOrder: `${baseUrl}/jiokart/v1/order/cancel`,
  config: `${baseUrl}/jiokart/v1/logged/customer/configurations`,
  updateUser: `${baseUrl}/jiokart/v1/jiogrocery/update/user`,
  orderRating: `${baseUrl}/jiokart/v1/order/rating`,
  getPaymentRequest: `${baseUrl}/jiokart/v1/get/payment/request`,
  getPaymentResponse: `${baseUrl}/jiokart/v1/get/payment/response`,
  getNotifications: `${baseUrl}/jiokart/v1/jiogrocery/notification/get`,
  saveNotification: `${baseUrl}/jiokart/v1/jiogrocery/notification/save`,
  clearNotifications: `${baseUrl}/jiokart/v1/jiogrocery/clear/notification`,
  removeCartSavedItem: `${baseUrl}/jiokart/v1/jiogrocery/remove/item`
} as const;

const endpointsWithoutAuth = [
  apiRoutes.checkServiceability,
  apiRoutes.getStores,
  apiRoutes.getProductDetails,
  apiRoutes.getSimilarItems,
  apiRoutes.getLocation,
  apiRoutes.sendOtp,
  apiRoutes.getDashboard
];

const endpointsNeedingEnvelope = [
  apiRoutes.getCategories,
  apiRoutes.addCartItem,
  apiRoutes.removeCartItem,
  apiRoutes.getStores,
  apiRoutes.getDeliveryModes,
  apiRoutes.checkout,
  apiRoutes.placeOrder,
  apiRoutes.getPaymentRequest,
  apiRoutes.getPaymentResponse,
  apiRoutes.orderRating
];

const endpointsNeedingStoreId = [
  apiRoutes.getCart,
  apiRoutes.addCartItem,
  apiRoutes.removeCartItem,
  apiRoutes.placeOrder,
  apiRoutes.getDeliveryModes,
  apiRoutes.checkout,
  apiRoutes.placeOrder,
  apiRoutes.saveAddress,
  apiRoutes.getAddress,
  apiRoutes.getPaymentResponse,
  apiRoutes.removeCartSavedItem
];

export const needsEnvelope = (url: string) => endpointsNeedingEnvelope.includes(url);
export const needsAuthentication = (url: string) => !endpointsWithoutAuth.includes(url);
export const needsStoreId = (url: string) => endpointsNeedingStoreId.includes(url);

export const v2ApiRoutes = [
  apiRoutes.getPaymentResponse,
  apiRoutes.getOrderHistory,
  apiRoutes.getOrderDetails,
  apiRoutes.getCart,
  apiRoutes.getDeliveryModes
];
