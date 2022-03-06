import { Permissions } from '@packages/utils/auth';

export interface Role {
  _id: string;
  name: string;
  permissions: Permissions;
}

export type RoleWithoutId = Omit<Role, '_id'>;

export const rolesCollectionName = 'roles';

export const compareRolesFromName = (role1?: Role, role2?: Role) => {
  if (role1 && role2) return role1.name < role2.name ? -1 : 1;
  else return 1;
};
