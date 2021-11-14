import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { State, User, UserWithoutId } from './type';

export const initialState: State = [];

const slice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    pullRequest(state) {
      console.log('pullRequest ...', state);
    },
    pullSuccess(state, action: PayloadAction<State>) {
      console.log('pullSuccess ...', state, action);
      return action.payload;
    },
    pullFailure(state) {
      console.log('pullFailure ...', state);
    },
    addRequest(state, action: PayloadAction<UserWithoutId>) {
      console.log('addRequest ...', state, action);
    },
    addSuccess(state, action: PayloadAction<User>) {
      console.log('addSucess ...', state, action);

      state.push(action.payload);
    },
    addFailure(state, action: PayloadAction<UserWithoutId>) {
      console.log('addRequest failure', state, action);
    },
    remove(state, action: PayloadAction<User>) {
      const userIndex = state.findIndex(user => user._id === action.payload._id);
      if (userIndex) state.slice(userIndex, 1);
    },
  },
});

export const { actions, reducer } = slice;
