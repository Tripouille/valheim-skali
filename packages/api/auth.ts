import { NextApiRequest as Req } from 'next';
import { getSession } from 'next-auth/react';
import { UserInDb } from '@packages/data/user';
import { RoleInDb, rolesCollectionName } from '@packages/data/role';
import {
  Permissions,
  userHasRequiredPermissions,
  isSpecialRoleName,
  PermissionCategory,
  PermissionPrivilege,
  SpecialRoleName,
  SpecialRolesParameters,
} from '@packages/utils/auth';
import { ServerException } from '@packages/api/common';
import db from '@packages/api/db';

export const requirePermissions = async (requiredPermissions: Permissions, req: Req) => {
  const session = await getSession({ req });
  if (!session || !userHasRequiredPermissions(session.permissions, requiredPermissions)) {
    throw new ServerException(401);
  }
};

export const getUserPermissions = async (user: UserInDb) => {
  const userRoles: RoleInDb[] = await db.find(rolesCollectionName, {
    _id: { $in: user.roleIds ?? [] },
  });
  const userPermissions: Permissions = {};
  userRoles.forEach(role => {
    if (isSpecialRoleName(role.name) && SpecialRolesParameters[role.name].specialPrivilege) {
      Object.values(PermissionCategory).forEach(category => {
        userPermissions[category] =
          SpecialRolesParameters[role.name as SpecialRoleName].specialPrivilege;
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
