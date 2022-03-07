import { hasOwnProperty } from '@packages/utils/types';
import { ObjectId } from 'bson';
import { Role, RoleInDb } from './role';

export interface DefaultNextAuthUser {
  _id: string;
  name: string;
  email: string;
  image: string;
}

export type DefaultNextAuthUserInDb = Omit<DefaultNextAuthUser, '_id'> & {
  _id: ObjectId;
};

export interface UserWithInfos extends DefaultNextAuthUser {
  nameInGame?: string;
  roleIds: Role['_id'][];
}

export interface UserWithInfosInDb extends DefaultNextAuthUserInDb {
  nameInGame?: string;
  roleIds: RoleInDb['_id'][];
}

export type User = DefaultNextAuthUser | UserWithInfos;
export type UserInDb = DefaultNextAuthUserInDb | UserWithInfosInDb;

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
