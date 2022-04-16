import { ObjectId } from 'bson';
import { Role, RoleInDb } from './role';

export interface User {
  _id: string;
  name: string;
  email: string;
  image: string;
  nameInGame?: string;
  roleIds?: Role['_id'][];
}

export type UserInDb = Omit<User, '_id' | 'roleIds'> & {
  _id: ObjectId;
  roleIds?: RoleInDb['_id'][];
};

export const usersCollectionName = 'users';

export const USER_NAME_IN_GAME_MAX_LENGTH = 20;

/** The only keys that can be updated for a simple user patch */
export type UpdateUserData = {
  nameInGame: User['nameInGame'];
};

export type UpdateUserRolesData = { roleId: string };
