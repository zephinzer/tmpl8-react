import React from 'react';
import {combineReducers, createStore, applyMiddleware} from 'redux';
import {connect, Provider} from 'react-redux';

// ABOVE REQUIRED - EDIT BELOW THIS LINE

// include all ducks
import {PageRouterRedux} from '~/src/Pages/Router';

// set up reducers
export const reducers = [
  PageRouterRedux.reducer,
];

// set up middlewares
export const middlewares = [
  PageRouterRedux.middleware,
].map((middleware) => applyMiddleware(middleware));

// set up dispatchers
export const dispatchers = [
  PageRouterRedux.dispatchers,
];

// BELOW REQUIRED - EDIT ABOVE THIS LINE

export const store = createStore(
  combineReducers(reducers.reduce((c, reducer) => {
    return {[reducer.key]: reducer.reducer};
  }, {})),
  applyMiddleware(PageRouterRedux.middleware)
);

export const mapStateToProps = (keys) => (
  (state) => (
    (keys instanceof Array) ? keys.reduce(
      (c, key) => (
        {[key]: (state[key])}
      ), {}) : state
  )
);

export const mapDispatchToProps = (dispatch) => (
  dispatchers.reduce((currentState, dispatcher) => (
    {...dispatcher(dispatch)}
  ), {})
);

export const provideStoreFor = (Component) => (
  <Provider store={store}>
    <Component />
  </Provider>
);

export const connectComponent = (Component, requiredKeys) => {
  return connect(
    mapStateToProps(requiredKeys),
    mapDispatchToProps
  )(Component);
};

export default {
  store,
  reducers,
  middlewares,
  mapStateToProps,
  mapDispatchToProps,
  provideStoreFor,
  connectComponent,
};
