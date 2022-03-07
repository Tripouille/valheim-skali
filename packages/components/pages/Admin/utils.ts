import theme from '@packages/theme';
import { Role } from '@packages/data/role';
import { User } from '@packages/data/user';
import { isSpecialRoleName, SpecialRolesParameters } from '@packages/utils/auth';
import { UseSessionReturn } from '@packages/utils/hooks/useSession';

export const tableSize = 'sm';
export const cellXPadding = theme.sizes[theme.components.Table.sizes[tableSize].td.px]; // 1rem
export const avatarSize = 60;
export const rowIconSize = 'lg';
export const rowIconWidth = theme.sizes[theme.components.Button.sizes[rowIconSize].minW]; // 3rem

export const getCellWidth = (contentWidth: string) => `calc(${contentWidth} + 2 * ${cellXPadding})`;

export const getUserRoles = (user: User, roles: Role[]) =>
  user.roleIds ? user.roleIds.map(roleId => roles.find(role => role._id === roleId)) : [];

export const canUserAssignRole = (
  role: Role,
  hasRequiredPermissions: UseSessionReturn['hasRequiredPermissions'],
) => {
  if (
    isSpecialRoleName(role.name) &&
    !hasRequiredPermissions(SpecialRolesParameters[role.name].canAssign)
  )
    return false;
  return true;
};
