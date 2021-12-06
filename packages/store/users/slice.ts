import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { State, User, UserWithoutId } from './type';

export const initialState: State = [];

// Request actions variables are used by redux-saga
const slice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    pullRequest() {},
    pullSuccess(state, action: PayloadAction<State>) {
      return action.payload;
    },
    pullFailure() {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    addRequest(state, action: PayloadAction<UserWithoutId>) {},
    addSuccess(state, action: PayloadAction<User>) {
      state.push(action.payload);
    },
    addFailure() {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    removeRequest(state, action: PayloadAction<User>) {},
    removeSuccess(state, action: PayloadAction<User>) {
      const userIndex = state.findIndex(user => user._id === action.payload._id);
      if (userIndex !== -1) state.splice(userIndex, 1);
    },
    removeFailure() {},
  },
});

export const { actions, reducer } = slice;
