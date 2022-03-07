import { hasOwnProperty } from '@packages/utils/types';
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

export const usersCollectionName = 'users';

export const USER_NAME_IN_GAME_MAX_LENGTH = 20;

/** The only keys that can be updated for a simple user patch */
export type UpdateUserData = {
  nameInGame: NonNullable<UserWithInfos['nameInGame']>;
};
export type UpdateUserRolesData = { roleId: string };

/** Type guards */

export const isUserWithInfos = (user: User): user is UserWithInfos =>
  hasOwnProperty(user, 'roleIds');
