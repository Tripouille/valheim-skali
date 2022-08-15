import { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import { getPermissionsFromRequest, requirePermissions } from 'api-utils/auth';
import db from 'api-utils/db';
import { RoleInDb, rolesCollectionName, SpecialRoleName } from 'data/role';
import { PermissionCategory, permissionsMeetRequirement, rolePrivilege } from 'utils/permissions';

const getRoles = async (req: Req, res: Res) => {
  await requirePermissions({ [PermissionCategory.ROLE]: rolePrivilege.READ }, req);

  const roles = await db.find<RoleInDb>(rolesCollectionName);

  const userPermissions = await getPermissionsFromRequest(req);
  if (
    permissionsMeetRequirement(userPermissions, {
      [PermissionCategory.ROLE]: rolePrivilege.SUPER_ADMIN,
    })
  ) {
    res.status(200).json(roles);
  } else {
    res.status(200).json(roles.filter(role => role.name !== SpecialRoleName.SUPER_ADMIN));
  }
};

export default getRoles;
