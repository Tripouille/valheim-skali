import { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import { UserInDb, usersCollectionName } from '@packages/data/user';
import { PermissionCategory, PermissionPrivilege } from '@packages/utils/auth';
import { requirePermissions } from '@packages/api/auth';
import db from '@packages/api/db';

const getUsers = async (req: Req, res: Res) => {
  await requirePermissions({ [PermissionCategory.USER]: PermissionPrivilege.READ }, req);

  const users = await db.find<UserInDb>(usersCollectionName);

  const usersWithoutEmail = users.map(({ email, ...rest }) => rest);

  res.status(200).json(usersWithoutEmail);
};

export default getUsers;
