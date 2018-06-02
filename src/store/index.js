import { createStore, combineReducers, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import * as home from './common/reducer'
import commonSaga from './common/sagas'

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  combineReducers({ ...home }),
  applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(commonSaga);

export default store