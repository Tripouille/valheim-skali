import { ObjectId } from 'bson';
import { UseSessionReturn } from 'hooks/useSession';
import { Role, RoleInDb } from './role';

export interface User {
  _id: string;
  name: string;
  image: string;
  nameInGame?: string;
  roleIds?: Role['_id'][];
}

export type UserInDb = Omit<User, '_id' | 'roleIds'> & {
  _id: ObjectId;
  email: string;
  roleIds?: RoleInDb['_id'][];
};

export const usersCollectionName = 'users';

export const USER_NAME_IN_GAME_MAX_LENGTH = 20;

/** The only keys that can be updated for a simple user patch */
export type UpdateUserData = {
  nameInGame: User['nameInGame'];
};

export type UpdateUserRolesData = { roleId: string };

/** User roles utils */

export const canUserAssignRole = (
  role: Role,
  hasRequiredPermissions: UseSessionReturn['hasRequiredPermissions'],
) => hasRequiredPermissions(role.requiredPermissionsToAssign);

export const getUserRoles = (user: User, roles: Role[]): (Role | undefined)[] =>
  user.roleIds ? user.roleIds.map(roleId => roles.find(role => role._id === roleId)) : [];
