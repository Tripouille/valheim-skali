import { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import { requirePermissions } from 'api-utils/auth';
import { ServerException } from 'api-utils/common';
import db from 'api-utils/db';
import { RoleInDb, rolesCollectionName } from 'data/role';
import { PermissionCategory, rolePrivilege } from 'utils/permissions';
import { checkRoleData, isCreateRoleData, transformRoleForDb } from './utils';

const createRole = async (req: Req, res: Res) => {
  await requirePermissions({ [PermissionCategory.ROLE]: rolePrivilege.ADMIN }, req);

  const newRole: unknown = req.body;
  if (!isCreateRoleData(newRole)) throw new ServerException(400);

  transformRoleForDb(newRole);
  checkRoleData(newRole);

  /** Name cannot already exist */
  const sameNameRole = await db.findOne<RoleInDb>(rolesCollectionName, { name: newRole.name });
  if (sameNameRole) throw new ServerException(409);

  const newRoleId = await db.insert<RoleInDb>(rolesCollectionName, newRole);

  res.status(201).json({ ...newRole, _id: newRoleId });
};

export default createRole;
