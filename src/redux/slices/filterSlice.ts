import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface IFilterInitialState {
  searchValue: string;
  category: number;
  currentPage: number;
  sort: ISort;
}

export interface ISort {
  name: string;
  sortProperty: SortProperty;
}

export enum SortProperty {
  TITLE = 'title',
  PRICE = 'price',
  RATING = 'rating',
}

const initialState: IFilterInitialState = {
  searchValue: '',
  category: 0,
  currentPage: 1,
  sort: {
    name: 'популярности',
    sortProperty: SortProperty.RATING,
  },
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setCategory: (state, action: PayloadAction<number>) => {
      state.category = action.payload;
    },
    setSort: (state, action: PayloadAction<ISort>) => {
      state.sort = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setFilters: (state, action: PayloadAction<IFilterInitialState>) => {
      state.category = +action.payload.category;
      state.currentPage = +action.payload.currentPage;
      state.sort = action.payload.sort;
    },
  },
});

export const selectFilter = (state: RootState) => state.filter;
export const selectFilterSortProperty = (state: RootState) =>
  state.filter.sort.sortProperty;

export const selectSort = (state: RootState) => state.filter.sort;

export const {
  setCategory,
  setSort,
  setCurrentPage,
  setFilters,
  setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;
