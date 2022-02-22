/* eslint-disable no-underscore-dangle */
import axios, { AxiosResponse } from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import { AddResponse, PullAllResponse } from '@packages/api/roles';
import { APIRoute } from '@packages/utils/routes';
import { actions } from './slice';
import { RoleWithoutId } from './type';

export function* pullRequestHandler() {
  const request = () => axios.get<PullAllResponse>(APIRoute.ROLES);

  try {
    const response: AxiosResponse<PullAllResponse> = yield call(request);
    yield put(actions.pullSuccess(response.data));
  } catch (error) {
    yield put(actions.pullFailure());
  }
}

export function* addRequestHandler({ payload }: ReturnType<typeof actions.addRequest>) {
  const request = (user: RoleWithoutId) => axios.post<AddResponse>(APIRoute.ROLES, user);

  try {
    const response: AxiosResponse<AddResponse> = yield call(request, payload);

    yield put(actions.addSuccess({ ...payload, _id: response.data._id }));
  } catch (error) {
    yield put(actions.addFailure());
  }
}

export function* removeRequestHandler({ payload }: ReturnType<typeof actions.removeRequest>) {
  const request = () => axios.delete(`${APIRoute.ROLES}/${payload._id}`);

  try {
    yield call(request);
    yield put(actions.removeSuccess(payload));
  } catch (error) {
    yield put(actions.removeFailure());
  }
}

function* watcher() {
  yield takeLatest(actions.pullRequest.type, pullRequestHandler);
  yield takeLatest(actions.addRequest.type, addRequestHandler);
  yield takeLatest(actions.removeRequest.type, removeRequestHandler);
}

export default watcher;
