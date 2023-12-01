import React, {
  createContext, useContext, useCallback
} from 'react';
import {
  addToCart, removeFromCart, changeQuantity, changeQuantityOnOrderReview
} from '../services/cart';
import useSnackbar from './use-snackbar';
import useCartCount from './use-cart-count';
import { CartPivot } from '../types';

const noopPreCheckout = async () => { /* no op */ };
const noopPostCheckout = async () => null as unknown as CartPivot;

type CartActionsContextType = {
  addToCart: typeof addToCart;
  removeFromCart: typeof removeFromCart;
  changeQuantity: typeof changeQuantity;
  changeQuantityOnOrderReview: typeof changeQuantityOnOrderReview;
};

const CartActionsContext = createContext<CartActionsContextType>({
  addToCart: noopPreCheckout,
  removeFromCart: noopPreCheckout,
  changeQuantity: noopPreCheckout,
  changeQuantityOnOrderReview: noopPostCheckout
});

export const CartActionsProvider: React.FC = ({
  children
}) => {
  const showSnackbar = useSnackbar();
  const { notifyCartHasUpdated } = useCartCount();

  // eslint-disable-next-line max-len
  function createCartAction<T extends(...args: any[]) => Promise<any>>(func: T, successMessage: string, errorMessage: string): (...funcArgs: Parameters<T>) => Promise<undefined | CartPivot> {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useCallback(async (...args: Parameters<T>): Promise<undefined | CartPivot> => {
      let updatedCart: CartPivot | undefined;

      try {
        updatedCart = await func(...args);
        notifyCartHasUpdated();
        showSnackbar({ type: 'success', message: successMessage });
      } catch (e) {
        showSnackbar({ type: 'error', message: e.message || errorMessage });
      }

      return updatedCart;
    }, [func, successMessage, errorMessage]);
  }

  return (
    <CartActionsContext.Provider value={{
      addToCart: createCartAction(addToCart, 'Item added to cart', 'Error adding to cart') as () => Promise<void>,
      removeFromCart: createCartAction(removeFromCart, 'Item removed from cart', 'Error removing item from cart') as () => Promise<void>,
      changeQuantity: createCartAction(changeQuantity, 'Successfully updated cart', 'Error updating cart') as () => Promise<void>,
      changeQuantityOnOrderReview: createCartAction(
        changeQuantityOnOrderReview, 'Successfully updated cart', 'Error updating cart'
      ) as () => Promise<CartPivot>
    }}
    >
      {children}
    </CartActionsContext.Provider>
  );
};

export default () => useContext(CartActionsContext);
