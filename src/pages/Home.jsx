import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setCategory,
  setCurrentPage,
  setFilters,
} from '../redux/slices/filterSlice';
import { fetchItems } from '../redux/slices/pizzaSlice';
import { useSearchParams } from 'react-router-dom';

import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import PizzaSkeleton from '../components/PizzaSkeleton';
import Pagination from '../components/Pagination';

const Home = ({ valueSearch }) => {
  const dispatch = useDispatch();
  const { category, currentPage } = useSelector((state) => state.filter);
  const sortType = useSelector((state) => state.filter.sort.sortProperty);
  const { items, loading } = useSelector((state) => state.pizza);
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const onChangeCategory = (id) => {
    dispatch(setCategory(id));
  };

  const onChangeCurrentPage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const fetchPizzas = () => {
    const search = valueSearch ? `search=${valueSearch}` : '';
    const categoryParams = category > 0 ? `category=${category}` : '';

    dispatch(fetchItems({ currentPage, search, categoryParams, sortType }));

    window.scrollTo(0, 150);
  };

  React.useEffect(() => {
    if (window.location.search) {
      const params = {};
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
  }, [valueSearch, currentPage, category, sortType]);

  const skeletons = [...new Array(4)].map((_, i) => <PizzaSkeleton key={i} />);
  const pizzas = items.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />);
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
