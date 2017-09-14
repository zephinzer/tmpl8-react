import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {ConnectedRouter} from 'react-router-redux';
import {history} from './_redux';

export function asyncLoadComplete(Component) {
  this.Component = Component; //eslint-disable-line
  this.forceUpdate(); //eslint-disable-line
};

export function renderIfNotNull(Component) {
  return ((Component) ? <Component.default /> : null);
}

export class PageDiscover extends React.Component {
  componentWillMount() {
    import('../Discover').then(asyncLoadComplete.bind(this));
  }

  render() {
    return renderIfNotNull(this.Component);
  }
};

export class PageHome extends React.Component {
  componentWillMount() {
    import('../Home').then(asyncLoadComplete.bind(this));
  }

  render() {
    return renderIfNotNull(this.Component);
  }
};

export const asyncPages = [
  {
    path: '/discover',
    component: PageDiscover,
  },
  {
    path: '/',
    component: PageHome,
  },
];

export default function Router() {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        {asyncPages.map((page) => (
          <Route
            component={page.component}
            key={page.path}
            path={page.path}
          />
        ))}
      </Switch>
    </ConnectedRouter>
  );
};
