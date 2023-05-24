import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchItems = createAsyncThunk(
  'pizza/fetchPizzas',
  async ({ currentPage, search, categoryParams, sortType }) => {
    const res = await axios.get(
      `https://64528bf5bce0b0a0f749efb6.mockapi.io/items?page=${currentPage}&limit=4&${search}&${categoryParams}&sortBy=${sortType}`
    );
    return res.data;
  }
);

const initialState = {
  items: [],
  loading: 'idle',
};

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.loading = 'loading';
        state.items = [];
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = 'success';
      })
      .addCase(fetchItems.rejected, (state) => {
        state.loading = 'error';
        state.items = [];
      });
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
