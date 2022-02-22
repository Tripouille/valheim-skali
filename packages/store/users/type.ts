export interface DefaultNextAuthUser {
  _id: string;
  name: string;
  email: string;
  image: string;
}

export interface UserWithInfos extends DefaultNextAuthUser {
  nameInGame?: string;
  roles: string[];
}

export type User = DefaultNextAuthUser | UserWithInfos;

export type UserWithoutId = Omit<UserWithInfos, '_id'>;

export type State = User[];

/** Type guards */

export const isUserWithInfos = (user: User): user is UserWithInfos => 'roles' in user;
