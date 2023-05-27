import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './pagination.module.scss';

type PaginationProps = {
  currentPage: number;
  onChangePage: (num: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  onChangePage,
}) => {
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
