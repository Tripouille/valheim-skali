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

/** The only keys that can be updated */
export interface UpdatedUserPartialData {
  nameInGame: string;
}

/** Type guards */

export const isUserWithInfos = (user: User): user is UserWithInfos => 'roles' in user;

const isUpdatableUserDataProperty = ([key, value]: [key: string, value: unknown]) => {
  return key === 'nameInGame' && typeof value === 'string';
};
export const isUpdatableUserData = (data: unknown): data is UpdatedUserPartialData => {
  if (!data || typeof data !== 'object') return false;
  if (!Object.entries(data).every(isUpdatableUserDataProperty)) {
    return false;
  }
  return true;
};
