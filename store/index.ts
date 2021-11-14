import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from '@redux-saga/core';
import { logger } from 'redux-logger';

import { all } from 'redux-saga/effects';
import { State as usersState } from './users/type';
import { reducer as usersReducer } from './users/slice';
import usersWatcher from './users/saga';

const reducer = {
  users: usersReducer,
};

function* watcherSaga() {
  yield all([usersWatcher()]);
}

export interface State {
  users: usersState;
}

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger, sagaMiddleware),
});
sagaMiddleware.run(watcherSaga);

export default store;
