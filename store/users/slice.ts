import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { State, User } from './type';

export const initialState: State = [
  {
    id: 1,
    name: 'Astrid',
    age: 15,
  },
];

const slice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addRequest(state, action: PayloadAction<User>) {
      console.log('addRequest ...');
    },
    addSuccess(state, action: PayloadAction<User>) {
      state.push(action.payload);
    },
    addFailure(state, action: PayloadAction<User>) {
      console.log('addRequest failure');
    },
    remove(state, action: PayloadAction<User>) {
      const userIndex = state.findIndex(user => user.id === action.payload.id);
      if (userIndex) state.slice(userIndex, 1);
    },
  },
});

export const { actions, reducer } = slice;
