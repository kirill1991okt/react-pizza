import React from 'react';
import ContentLoader from 'react-content-loader';

const PizzaSkeleton: React.FC = () => (
  <ContentLoader
    className='pizza-block'
    speed={2}
    width={280}
    height={500}
    viewBox='0 0 280 466'
    backgroundColor='#f3f3f3'
    foregroundColor='#ecebeb'
  >
    <rect x='0' y='250' rx='10' ry='10' width='280' height='27' />
    <circle cx='128' cy='120' r='120' />
    <rect x='2' y='400' rx='10' ry='10' width='90' height='45' />
    <rect x='126' y='400' rx='10' ry='10' width='150' height='45' />
    <rect x='6' y='300' rx='9' ry='9' width='268' height='88' />
  </ContentLoader>
);

export default PizzaSkeleton;
