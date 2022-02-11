import { Permission } from '@packages/utils/constants';

export interface Role {
  _id: string;
  name: string;
  permissions: Permission[];
}

export type RoleWithoutId = Omit<Role, '_id'>;

export type State = Role[];
