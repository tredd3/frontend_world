import { getMobileOperatingSystem } from './utilities';
import { getUser } from '../services/user';
import { getCart, PaymentMethodId, paymentLabelById } from '../services/cart';

import { CheckoutData } from '../services/checkout';
import { CartPivot } from '../types';
import { flatMap } from './typed-utils';

let purchaseJourney: string;

export const setPurchaseJourney = (val: string) => {
  purchaseJourney = val;
};

export const getPurchaseJourney = () => purchaseJourney;

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    digitalData: Record<string, any>;
    _satellite: {
      track: (event: string) => void;
    };
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const track = async (event: string, data: Record<string, any>) => {
  if (typeof window === 'undefined') return;
  const { userId } = await getUser();
  const userOS = getMobileOperatingSystem();
  const platform = userOS === 2 ? 'Android App' : userOS === 3 ? 'iOS App' : 'Web';

  const digitalData = {
    link: {
      ...data.link
    },
    internal: {
      ...data.internal
    },
    page: {
      pageInfo: {
        appName: 'JioMart Web'
      },
      ...data.page
    },
    user: {
      platform,
      loginStatus: 'Logged in',
      martId: userId,
      jioCenter: '',
      ...data.user
    },
    product: [
      ...(data.product ? data.product : [])
    ],
    interPromotion: {
      ...data.interPromotion
    },
    ...(data.product ? data.filterSection : {}),
    ...(data.purchase ? data.purchase : {})
  };

  window.digitalData = {
    ...window.digitalData,
    ...digitalData
  };

  // eslint-disable-next-line no-underscore-dangle
  if (window._satellite) window._satellite.track(event);
};

type LinkPositions = 'Top' | 'Middle' | 'Bottom';

export const trackLink = (linkName: string, linkType: string, linkPosition: LinkPositions) => (
  track('linkTracking', { link: { linkName, linkType, linkPosition } })
);

export const trackPage = (pageName: string) => (
  track('pageLoad', { page: { pageName } })
);

type FilterSection = {
  filterSelection: boolean;
  sortSelection: boolean;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const trackProduct = (eventName: string, productData: Record<string, any>, filterSection?: FilterSection) => {
  const defaultFilterSection = {
    filterSelection: false,
    sortSelection: false
  };
  return track(eventName, {
    product: [productData],
    filterSection: (filterSection || defaultFilterSection)
  });
};

export const trackAPIShipments = (eventName: string, shipments: CheckoutData['Shipments'], purchase?: any) => {
  if (shipments && shipments.length) {
    track(eventName, {
      product: flatMap(shipments, shipment => shipment.Product)
        .map(product => ({
          productID: product.ProductSkuId,
          quantity: product.SelectedQuantity,
          price: product.SelectedQuantity * product.SP,
          productName: product.ProductName
        })),
      ...(purchase && { purchase })
    });
  }
};

type PurchaseArg = {
  paymentMethod: PaymentMethodId;
  paymentStatus?: 'Paid' | 'Unpaid';
  cart: CartPivot;
  failureReason?: string;
}

export const trackShipments = async (eventName: string, purchase?: PurchaseArg) => {
  const { shipments } = purchase?.cart || await getCart();
  if (!shipments || !shipments.length) return Promise.resolve();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let additionalInfo: Record<string, any> | null = null;

  if (purchase) {
    const { paymentMethod, cart, ...rest } = purchase;
    additionalInfo = {
      paymentMethod: paymentLabelById(paymentMethod),
      couponDiscount: cart.couponDiscountAmount,
      deliveryCharges: cart.deliveryCharge,
      totalOrderValue: cart.totalPayableAmount,
      transactionId: cart.cartId,
      ...rest
    };
  }

  return track(eventName, {
    product: flatMap(shipments, shipment => shipment.products)
      .map(product => ({
        productId: product.skuId,
        quantity: product.selectedQuantity,
        price: product.selectedQuantity * product.sp,
        productName: product.name
      })),
    ...(additionalInfo && additionalInfo)
  });
};
