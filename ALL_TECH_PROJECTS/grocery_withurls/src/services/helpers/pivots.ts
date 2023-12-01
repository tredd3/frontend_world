import {
  APIShipment, APIShipmentProduct, APICart, APIProduct, ShipmentProductPivot,
  CartPivot, ProductPivot, couponDiscount, APIDashboardProduct,
  DashboardProductPivot, APIUser, UserPivot, AddressPivot, ShipmentPivot,
  APIStorePickup, APIShipmentProductCoupon, DeliveryModePivot, ConfigPivot,
  APIConfig, LastOrderDetails, Notification, NotificationPivot
} from '../../types';
import { genderCodeToString } from './generic';
import { APIAddressRequest } from '../address';

export const pivotShipmentProductCoupon = (coupon: APIShipmentProductCoupon) => ({
  id: coupon.CouponId,
  code: coupon.CouponCode,
  discountAmount: coupon.Discount,
  title: coupon.Title,
  description: coupon.Description
});

export const pivotShipmentProduct = (product: APIShipmentProduct): ShipmentProductPivot => ({
  mrp: product.MRP,
  sp: product.SP,
  otherImages: product.ProductOtherImage,
  name: product.ProductName,
  image: product.ProductImage,
  skuId: product.ProductSkuId,
  id: product.ProductId,
  isFc: product.IsFc,
  categoryId: product.CategoryId,
  selectedQuantity: product.SelectedQuantity,
  savingsPercent: product.PricePercentage,
  coupon: product.Coupons && pivotShipmentProductCoupon(product.Coupons)
});

export const pivotShipment = (shipment: APIShipment): ShipmentPivot => ({
  type: shipment.Type,
  deliveryDate: shipment.DeliveryDate,
  totalAmount: shipment.TotalAmount,
  discountAmount: shipment.TotalDiscount,
  couponDiscountAmount: shipment.TotalCouponDiscount,
  totalPayable: shipment.TotalPay,
  deliveryCharge: shipment.DeliveryCharge,
  deliveryDay: shipment.DeliveryDay,
  creationDate: shipment.CreationDate,
  itemCount: shipment.TotalItem,
  products: shipment.Product.map(pivotShipmentProduct)
});

export const pivotProduct = (product: APIProduct): ProductPivot => ({
  mrp: product.MRP,
  sp: product.SP,
  name: product.ProductName,
  images: (product.ProductOtherImage && product.ProductOtherImage.length) ? product.ProductOtherImage : [product.ProductImage],
  id: product.ProductId,
  skuId: product.ProductSkuId,
  isFc: product.IsFc,
  category: {
    name: product.CategoryName,
    id: product.CategoryId
  },
  alias: product.ProductAlias,
  description:
    product.SkuBulletPoint && product.SkuBulletPoint.length
      ? `${product.Description}. ${product.SkuBulletPoint.reduce(
        (acc, cv) => `${acc}. ${cv}`
      )}`
      : product.Description,
  disclaimer: product.Disclaimer,
  bestBefore: product.BestBeforeDate ? new Date(Number(product.BestBeforeDate)) : null,
  isVeg: product.FoodType ? Boolean(product.FoodType.toLocaleLowerCase() === 'veg') : null,
  additionalInformation: product.AdditionalInfo && product.AdditionalInfo !== 'null' ? product.AdditionalInfo : '',
  manufacturerAddress: product.ManufacturerAddress && product.ManufacturerAddress !== 'null' ? product.ManufacturerAddress : '',
  coupon: product.Coupons && Object.keys(product.Coupons).length > 0 ? {
    title: product.Coupons.Title,
    description: product.Coupons.Description,
    discountAmount: product.Coupons.DiscountType === couponDiscount.percentageDiscount
      ? product.Coupons.DiscountMax
      : product.Coupons.DiscountAbsValue
  } : null,
  brandName: product.BrandName,
  deliverySlot: product.DeliverySlot,
  ingredients: product.Ingredient,
  nutritionalFacts: product.NutritionalFacts
});

export const pivotCartResponse = (cartData: APICart): CartPivot => ({
  cartId: cartData.CartId,
  totalAmount: cartData.TotalAmount,
  discountAmount: cartData.TotalMRPDiscount,
  deliveryCharge: cartData.TotalDeliveryCharge,
  itemCount: cartData.TotalItem,
  couponDiscountAmount: cartData.TotalCouponDiscount,
  totalPayableAmount: cartData.TotalPay,
  shipments: cartData.Shipments.map(pivotShipment),
  savedForLater: cartData.SaveLater?.length ? cartData.SaveLater.map(pivotShipmentProduct) : null
});

