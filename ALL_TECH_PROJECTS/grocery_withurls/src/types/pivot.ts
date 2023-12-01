// This file should house TS types for shapes of mapped data from API responses

import { APIBaseAddress } from './api';

export type ShipmentProductCouponPivot = {
  id: number;
  discountAmount: number;
  code: string;
  title: string;
  description: string;
}

export type ShipmentProductPivot = {
  categoryId: number;
  id: number;
  image: string;
  isFc: number;
  mrp: number;
  name: string;
  otherImages: string[];
  selectedQuantity: number;
  skuId: number;
  sp: number;
  savingsPercent: number;
  coupon: ShipmentProductCouponPivot | null;
};

export type ShipmentPivot = {
  couponDiscountAmount: number;
  creationDate: string;
  deliveryCharge: number;
  deliveryDate: string;
  deliveryDay: string;
  discountAmount: number;
  itemCount: number;
  products: ShipmentProductPivot[];
  totalAmount: number;
  totalPayable: number;
  type: number;
};

export type CartPivot = {
  cartId: number;
  totalAmount: number;
  discountAmount: number;
  deliveryCharge: number;
  itemCount: number;
  couponDiscountAmount: number;
  totalPayableAmount: number;
  shipments: ShipmentPivot[];
  savedForLater: ShipmentProductPivot[] | null;
};

export type KiranaPivot = {
  id: number;
  mId: number;
  name: string;
  image: string;
  minOrder: number;
  isClosed: boolean;
  deliveryTime: {
    from: string;
    to: string;
  };
  rating: {
    amount: number;
    outOf: number;
  };
  distance: {
    amount: number;
    unit: 'm' | 'km';
  };
  categoryName: string;
  phoneNumber: number;
  location: {
    address: string;
    lat: number;
    lng: number;
    pincode: number;
  };
  nextDelivery: string;
};

export type CategoryPivot = {
  id: number;
  name: string;
  icon: string;
  image: string;
};

export type UserPivot = {
  addedDate: number;
  customerName: string;
  deviceId: string;
  dob?: Date;
  email?: string;
  firstName: string;
  gender?: 'male' | 'female';
  lastName: string;
  lastUpdatedDate: number;
  phoneNumber: number;
  registrationDate: number;
  userId: number;
  login: boolean;
  preferences: {
    city?: string;
    lat?: number;
    lng?: number;
    pincode?: number;
    storeId?: number;
  };
};

export type AddressPivot = APIBaseAddress & {
  id: number;
  addedDate: Date;
};

export type ProductPivot = {
  mrp: number;
  sp: number;
  images: string[];
  id: number;
  skuId: number;
  isFc: number;
  category: {
    name: string;
    id: number;
  };
  name: string;
  alias: string;
  description: string;
  disclaimer: string;
  bestBefore: Date | null;
  isVeg: boolean | null;
  additionalInformation: string;
  manufacturerAddress: string;
  coupon: {
    title: string;
    description: string;
    discountAmount: number;
  } | null;
  brandName: string;
  deliverySlot?: string;
  ingredients?: string;
  nutritionalFacts?: string;
};

export type DashboardProductPivot = {
  brandName: string;
  id: number;
  images: string[];
  isFc: number;
  mrp: number;
  name: string;
  skuId: number;
  sp: number;
  category: {
    id: number;
    name: string;
  };
  coupon: {
    description: string;
    discountAmount: number;
    title: string;
  } | null;
};

export type ConfigPivot = {
  pageSize: number;
  quantityErrorMessage: string;
  invalidOTPMessage: string;
  maxCODLimit: number;
  deliveryChargeThreshold: number;
  unreadNotificationCount: number;
  deliveryCharges: number;
  codLimitErrorMessage: string;
  welcomeProductSKU: number;
  genericErrorMessage: string;
  maxQuantityLimitPerItem: number;
  lastOrderDetails: null | {
    totalItems: number;
    orderId: number;
    storeName: string;
    totalShipment: number;
    deliveredDate: string;
    storeId: number;
    orderAmount: string;
    deliveredTime: string;
  };
}

export type DeliveryModePivot = {
  id: number;
  label: string;
  value: string;
  isOpen: boolean;
  store: {
    isKdp: boolean;
    name: string;
    storeId: number;
  };
}

export type DeliveryDatePivot = {
  id: number;
  label: string;
  isOpen: boolean;
}

export type NotificationPivot = {
  id: number;
  title: string;
  body: string;
  orderId?: number;
  date: Date;
  icon: string;
  status: 'read' | 'unread';
}
