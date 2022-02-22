/* eslint-disable no-underscore-dangle */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { State, Role, RoleWithoutId } from './type';

export const initialState: State = [];

// Request actions variables are used by redux-saga
const slice = createSlice({
  name: 'roles',
  initialState,
  reducers: {
    pullRequest() {},
    pullSuccess(state, action: PayloadAction<State>) {
      return action.payload;
    },
    pullFailure() {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    addRequest(state, action: PayloadAction<RoleWithoutId>) {},
    addSuccess(state, action: PayloadAction<Role>) {
      state.push(action.payload);
    },
    addFailure() {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    removeRequest(state, action: PayloadAction<Role>) {},
    removeSuccess(state, action: PayloadAction<Role>) {
      const roleIndex = state.findIndex(role => role._id === action.payload._id);
      if (roleIndex !== -1) state.splice(roleIndex, 1);
    },
    removeFailure() {},
  },
});

export const { actions, reducer } = slice;
