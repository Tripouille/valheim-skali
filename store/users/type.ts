export interface User {
  _id: string;
  name: string;
  email: string;
  image: string;
}

export type UserWithoutId = Omit<User, '_id'>;

export type State = User[];
