import React from 'react';

import style from './notFoundBlock.module.scss';

const NotFoundBlock = () => {
  console.log(style);
  return (
    <div className={style.root}>
      <span>😕</span>
      <br />
      <h1>Ничего не найдено</h1>
      <p className={style.description}>
        К сожалению данная страница отсутсвует на нашем сайте
      </p>
    </div>
  );
};

export default NotFoundBlock;
