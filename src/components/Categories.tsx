import React from 'react';

type CategoriesProps = {
  categoryId: number;
  setCategoryId: (index: number) => void;
};

const Categories: React.FC<CategoriesProps> = React.memo(
  ({ categoryId, setCategoryId }) => {
    const categories = [
      'Все',
      'Мясные',
      'Вегетарианская',
      'Гриль',
      'Острые',
      'Закрытые',
    ];

    return (
      <div className='categories'>
        <ul>
          {categories.map((category, i) => {
            return (
              <li
                key={category}
                onClick={() => setCategoryId(i)}
                className={categoryId === i ? 'active' : ''}
              >
                {category}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
);

export default Categories;
