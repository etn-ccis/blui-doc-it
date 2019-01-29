import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import rootReducer from '../reducers';
import rootEpic from '../epics';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const epicMiddleware = createEpicMiddleware(rootEpic);

export default (initialState) => {
  const store = createStore(rootReducer, initialState, composeEnhancers(
    applyMiddleware(
      epicMiddleware
    )
  ));

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });

    module.hot.accept('../epics', () => {
      const rootEpic = require('../epics').default;
      epicMiddleware.replaceEpic(rootEpic);
    });
  }

  return store;
};