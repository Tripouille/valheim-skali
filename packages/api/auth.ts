import { IncomingMessage } from 'http';
import { getSession } from 'next-auth/react';
import { UserInDb } from '@packages/data/user';
import { RoleInDb, rolesCollectionName } from '@packages/data/role';
import {
  Permissions,
  permissionsMeetRequirement,
  PermissionCategory,
  PermissionPrivilege,
  isAdminRole,
  ADMIN_ROLE_TO_PRIVILEGE,
  SpecialRoleName,
} from '@packages/utils/auth';
import { ServerException } from '@packages/api/common';
import db from '@packages/api/db';

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

export const requirePermissions = async (
  requiredPermissions: Permissions,
  req: IncomingMessage,
) => {
  const session = await getSession({ req });
  if (session) {
    if (!permissionsMeetRequirement(session.permissions, requiredPermissions)) {
      throw new ServerException(401);
    }
  } else {
    const visitorPermissions = await getVisitorPermissions();
    if (!permissionsMeetRequirement(visitorPermissions, requiredPermissions)) {
      throw new ServerException(401);
    }
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
