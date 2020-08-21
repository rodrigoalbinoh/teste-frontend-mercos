import React from 'react';

import Cart from './pages/Cart';

import GlobalStyle from './styles/global';
import Header from './components/Header';
import HeaderInformationBar from './components/HeaderInformationBar';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <HeaderInformationBar />
      <Cart />
      <GlobalStyle />
    </>
  );
};

export default App;
