import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setCategory,
  setCurrentPage,
  setFilters,
} from '../redux/slices/filterSlice';
import axios from 'axios';
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
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const onChangeCategory = (id) => {
    dispatch(setCategory(id));
  };

  const onChangeCurrentPage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const fetchPizzas = () => {
    setIsLoading(true);

    const search = valueSearch ? `search=${valueSearch}` : '';
    const categoryParams = category > 0 ? `category=${category}` : '';

    axios
      .get(
        `https://64528bf5bce0b0a0f749efb6.mockapi.io/items?page=${currentPage}&limit=4&${search}&${categoryParams}&sortBy=${sortType}`
      )
      .then((res) => {
        setItems(res.data);
        console.log(res.data);
        setIsLoading(false);
        window.scrollTo(0, 150);
      });
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
      console.log(sortType);
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
      <div className='content__items'>{isLoading ? skeletons : pizzas}</div>
      <Pagination
        currentPage={currentPage}
        onChangePage={onChangeCurrentPage}
      />
    </>
  );
};

export default Home;
