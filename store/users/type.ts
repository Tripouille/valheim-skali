export interface User {
  _id: string;
  name: string;
  age: number;
}

export type UserWithoutId = Omit<User, '_id'>;

export type State = User[];
