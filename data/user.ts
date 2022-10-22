import { ObjectId } from 'bson';
import { UseSessionReturn } from 'hooks/useSession';
import { ApplicationInDb } from './application';
import { Role, RoleInDb } from './role';

/** Main types */

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

export type WithRolesAndApplications<T extends UserInDb> = T & {
  roles: RoleInDb[];
} & {
  applications: ApplicationInDb[];
};

export type UpdateUserData = {
  nameInGame: User['nameInGame'];
};

export type UpdateUserRolesData = { roleId: string };

/** Database */

export const usersCollectionName = 'users';

/** Validation */

export const USER_NAME_IN_GAME_MAX_LENGTH = 20;

/** Roles utils */

export const canUserAssignRole = (
  role: Role,
  hasRequiredPermissions: UseSessionReturn['hasRequiredPermissions'],
) => hasRequiredPermissions(role.requiredPermissionsToAssign);

export const getUserRoles = (user: User, roles: Role[]): (Role | undefined)[] =>
  user.roleIds ? user.roleIds.map(roleId => roles.find(role => role._id === roleId)) : [];
