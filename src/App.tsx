import React from 'react';

import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';

import GlobalStyle from './styles/global';
import AppProvider from './hooks';
import Header from './components/Header';
import HeaderInformationBar from './components/HeaderInformationBar';

const App: React.FC = () => {
  return (
    <Router>
      <AppProvider>
        <Header />
        <HeaderInformationBar />
        <Routes />
      </AppProvider>

      <GlobalStyle />
    </Router>
  );
};

export default App;
