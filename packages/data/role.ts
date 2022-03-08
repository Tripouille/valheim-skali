import { ObjectId } from 'bson';
import { Permissions, SpecialRoleName } from '@packages/utils/auth';

export interface Role {
  _id: string;
  name: string;
  permissions: Permissions;
  needAdminPermissionToAssign: boolean;
}

export type RoleInDb = Omit<Role, '_id'> & {
  _id: ObjectId;
};

export const rolesCollectionName = 'roles';

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
