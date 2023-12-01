const endpointPrefix = 'jiokart/v1';
const endpointPostfix = 'jiogrocery';
let baseUrl = process.env.BASE_URL || "";
let baseUrlLogin = process.env.BASE_URL_LOGIN || "";
// let baseUrl = "https://api-sit.jio.com";
//let baseUrl = "https://api-preprod.rpay.co.in";

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
}

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
  getOderHistory: `${baseUrl}/${endpointPrefix}/${endpointPostfix}/${apiEndpoints.orderHistory}`,
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
  getConfig: `${baseUrl}/${endpointPrefix}/${apiEndpoints.getConfig}`,
  updateUser: `${baseUrl}/${endpointPrefix}/${endpointPostfix}/${apiEndpoints.updateUser}`,
}

const API_ROUTES_BACKEND = {
  getNewAccessToken: "https://api-sit.jio.com/jm/auth/oauth/v2/token ",
  getDashboard: `${baseUrl}/api/jiogrocery/dashboard/v1.0/app/campaign`,
  viewAllDashboard: `${baseUrl}/api/jiogrocery/dashboard/v1.0/app/seemore`,
  getCategories: `${baseUrl}/Product/UserCatalogue/getCategories`,
  getProductList: `${baseUrl}/api/jiogrocery/app/v1/storeproduct`,
  checkServiceability: `${baseUrl}/api/jiogrocery/app/serviceability/pincode/check`,
  getProductSearch: `${baseUrl}/api/jiogrocery/app/v1/storeproduct/search`,
  addUser: `${baseUrl}/api/jiogrocery/user/v1/saveAddress`,
  saveAddress: `${baseUrl}/api/jiogrocery/user/v1/saveAddress`,
  getAddress: `${baseUrl}/api/jiogrocery/user/v1/getAddress`,
  getStores: `${baseUrl}/Store/UserStore/getStores`,
  getCart: `${baseUrl}/api/jiogrocery/app/cart/v1/getCart`,
  addCartItem: `${baseUrl}/Order/JioKart/addItemToCart`,
  removeCartItem: `${baseUrl}/api/jiogrocery/app/cart/v1/deleteItem`,
  moveCartItem: `${baseUrl}/api/jiogrocery/app/cart/v1/moveItem`,
  getSuggestions: `${baseUrl}/api/jiogrocery/app/v1/suggestion`,
  getUserDetails: `${baseUrl}/api/jiogrocery/user/v1/getDetails`,
  deleteAddress: `${baseUrl}/api/jiogrocery/user/v1/deleteAddress`,
  getProductDetails: `${baseUrl}/api/jiogrocery/app/v1/storeproduct`,
  getSimilarItems: `${baseUrl}/api/jiogrocery/app/v1/storeproduct/similarItems`,
  getOrderDetails: `${baseUrl}/api/jiogrocery/app/v1/orderdetails`,
  getOderHistory: `${baseUrl}/api/jiogrocery/app/v1/orders`,
  getDeliveryModes: `${baseUrl}/Order/JioKart/getDeliveryModes`,
  getLocation: `${baseUrl}/api/jiogrocery/app/v1/googlePlaces`,
  searchOrderHistory: `${baseUrl}/api/jiogrocery/app/v1/searchitems`,
  checkout: `${baseUrl}/Order/JioKart/checkout`,
  placeOrder: `${baseUrl}/Order/JioKartOrder/placeOrder`,
}

const API_ROUTES = API_ROUTES_SECO;
// const API_ROUTES = process.env.APP_ENV === "LOCAL" ? API_ROUTES_BACKEND : API_ROUTES_SECO;
// const API_ROUTES = process.env.APP_ENV === "LOCAL" ? API_ROUTES_SECO : API_ROUTES_SECO;

export default API_ROUTES;

export const openApi = [API_ROUTES.checkServiceability, API_ROUTES.getStores, API_ROUTES.getProductDetails, API_ROUTES.getSimilarItems, API_ROUTES.getLocation, API_ROUTES.sendOtp, API_ROUTES.getDashboard]
export const withDataApi = [API_ROUTES.getCategories, API_ROUTES.addCartItem, API_ROUTES.removeCartItem, API_ROUTES.getStores, API_ROUTES.getDeliveryModes, API_ROUTES.checkout, API_ROUTES.placeOrder];
export const withStoreId = [API_ROUTES.getCart, API_ROUTES.addCartItem, API_ROUTES.removeCartItem, API_ROUTES.placeOrder, API_ROUTES.getDeliveryModes, API_ROUTES.checkout, API_ROUTES.placeOrder, API_ROUTES.saveAddress, API_ROUTES.getAddress];
