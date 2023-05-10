import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './pagination.module.scss';

const Pagination = ({ currentPage, onChangePage }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel='...'
      nextLabel='>'
      onPageChange={(e) => onChangePage(e.selected + 1)}
      //   pageRangeDisplayed={5}
      pageCount={3}
      initialPage={currentPage - 1}
      previousLabel='<'
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
