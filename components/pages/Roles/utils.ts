import { Role } from 'data/role';

export const getRoleFormData = (role: Role) => ({ ...role, _id: undefined });
