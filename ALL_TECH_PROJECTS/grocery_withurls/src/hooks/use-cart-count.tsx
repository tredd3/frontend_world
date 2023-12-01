import React, {
  createContext, useContext, useState, useEffect, useCallback
} from 'react';
import { getCart } from '../services/cart';

const INITIAL_CART_COUNT = 0;

type CartCountContextType = { cartCount: number; notifyCartHasUpdated: () => void };
const CartCountContext = createContext<CartCountContextType>({
  cartCount: INITIAL_CART_COUNT,
  notifyCartHasUpdated: () => { /* no op */ }
});

export const CartCountProvider: React.FC = ({
  children
}) => {
  const [cartCount, setCartCount] = useState(INITIAL_CART_COUNT);
  const updateCartCount = useCallback(async () => {
    const { itemCount } = await getCart();
    setCartCount(itemCount);
  }, []);

  useEffect(() => { updateCartCount(); }, [updateCartCount]);

  return (
    <CartCountContext.Provider value={{ cartCount, notifyCartHasUpdated: updateCartCount }}>
      {children}
    </CartCountContext.Provider>
  );
};

export default () => useContext(CartCountContext);
