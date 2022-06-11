import { IncomingMessage } from 'http';
import { getSession } from 'next-auth/react';
import { ServerException } from 'api-utils/common';
import db from 'api-utils/db';
import { UserInDb } from 'data/user';
import {
  ADMIN_ROLE_TO_PRIVILEGE,
  isAdminRole,
  RoleInDb,
  rolesCollectionName,
  SpecialRoleName,
} from 'data/role';
import {
  permissionsMeetRequirement,
  PermissionCategory,
  CommonPermissionPrivilege,
  Permissions,
} from 'utils/permissions';

export const getVisitorPermissions = async (): Promise<Permissions> => {
  const visitorRole = await db.findOne<RoleInDb>(
    rolesCollectionName,
    { name: SpecialRoleName.VISITOR },
    { projection: { _id: 0, permissions: 1 } },
  );

  if (!visitorRole) {
    console.error('Visitor role not found');
    return {};
  }

  return visitorRole.permissions;
};

const getPermissionsFromRequest = async (req: IncomingMessage) => {
  const session = await getSession({ req });
  if (session) return session.permissions;
  const visitorPermissions = await getVisitorPermissions();
  return visitorPermissions;
};

export const requirePermissions = async (
  requiredPermissions: Permissions,
  req: IncomingMessage,
) => {
  const permissions = await getPermissionsFromRequest(req);
  if (!permissionsMeetRequirement(permissions, requiredPermissions)) {
    throw new ServerException(401);
  }
};

const assignPermission = <C extends PermissionCategory>(
  userPermissions: Permissions,
  category: C,
  privilege: Permissions[C],
) => {
  if (privilege !== undefined) {
    const actualUserPermissionForCategory =
      userPermissions[category] ?? CommonPermissionPrivilege.NONE;
    userPermissions[category] =
      actualUserPermissionForCategory > privilege ? actualUserPermissionForCategory : privilege;
  }
};

export const getUserPermissions = async (user: UserInDb) => {
  const userPermissions: Permissions = await getVisitorPermissions();
  const userRoles: RoleInDb[] = await db.find<RoleInDb>(rolesCollectionName, {
    _id: { $in: user.roleIds ?? [] },
  });
  userRoles.forEach(role => {
    if (isAdminRole(role)) {
      Object.values(PermissionCategory).forEach(category => {
        userPermissions[category] = ADMIN_ROLE_TO_PRIVILEGE[role.name];
      });
    } else {
      Object.entries(role.permissions).forEach(([category, privilege]) => {
        assignPermission(userPermissions, category as PermissionCategory, privilege);
      });
    }
  });

  return userPermissions;
};
