import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home';

import './scss/app.scss';

const Cart = React.lazy(
  () => import(/* webpackChunkName: 'Cart'*/ './pages/Cart')
);
const NotFound = React.lazy(
  () => import(/* webpackChunkName: 'NotFound'*/ './pages/NotFound')
);

function App() {
  return (
    <div className='wrapper'>
      <Header />
      <div className='content'>
        <div className='container'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route
              path='/cart'
              element={
                <Suspense fallback={<div>Идет загрузка страницы...</div>}>
                  <Cart />
                </Suspense>
              }
            />
            <Route
              path='*'
              element={
                <Suspense fallback={<div>Идет загрузка страницы...</div>}>
                  <NotFound />
                </Suspense>
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
