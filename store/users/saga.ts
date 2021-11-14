import axios, { AxiosResponse } from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import { Response as addRequestResponse } from 'api/create-user';
import { Response as pullRequestResponse } from 'api/users';
import { actions } from './slice';
import { User, UserWithoutId } from './type';

export function* addRequestHandler(action: ReturnType<typeof actions.addRequest>) {
  const request = (user: UserWithoutId) => axios.post<addRequestResponse>('/api/create-user', user);

  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const response: AxiosResponse<addRequestResponse> = yield call(request, action.payload);
    console.log(response);
    yield put(actions.addSuccess({ ...action.payload, _id: response.data._id }));
  } catch (error) {
    console.log(action.type, error);
    yield put(actions.addFailure(action.payload));
  }
}

export function* pullRequestHandler() {
  const request = () => axios.get<User[]>('/api/users');

  try {
    const response: AxiosResponse<pullRequestResponse> = yield call(request);
    console.log('rep', response);
    yield put(actions.pullSuccess(response.data));
  } catch (error) {
    yield put(actions.pullFailure());
  }
}

function* watcher() {
  yield takeLatest(actions.addRequest.type, addRequestHandler);
  yield takeLatest(actions.pullRequest.type, pullRequestHandler);
}

export default watcher;
