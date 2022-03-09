import { ObjectId } from 'bson';
import { Permissions, SpecialRoleName } from '@packages/utils/auth';

export interface Role {
  _id: string;
  name: string;
  permissions: Permissions;
  requiredPermissionsToAssign: Permissions;
}

export type RoleInDb = Omit<Role, '_id'> & {
  _id: ObjectId;
};

export type CreateRoleData = Omit<Role, '_id'>;
export type UpdateRoleData = Partial<Omit<Role, '_id'>>;

export const rolesCollectionName = 'roles';

export const ROLE_NAME_IN_GAME_MAX_LENGTH = 15;

export const compareRolesFromName = (role1?: Role, role2?: Role) => {
  if (role1 && role2) {
    if (role1.name === SpecialRoleName.SUPER_ADMIN || role2.name === SpecialRoleName.SUPER_ADMIN) {
      return role1.name === SpecialRoleName.SUPER_ADMIN ? -1 : 1;
    } else if (role1.name === SpecialRoleName.ADMIN || role2.name === SpecialRoleName.ADMIN) {
      return role1.name === SpecialRoleName.ADMIN ? -1 : 1;
    }
    return role1.name < role2.name ? -1 : 1;
  } else return 1;
};
