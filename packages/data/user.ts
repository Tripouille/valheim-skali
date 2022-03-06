import { ObjectId } from 'bson';
import { Role } from './role';

export interface DefaultNextAuthUser {
  _id: string;
  name: string;
  email: string;
  image: string;
}

/** ObjectIds are automatically processed to strings
 * when sent from back to front */
export interface UserWithInfos extends DefaultNextAuthUser {
  nameInGame?: string;
  roleIds: Role['_id'][];
}

export type UserWithInfosInDb = Omit<UserWithInfos, 'roleIds'> & {
  roleIds: ObjectId[];
};

export type User = DefaultNextAuthUser | UserWithInfos;
export type UserInDb = DefaultNextAuthUser | UserWithInfosInDb;

export type UserWithoutId = Omit<UserWithInfos, '_id'>;

export const USER_NAME_IN_GAME_MAX_LENGTH = 20;

/** The only keys that can be updated */
export type UpdatedUserPartialData = {
  nameInGame?: UserWithInfos['nameInGame'];
  roleIds?: UserWithInfos['roleIds'];
};

/** Type guards */

export const isUserWithInfos = (user: User): user is UserWithInfos => 'roleIds' in user;

const isUpdatableUserDataProperty = ([key, value]: [key: string, value: unknown]) => {
  return (
    (key === 'nameInGame' && typeof value === 'string') ||
    (key === 'roleIds' && Array.isArray(value) && value.every(roleId => typeof roleId === 'string'))
  );
};
export const isUpdatableUserData = (data: unknown): data is UpdatedUserPartialData => {
  if (!data || typeof data !== 'object') return false;
  if (!Object.entries(data).every(isUpdatableUserDataProperty)) {
    return false;
  }
  return true;
};
