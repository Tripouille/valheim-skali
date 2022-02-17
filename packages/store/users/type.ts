export interface User {
  _id: string;
  name: string;
  email: string;
  image: string;
  roles?: string[];
}

export type UserWithoutId = Omit<User, '_id'>;

export type State = User[];
