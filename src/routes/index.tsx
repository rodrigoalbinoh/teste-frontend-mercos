import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Cart from '../pages/Cart';

const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/" component={Cart} />
  </Switch>
);

export default Routes;
