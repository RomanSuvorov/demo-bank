import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { routes, routesList } from '../../constants';

export default function() {
  return (
    <Switch>
      {
        routesList.map(({ path, key, Component, exact }) => (
          <Route path={path} key={key} exact={exact}>
            <Component />
          </Route>
        ))
      }
      <Redirect from={"*"} to={routes.DEFAULT.path} />
    </Switch>
  )
}
