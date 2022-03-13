import theme from '@packages/theme';
import { Role } from '@packages/data/role';
import { User } from '@packages/data/user';
import { UseSessionReturn } from '@packages/utils/hooks/useSession';

export const tableSize = 'sm';
export const cellXPadding = theme.sizes[theme.components.Table.sizes[tableSize].td.px]; // 1rem
export const avatarSize = 60;
export const rowIconSize = 'lg';
export const rowIconWidth = theme.sizes[theme.components.Button.sizes[rowIconSize].minW]; // 3rem
export const adminTableStyleProps = {
  variant: 'striped',
  size: tableSize,
  w: { base: '100%', md: '90%', xl: '70%' },
  margin: 'auto',
  sx: { tableLayout: 'fixed' },
};
export const darkerBackgroundColor = 'rgba(0, 0, 0, 0.08)';
export const modalTableHeaderWidth = '20%';

export const getCellWidth = (contentWidth: string) => `calc(${contentWidth} + 2 * ${cellXPadding})`;

export enum UserQueryFilter {
  MEMBER = 'member',
  NON_MEMBER = 'non_member',
}

export const getUserRoles = (user: User, roles: Role[]): (Role | undefined)[] =>
  user.roleIds ? user.roleIds.map(roleId => roles.find(role => role._id === roleId)) : [];

export const canUserAssignRole = (
  role: Role,
  hasRequiredPermissions: UseSessionReturn['hasRequiredPermissions'],
) => hasRequiredPermissions(role.requiredPermissionsToAssign);

export const getRoleFormData = (role: Role) => ({ ...role, _id: undefined });
