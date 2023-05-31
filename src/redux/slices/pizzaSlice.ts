import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import { SortProperty } from './filterSlice';

type FetchPizzasParams = {
  currentPage: number;
  search: string;
  categoryParams: string;
  sortType: SortProperty;
};

export const fetchItems = createAsyncThunk<ItemsType[], FetchPizzasParams>(
  'pizza/fetchPizzas',
  async (params) => {
    const { currentPage, search, categoryParams, sortType } = params;
    const res = await axios.get<ItemsType[]>(
      `https://64528bf5bce0b0a0f749efb6.mockapi.io/items?page=${currentPage}&limit=4&${search}&${categoryParams}&sortBy=${sortType}`
    );
    return res.data;
  }
);

type ItemsType = {
  id: number;
  title: string;
  imageUrl: string;
  price: number;
  category: number;
  types: number[];
  sizes: number[];
  rating: number;
};

export enum Status {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface IPizzaInitialState {
  items: ItemsType[];
  loading: Status;
}

const initialState: IPizzaInitialState = {
  items: [],
  loading: Status.IDLE,
};

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<ItemsType[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.loading = Status.LOADING;
        state.items = [];
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = Status.SUCCESS;
      })
      .addCase(fetchItems.rejected, (state) => {
        state.loading = Status.ERROR;
        state.items = [];
      });
  },
});

export const selectPizza = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
