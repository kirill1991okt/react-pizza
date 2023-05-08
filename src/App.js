import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';

import './scss/app.scss';

function App() {
  const [valueSearch, setValueSearch] = React.useState('');
  return (
    <div className='wrapper'>
      <Header valueSearch={valueSearch} setValueSearch={setValueSearch} />
      <div className='content'>
        <div className='container'>
          <Routes>
            <Route path='/' element={<Home valueSearch={valueSearch} />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
