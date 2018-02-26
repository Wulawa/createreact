import React from 'react'
import Loadable from 'react-loadable'
import {
  Switch,
  Route,
} from 'react-router-dom'
// import { CSSTransitionGroup  } from "react-transition-group";
const LoadingComponent = () => <div>Loading...</div>
const home = Loadable({
  loader: () => import('./home'),
  loading:LoadingComponent
})
const news = Loadable({
  loader: () => import('./news'),
  loading:LoadingComponent
})
const mine = Loadable({
  loader: () => import('./mine'),
  loading:LoadingComponent
})
const create = Loadable({
  loader: () => import('./create'),
  loading:LoadingComponent
})

const routes = [
  {
    path: "/",
    exact: true,
    component: home
  },
  {
    path: "/news/:id",
    component: news
  },
  {
    path: "/create",
    component: create
  },
  {
    path: "/mine",
    component: mine
  }
];

const RouteWithSubRoutes = route => (
  <Route
    path={route.path}
    render={props => (
      <route.component {...props} routes={route.routes} />
    )}
  />
);

export default () => (
  <Switch>
    {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
  </Switch>
)