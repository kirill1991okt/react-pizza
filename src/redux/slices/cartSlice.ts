import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { getCartFromLS } from '../../utils/getCartFromLS';

interface ICartInitialState {
  totalPrice: number;
  items: ItemsType[];
}

export type ItemsType = {
  id: number;
  title: string;
  imageUrl: string;
  price: number;
  types: string;
  sizes: number;
  count: number;
};

const cartData = getCartFromLS();

const initialState: ICartInitialState = {
  items: cartData.items,
  totalPrice: cartData.totalPrice,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<ItemsType>) => {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return sum + obj.price * obj.count;
      }, 0);
    },
    minusItem: (state, action: PayloadAction<number>) => {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count--;
        state.totalPrice -= findItem.price;
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },
    clearItems: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const selectCart = (state: RootState) => state.cart;
export const selectCartById = (id: number) => (state: RootState) =>
  state.cart.items.find((obj) => obj.id === id);

export const { addItem, minusItem, removeItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
