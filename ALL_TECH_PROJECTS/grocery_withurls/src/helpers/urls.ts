export const accountUrl = '/account';
export const cartUrl = '/cart';
export const notificationsUrl = '/notifications';
export const productUrl = (skuId: number | string) => `/products/${skuId}`;
export const productSimilarItemsUrl = (skuId: number | string) => `/products/${skuId}/similar-items`;
export const orderPlacedUrl = (orderId: number | string) => `/order-placed/${orderId}`;
export const ordersUrl = '/orders';
export const orderSearchUrl = '/orders/search';
export const orderDetailsUrl = (orderId: number | string) => `/orders/${orderId}`;
export const wishlistUrl = '/wishlist';
export const categoriesUrl = '/categories';
export const categoryUrl = (categoryId: number | string) => `/categories/${categoryId}`;
export const subCategoryUrl = (categoryId: number | string, subCategoryId: number | string) => `/categories/${categoryId}/${subCategoryId}`;
export const searchUrl = '/search';
export const searchResultsUrl = (searchText: string) => `/search/${searchText}`;
export const collectionUrl = (collectionId: number | string, type?: number | string, subtype?: number | string) => {
  let queryParams;
  if (type) {
    queryParams = new URLSearchParams();
    queryParams.append('type', String(type));

    if (subtype) {
      queryParams.append('subtype', String(subtype));
    }
  }
  return `/collections/${collectionId}${queryParams ? `?${queryParams.toString()}` : ''}`;
};
