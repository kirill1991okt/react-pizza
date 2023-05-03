import React from 'react';

function Categories() {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const categories = [
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые',
  ];

  const onClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className='categories'>
      <ul>
        {categories.map((category, i) => {
          return (
            <li
              key={category}
              onClick={() => onClick(i)}
              className={activeIndex === i ? 'active' : null}
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
