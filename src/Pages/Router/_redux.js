import createHistory from 'history/createBrowserHistory';
import {routerMiddleware, routerReducer, push} from 'react-router-redux';

export const history = createHistory();
export const middleware = routerMiddleware(history);
export const reducer = {
    key: 'router',
    reducer: routerReducer,
  };
export const dispatchers = (dispatch) => ({
    linkTo: (path) => dispatch(push(path)),
  });

export default {
  history,
  middleware,
  reducer,
  dispatchers,
};
