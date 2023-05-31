import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  ISort,
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
import { useAppDispatch } from '../redux/store';

interface IParamsKeys {
  [key: string]: string | number;
}

const Home: React.FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { category, currentPage, searchValue } = useSelector(selectFilter);
  const sortType = useSelector(selectFilterSortProperty);
  const { items, loading } = useSelector(selectPizza);
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const [searchParams, setSearchParams]: [URLSearchParams, Function] =
    useSearchParams();

  const onChangeCategory = (id: number) => {
    dispatch(setCategory(id));
  };

  const onChangeCurrentPage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const fetchPizzas = () => {
    const search = searchValue ? `search=${searchValue}` : '';
    const categoryParams = category > 0 ? `category=${category}` : '';

    dispatch(fetchItems({ currentPage, search, categoryParams, sortType }));

    window.scrollTo(0, 150);
  };

  React.useEffect(() => {
    if (location.search) {
      const params: IParamsKeys = {};
      searchParams.forEach((value, key) => (params[key] = value));

      const sort = sortList.find(
        (obj) => obj.sortProperty === params.sortBy
      ) as ISort;

      console.log(params);
      dispatch(
        setFilters({
          category: +params.category,
          currentPage: +params.currentPage,
          searchValue: searchValue,
          sort: sort || sortList[0],
        })
      );
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    if (isMounted.current) {
      setSearchParams({
        currentPage,
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
