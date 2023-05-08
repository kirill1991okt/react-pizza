import React from 'react';

function Categories({ categoryId, setCategoryId }) {
  const categories = [
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые',
  ];

  const onClick = (index) => {
    setCategoryId(index);
  };

  return (
    <div className='categories'>
      <ul>
        {categories.map((category, i) => {
          return (
            <li
              key={category}
              onClick={() => onClick(i)}
              className={categoryId === i ? 'active' : null}
            >
              {category}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Categories;
