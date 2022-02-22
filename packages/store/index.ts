import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from '@redux-saga/core';
import { createLogger } from 'redux-logger';

import { all } from 'redux-saga/effects';
import { State as usersState } from './users/type';
import { reducer as usersReducer } from './users/slice';
import usersWatcher from './users/saga';
import { State as rolesState } from './roles/type';
import { reducer as rolesReducer } from './roles/slice';
import rolesWatcher from './roles/saga';

const reducer = {
  users: usersReducer,
  roles: rolesReducer,
};

function* watcherSaga() {
  yield all([usersWatcher(), rolesWatcher()]);
}

export interface State {
  users: usersState;
  roles: rolesState;
}

const logger = createLogger({ collapsed: true });
const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger, sagaMiddleware),
});
sagaMiddleware.run(watcherSaga);

export default store;
