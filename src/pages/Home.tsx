import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectFilter,
  selectFilterSortProperty,
  setCategory,
  setCurrentPage,
  setFilters,
} from '../redux/slices/filterSlice';
import { fetchItems, selectPizza } from '../redux/slices/pizzaSlice';
import { useSearchParams, useLocation } from 'react-router-dom';

import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import PizzaSkeleton from '../components/PizzaSkeleton';
import Pagination from '../components/Pagination';

interface IParamsKeys {
  [key: string]: string | number;
}

const Home: React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { category, currentPage, searchValue } = useSelector(selectFilter);
  const sortType = useSelector(selectFilterSortProperty);
  const { items, loading } = useSelector(selectPizza);
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const onChangeCategory = (id: number) => {
    dispatch(setCategory(id));
  };

  const onChangeCurrentPage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const fetchPizzas = () => {
    const search = searchValue ? `search=${searchValue}` : '';
    const categoryParams = category > 0 ? `category=${category}` : '';

    dispatch(
      //@ts-ignore
      fetchItems({ currentPage, search, categoryParams, sortType })
    );

    window.scrollTo(0, 150);
  };

  React.useEffect(() => {
    if (location.search) {
      const params: IParamsKeys = {};
      searchParams.forEach((value, key) => (params[key] = value));

      const sort = sortList.find((obj) => obj.sortProperty === params.sortBy);

      dispatch(setFilters({ ...params, sort }));
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    if (isMounted.current) {
      setSearchParams({
        page: currentPage,
        category,
        sortBy: sortType,
      });
    }
    isMounted.current = true;
  }, [currentPage, category, sortType]);

  React.useEffect(() => {
    if (!isSearch.current) {
      fetchPizzas();
    }

    isSearch.current = false;
  }, [searchValue, currentPage, category, sortType]);

  const skeletons = [...new Array(4)].map((_, i) => <PizzaSkeleton key={i} />);
  const pizzas = items.map((pizza: any) => (
    <PizzaBlock key={pizza.id} {...pizza} />
  ));
  return (
    <>
      <div className='content__top'>
        <Categories categoryId={category} setCategoryId={onChangeCategory} />
        <Sort />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>
        {loading === 'error' ? (
          <div className='content__items-error'>
            <span>😕</span>
            <br />
            <h1>Упп... Произошла ошибка!</h1>
            <p>
              К сожалению не удалось получить пиццы, повторите попытку позжу...
            </p>
          </div>
        ) : loading === 'loading' ? (
          skeletons
        ) : (
          pizzas
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        onChangePage={onChangeCurrentPage}
      />
    </>
  );
};

export default Home;
