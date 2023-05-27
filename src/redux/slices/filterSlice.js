import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchValue: '',
  category: 0,
  currentPage: 1,
  sort: {
    name: 'популярности',
    sortProperty: 'rating',
  },
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setFilters: (state, action) => {
      state.category = +action.payload.category;
      state.currentPage = +action.payload.page;
      state.sort = action.payload.sort;
    },
  },
});

export const selectFilter = (state) => state.filter;
export const selectFilterSortProperty = (state) =>
  state.filter.sort.sortProperty;

export const selectSort = (state) => state.filter.sort;

export const {
  setCategory,
  setSort,
  setCurrentPage,
  setFilters,
  setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;
