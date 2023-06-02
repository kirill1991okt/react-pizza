import { ItemsType } from '../redux/slices/cartSlice';

export const getTotalPrice = (items: ItemsType[]) => {
  return items.reduce((sum: number, obj) => {
    return sum + obj.price;
  }, 0);
};
