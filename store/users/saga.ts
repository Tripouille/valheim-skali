import axios from 'axios';
import { call, put } from 'redux-saga/effects';
import { actions } from './slice';
import { User } from './type';

export function* addRequestHandler(action: any) {
  const request = (user: User) => axios.post('/api/create-user', user);

  try {
    const response: Promise<User> = yield call(request, action.payload);
    yield put(actions.addSuccess(action.payload));
  } catch (error) {
    console.log(action.type, error);
    yield put(actions.addFailure(action.payload));
  }
}
