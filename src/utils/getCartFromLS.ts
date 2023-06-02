import { getTotalPrice } from './getTotalPrice';

export const getCartFromLS = () => {
  const json = localStorage.getItem('cart');
  const items = json ? JSON.parse(json) : [];
  const totalPrice = getTotalPrice(items);

  return {
    items,
    totalPrice,
  };
};
