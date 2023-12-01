// This file should house TS types for shapes of backend responses.
import { ProductPivot } from './pivot';
import { ValueOf } from './generic';

// ToDo: Probably needs a better place than the types file like a Constants.ts.
export const couponDiscount = {
  percentageDiscount: 'PERCENTAGE_DISCOUNT_WITH_SKU',
  flatDiscount: 'FLAT_DISCOUNT_WITH_SKU'
} as const;

export type APICoupon = {
  Title: string;
  DiscountType: ValueOf<typeof couponDiscount>;
  DiscountMax: number;
  DiscountAbsValue: number;
  Description: string;
};

export type APIProduct = {
  MRP: number;
  SP: number;
  CategoryName: string;
  ProductOtherImage: string[];
  ProductName: string;
  StoreProductId: string;
  ProductImage: string;
  StorePincode: string;
  FcId: string;
  ProductSkuId: number;
  ProductSkuName: string;
  BrandName: string;
  ProductId: number;
  ProductLastUpdatedDate: string;
  IsKA: number;
  IsFc: number;
  BrandId: number;
  IsUKA: number;
  isDCKA: number;
  CategoryId: number;
  Barcode: string;
  CategoryIds: number[];
  CategoryNames: string[];
  IndustryId: string;
  CompanyName: string;
  ProductAlias: string;
  IsAvailable: number;
  Description: string;
  ManufacturerAddress: string;
  Disclaimer: string;
  SkuBulletPoint?: string[];
  BestBeforeDate: string;
  FCProductId: string;
  UQOCID: string;
  UQOCNAME: string;
  UQCSHORTNAME: string;
  FoodType?: string;
  // ToDo: Figure out these types from some sane backend response and whether these at all are qualified
  // to be here in APIProduct type or do we need a separate type?
  Coupons?: APICoupon;
  NutritionalFacts?: string;
  Ingredient?: string;
  AdditionalInfo?: string;
  DeliverySlot?: string;
};

export type APIDashboardProduct = {
  BrandName: string;
  CategoryId: number;
  CategoryName: string;
  CouponResult: APICoupon | null;
  IsFc: number;
  MRP: number;
  ProductId: number;
  ProductImage: string;
  ProductName: string;
  ProductOtherImage: string[] | null;
  ProductSkuId: number;
  SP: number;
};

export type APISimilarItems = {
  products: ProductPivot[] | APIProduct[];
  count: number;
};

export type APIShipmentProductCoupon = {
  CouponId: number;
  Discount: number;
  CouponCode: string;
  Title: string;
  Description: string;
  DiscountAbsValue: number;
};

export type APIShipmentProduct = {
  CategoryId: number;
  IsFc: number;
  MRP: number;
  ProductId: number;
  ProductImage: string;
  ProductName: string;
  ProductOtherImage: string[];
  ProductSkuId: number;
  SelectedQuantity: number;
  PricePercentage: number;
  SP: number;
  Coupons: APIShipmentProductCoupon | null;
};

export type APIShipment = {
  CreationDate: string;
  DeliveryCharge: number;
  DeliveryDate: string;
  DeliveryDay: string;
  Product: APIShipmentProduct[];
  TimeSlot: string;
  TotalAmount: number;
  TotalCouponDiscount: number;
  TotalDiscount: number;
  TotalItem: number;
  TotalPay: number;
  Type: number;
};

export type APICart = {
  CartId: number;
  ConfiguredDeliveryCharge: number;
  LTM: string;
  Shipments: APIShipment[];
  SaveLater: APIShipmentProduct[];
  TotalAmount: number;
  TotalCouponDiscount: number;
  TotalDeliveryCharge: number;
  TotalItem: number;
  TotalMRPDiscount: number;
  TotalOrderLevelDiscount: number;
  TotalPay: number;
  UserId: number;
};

// ToDo: This isn't returned from the backend so come back & check why is this needed.
export type APIBaseAddress = {
  pincode: number;
  latitude: number;
  longitude: number;
  phoneNumber: number;
  firstName: string;
  lastName: string;
  addressTag: 'work' | 'home' | 'others';
  address: string;
  addressLine1: string;
  addressLine2: string;
  addressLine3?: string;
  cityName: string;
  landmark: string;
  isDefault: boolean;
  storeId?: number;
  storeName?: string;
  defaultStore?: number;
  defaultStoreName?: string;
};

// ToDo: Sahil: Please look at usages for APIBaseAddress and APIAddress in the code to adhere to our agreed convention for
// API responses and pivots
export type APIAddress = APIBaseAddress & {
  id: number;
  addedDate: Date;
};

