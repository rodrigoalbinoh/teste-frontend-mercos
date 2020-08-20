import React from 'react';

import Cart from './pages/Cart';
import Header from './components/Header';

import GlobalStyle from './styles/global';

function App() {
  return (
    <>
      <Header />
      <Cart />
      <GlobalStyle />
    </>
  );
}

export default App;
