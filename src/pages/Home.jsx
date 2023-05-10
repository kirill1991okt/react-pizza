import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCategory, setCurrentPage } from '../redux/slices/filterSlice';
import axios from 'axios';
import qs from 'qs';
import {
  useNavigate,
  useSearchParams,
  useLocation,
  useParams,
} from 'react-router-dom';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import PizzaSkeleton from '../components/PizzaSkeleton';
import Pagination from '../components/Pagination';

const Home = ({ valueSearch }) => {
  const dispatch = useDispatch();
  const { category, currentPage } = useSelector((state) => state.filter);
  const sortType = useSelector((state) => state.filter.sort.sortProperty);

  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { param } = useParams();

  const onChangeCategory = (id) => {
    dispatch(setCategory(id));
  };

  const onChangeCurrentPage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const search = valueSearch ? `search=${valueSearch}` : '';
  const categoryParams = category > 0 ? `category=${category}` : '';

  console.log(useLocation());

  React.useEffect(() => {}, []);

  //* Правильная сортировка в 9 уроке.
  React.useEffect(() => {
    axios
      .get(
        `https://64528bf5bce0b0a0f749efb6.mockapi.io/items?page=${currentPage}&limit=4&${search}&${categoryParams}&sortBy=${sortType}`
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
        window.scrollTo(0, 0);
      });
  }, [valueSearch, currentPage, category, sortType]);

  React.useEffect(() => {
    // const queryString = qs.stringify(
    //   {
    //     page: currentPage,
    //     category,
    //     sortBy: sortType,
    //     limit: 4,
    //   },
    //   { addQueryPrefix: true }
    // );

    setSearchParams({
      page: currentPage,
      category,
      sortBy: sortType,
      limit: 4,
    });
    // navigate(queryString);
  }, [currentPage, category, sortType]);

  const skeletons = [...new Array(6)].map((_, i) => <PizzaSkeleton key={i} />);
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
