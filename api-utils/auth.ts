import { IncomingMessage } from 'http';
import { getSession } from 'next-auth/react';
import { UserInDb } from 'data/user';
import { RoleInDb, rolesCollectionName } from 'data/role';
import {
  Permissions,
  permissionsMeetRequirement,
  PermissionCategory,
  PermissionPrivilege,
  isAdminRole,
  ADMIN_ROLE_TO_PRIVILEGE,
  SpecialRoleName,
} from 'utils/auth';
import { ServerException } from 'api-utils/common';
import db from 'api-utils/db';

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

export const getPermissionsFromReq = async (req: IncomingMessage) => {
  const session = await getSession({ req });
  if (session) return session.permissions;
  const visitorPermissions = await getVisitorPermissions();
  return visitorPermissions;
};

export const requirePermissions = async (
  requiredPermissions: Permissions,
  req: IncomingMessage,
) => {
  const permissions = await getPermissionsFromReq(req);
  if (!permissionsMeetRequirement(permissions, requiredPermissions)) {
    throw new ServerException(401);
  }
};

export const getUserPermissions = async (user: UserInDb) => {
  const userPermissions: Permissions = await getVisitorPermissions();
  const userRoles: RoleInDb[] = await db.find(rolesCollectionName, {
    _id: { $in: user.roleIds ?? [] },
  });
  userRoles.forEach(role => {
    if (isAdminRole(role)) {
      Object.values(PermissionCategory).forEach(category => {
        userPermissions[category] = ADMIN_ROLE_TO_PRIVILEGE[role.name];
      });
    } else {
      (Object.entries(role.permissions) as [PermissionCategory, PermissionPrivilege][]).forEach(
        ([category, privilege]) => {
          if (privilege !== undefined) {
            const actualUserPermissionForCategory =
              userPermissions[category] ?? PermissionPrivilege.NONE;
            userPermissions[category] =
              actualUserPermissionForCategory > privilege
                ? actualUserPermissionForCategory
                : privilege;
          }
        },
      );
    }
  });

  return userPermissions;
};
