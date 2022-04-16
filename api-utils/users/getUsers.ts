import { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import { UserInDb, usersCollectionName } from 'data/user';
import { PermissionCategory, PermissionPrivilege } from 'utils/auth';
import { requirePermissions } from 'api-utils/auth';
import db from 'api-utils/db';

const getUsers = async (req: Req, res: Res) => {
  await requirePermissions({ [PermissionCategory.USER]: PermissionPrivilege.READ }, req);

  const users = await db.find<UserInDb>(usersCollectionName);

  const usersWithoutEmail = users.map(({ email, ...rest }) => rest);

  res.status(200).json(usersWithoutEmail);
};

export default getUsers;