export type APIKirana = {
  Address: string;
  CategoryName: string;
  Distance: number;
  Image: string;
  IsClosed: number;
  Lat: number;
  Lon: number;
  MID: number;
  MinOrder: number;
  Name: string;
  NextDelivery: string;
  Rating: number;
  RatingOutOf: number;
  StoreId: number;
  StoreMobile: number;
  StorePincode: number;
  Unit: string;
};

export type APIUser = {
  addedDate: number;
  customerName: string;
  deviceId: string;
  dob?: string;
  emailId?: string;
  firstName: string;
  gender?: 1 | 2;
  lastName: string;
  lastUpdatedDate: number;
  mobileNumber: number;
  registrationDate: number;
  userId: number;
  preferences: {
    city?: string;
    latitude?: number;
    longitude?: number;
    pincode?: number;
    storeId?: number;
  };
};

export type APIOrder = {
  canBeCancelled: boolean;
  couponValue: number;
  customerId: string;
  customerMobileNumber: string;
  delCharges: number;
  deliveryAddressAddressLine1: string;
  deliveryAddressAddressLine2: string;
  deliveryAddressCity: string;
  deliveryAddressMobileNumber: string;
  deliveryAddressName: string;
  deliveryAddressPin: string;
  deliveryAddressState: string;
  finalAmount: number;
  isTotalRefund: boolean;
  merchantContactNo: string;
  netOrderAmount: number;
  orderDate: string;
  orderedBy: string;
  orderId: string;
  orderSource: string;
  orderStatus: string;
  orderValue: number;
  paymentMode: string;
  productDiscount: number;
  refunds: {
    refundAmount: number;
    refundDate: string;
  }[];
  shipments: APIOrderShipment[];
  storeId: string;
  totalItems: number;
  totalRefund: string;
  totalSavings: number;
  totalShipments: number;
  youPaid: number;
};

export type APIShipmentItem = {
  articleId: string;
  cartId: string;
  itemId: string;
  itemType: string;
  productImage: string;
  productName: number;
  quantity: number;
  sellingPrice: number;
  skuId: string;
};

type APIOrderShipmentStatusHistory = {
  status: string;
  timestamp?: string;
};

export type APIOrderShipment = {
  canBeCancelled: boolean;
  deliveryDate: string;
  deliverySlot: string;
  isShipmentUpdated: boolean;
  itemCount: string;
  items: APIShipmentItem[];
  paymentMode: string;
  shipmentId: string;
  shipmentItemCount: number;
  shipmentStatus: string;
  shipmentTotal: number;
  shipmentType: string;
  statusHistory: APIOrderShipmentStatusHistory[];
};

export type APIConfig = {
  LAST_ORDER_DETAILS: {} | LastOrderDetails;
  DEFAULT_PAGE_SIZE: string;
  QTY_ERROR_MESSAGE: string;
  INVALID_OTP: string;
  MAX_COD_LIMIT: string;
  DELIVERY_CHARGE_THRESHOLD_AMOUNT: string;
  UNREAD_NOTIFICATION_COUNT: string;
  DELIVERY_CHARGES: string;
  COD_LIMIT_ERROR_MESSAGE: string;
  WELCOME_PRODUCT_SKU: string;
  GENERIC_ERROR_MESSAGE: string;
  MAX_QTY_LIMIT_PER_ITEM: string;
};

export type APIStorePickup = {
  DateId: number;
  Date: string;
  DateValue: string;
  KdpStore: 0 | 1;
  OpenStatus: 0 | 1;
  Store: {
    Name: string;
    StoreId: string;
  };
}

export type APIDeliveryOptions = {
  StoreOrder: {
    OwnDeliveryCharges: number;
    StorePickup: [APIStorePickup];
  };
  LTM: string;
}

export type APINotification = {
  notifications: Notification[];
}

export type Notification = {
  mobileNumber: number;
  title: string;
  body: string;
  userType: string;
  deeplink: string;
  icon: string;
  status: string;
  type: string;
  createdTime: number;
  data?: {
    orderId: number;
  };
  notificationId: number;
}

export type LastOrderDetails = {
  TOTAL_ITEMS: number;
  ORDER_ID: string;
  STORE_NAME: string;
  TOTAL_SHIPMENT: number;
  DELIVERED_DATE: string;
  STORE_ID: number;
  ORDER_AMOUNT: string;
  DELIVERED_TIME: string;
};

export type APIWidgetData = {
  deepLinkText: string;
  type?: number;
  subType?: number;
  title: string;
  data: {
    banners: { bannerId: number; imageUrl: string }[] | null;
    miscellaneous: {mscId: number; imageUrl: string; name: string }[] | null;
    products: APIDashboardProduct[] | null;
  };
};
