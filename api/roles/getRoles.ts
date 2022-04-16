import { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import { RoleInDb, rolesCollectionName } from 'data/role';
import { PermissionCategory, PermissionPrivilege, SpecialRoleName } from 'utils/auth';
import { ServerException } from '../common';
import { requirePermissions } from '../auth';
import db from '../db';

const getRoles = async (req: Req, res: Res) => {
  await requirePermissions({ [PermissionCategory.ROLE]: PermissionPrivilege.READ }, req);

  const roles = await db.find<RoleInDb>(rolesCollectionName);

  try {
    await requirePermissions({ [PermissionCategory.ROLE]: PermissionPrivilege.SUPER_ADMIN }, req);
    res.status(200).json(roles);
  } catch (e) {
    if (e instanceof ServerException) {
      res.status(200).json(roles.filter(role => role.name !== SpecialRoleName.SUPER_ADMIN));
    } else throw e;
  }
};

export default getRoles;
