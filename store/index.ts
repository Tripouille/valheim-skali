import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from '@redux-saga/core';
import { logger } from 'redux-logger';

import { State as usersState } from './users/type';
import { actions as usersAction, reducer as usersReducer } from './users/slice';
import { takeLatest } from 'redux-saga/effects';
import { addRequestHandler } from './users/saga';

const reducer = {
  users: usersReducer,
};

function* watcherSaga() {
  yield takeLatest(usersAction.addRequest.type, addRequestHandler);
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
