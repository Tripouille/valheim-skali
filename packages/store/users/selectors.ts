import { State } from '@packages/store';

const selectUsers = (state: State) => state.users;

export default selectUsers;
