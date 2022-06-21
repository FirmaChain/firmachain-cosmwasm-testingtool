import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import { Home } from '../pages';

const routePublic = (path: string, component: React.FC) => ({
  path,
  component,
  auth: false,
});

const routes = {
  Home: routePublic('/', Home),
};

interface IProps {
  auth: boolean;
  exact: boolean;
  path: string;
  component: React.FC;
}

const CustomRoute = ({ auth, component: Component, ...p }: IProps) => {
  const renderFunc = (props: any) => {
    return <Component {...props} />;
  };

  return <Route {...p} render={renderFunc} />;
};

const route = () => (
  <Switch>
    {Object.values(routes).map((x, i) => (
      <CustomRoute key={i} exact path={x.path} component={x.component} auth={x.auth} />
    ))}
    <Route render={() => <Redirect to='/' />} />
  </Switch>
);

export default route;
