import { Permissions } from '@packages/utils/auth';

export interface Role {
  _id: string;
  name: string;
  permissions: Permissions;
}

export type RoleWithoutId = Omit<Role, '_id'>;

export type State = Role[];