export const pivotDashboardProduct = (product: APIDashboardProduct): DashboardProductPivot => ({
  brandName: product.BrandName,
  id: product.ProductId,
  images: product.ProductOtherImage?.length ? product.ProductOtherImage : [product.ProductImage],
  isFc: product.IsFc,
  mrp: product.MRP,
  name: product.ProductName,
  skuId: product.ProductSkuId,
  sp: product.SP,
  category: {
    name: product.CategoryName,
    id: product.CategoryId
  },
  coupon: product.CouponResult && Object.keys(product.CouponResult).length > 0 ? {
    title: product.CouponResult.Title,
    description: product.CouponResult.Description,
    discountAmount: product.CouponResult.DiscountType === couponDiscount.percentageDiscount
      ? product.CouponResult.DiscountMax
      : product.CouponResult.DiscountAbsValue
  } : null
});

export const pivotAPIUser = (user: APIUser): UserPivot => {
  const {
    mobileNumber, emailId, gender, dob, userId, ...otherUserProps
  } = user;
  const { latitude: lat, longitude: lng, ...remainingPreferences } = otherUserProps.preferences || ({} as UserPivot['preferences']);

  return {
    phoneNumber: mobileNumber,
    email: emailId,
    userId,
    gender: genderCodeToString(gender),
    ...(dob && { dob: new Date(dob) }),
    ...otherUserProps,
    preferences: { ...remainingPreferences, lat, lng },
    login: (userId !== undefined && userId !== null)
  };
};

export const pivotAPIAddress = ({ addressId, addedDate, ...address }: APIAddressRequest): AddressPivot => ({
  id: addressId,
  addedDate: new Date(addedDate.replace(/(A|P)M IST/, '')),
  ...address
});

export const pivotDeliveryMode = (date: APIStorePickup): DeliveryModePivot => ({
  id: date.DateId,
  label: date.Date,
  value: date.DateValue,
  isOpen: date.OpenStatus === 1,
  store: {
    isKdp: Boolean(date.KdpStore),
    name: date.Store.Name,
    storeId: Number(date.Store.StoreId)
  }
});

export const pivotConfig = (apiConfig: APIConfig): ConfigPivot => {
  let lastOrderDetails = null;
  if (apiConfig.LAST_ORDER_DETAILS && Object.keys(apiConfig.LAST_ORDER_DETAILS).length !== 0) {
    const lod = apiConfig.LAST_ORDER_DETAILS as LastOrderDetails;
    lastOrderDetails = {
      totalItems: Number(lod.TOTAL_ITEMS),
      orderId: Number(lod.ORDER_ID),
      storeName: lod.STORE_NAME,
      totalShipment: lod.TOTAL_SHIPMENT,
      deliveredDate: lod.DELIVERED_DATE,
      storeId: lod.STORE_ID,
      orderAmount: lod.ORDER_AMOUNT,
      deliveredTime: lod.DELIVERED_TIME
    };
  }

  return {
    pageSize: Number(apiConfig.DEFAULT_PAGE_SIZE),
    quantityErrorMessage: apiConfig.QTY_ERROR_MESSAGE,
    invalidOTPMessage: apiConfig.INVALID_OTP,
    maxCODLimit: Number(apiConfig.MAX_COD_LIMIT),
    deliveryChargeThreshold: Number(apiConfig.DELIVERY_CHARGE_THRESHOLD_AMOUNT),
    unreadNotificationCount: Number(apiConfig.UNREAD_NOTIFICATION_COUNT),
    deliveryCharges: Number(apiConfig.DELIVERY_CHARGES),
    codLimitErrorMessage: apiConfig.COD_LIMIT_ERROR_MESSAGE,
    welcomeProductSKU: Number(apiConfig.WELCOME_PRODUCT_SKU),
    genericErrorMessage: apiConfig.GENERIC_ERROR_MESSAGE,
    maxQuantityLimitPerItem: Number(apiConfig.MAX_QTY_LIMIT_PER_ITEM),
    lastOrderDetails
  };
};

export const pivotNotification = (notification: Notification): NotificationPivot => ({
  id: notification.notificationId,
  title: notification.title,
  body: notification.body,
  orderId: notification.data?.orderId ? notification.data.orderId : undefined,
  date: new Date(notification.createdTime),
  icon: notification.icon,
  status: notification.status.toLowerCase() as 'read' | 'unread'
});
