import store from '../store';
import { getUser } from '../services/user';
import { getCart } from '../services/cart';

const getCartId = () => store.getState().cart.CartId || 0;
const getSelectedStoreId = async () => {
  const user = await getUser();
  const { preferences: { storeId } } = user;
  return storeId || undefined;
};

export const getUserId = () => store.getState().user.userId;

export const addCartApiBody = async ({
  skuId, Quantity = 1, ProductType = 0, deliveryModes, addressIdForCheckout
}) => {
  let apiBody = {};

  apiBody = {
    product: [{
      skuId, qty: Number(Quantity), productType: ProductType
    }]
  };

  // Here action is mandatory parameter to be passed. Because based on it backend internally calls checkout api.
  // action : 1 means checkout call
  // action : 0 means no checkout call
  // Also we need to pass other parameters like deliveryDate, timeSlot which needed for checkout api call at backend
  // when action is 1

  if (deliveryModes && Object.keys(deliveryModes).length !== 0) {
    const { date, timeSlot } = deliveryModes;
    apiBody = {
      ...apiBody, action: 1, deliveryDate: date, timeslot: timeSlot, customerAddressId: addressIdForCheckout
    };
  } else {
    apiBody = { ...apiBody, action: 0 };
  }

  const user = await getUser();
  if (user) {
    const { userId } = user;
    apiBody = { ...apiBody, userId };
  }

  const storeId = await getSelectedStoreId();
  if (storeId) {
    apiBody = { ...apiBody, storeId };
  }
  try {
    const cart = await (storeId ? getCart(storeId) : getCart());
    if (cart && cart.cartId !== 0) {
      const { cartId } = cart;
      apiBody = { ...apiBody, cartId };
    }
  } catch (e) {
    console.log(e.message);
  }

  return apiBody;
};

export const removeCartApiBody = ({ skuId, Quantity = 0, ProductType = 0 }) => ({
  cartId: getCartId(),
  skuId,
  qty: Quantity,
  type: ProductType
});

export const moveItemApiBody = ({
  skuId, Quantity = 0, ProductType = 0, moveType
}) => ({
  cartId: getCartId(),
  skuId,
  qty: Quantity,
  productType: ProductType,
  moveType
});

export const removeSaveLaterCartApiBody = ({
  skuId, Quantity = 0, ProductType = 0, moveType
}) => ({
  skuId,
  qty: Quantity,
  productType: ProductType,
  productCategoryType: moveType
});
