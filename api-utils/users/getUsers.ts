import { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import { getPermissionsFromRequest } from 'api-utils/auth';
import db from 'api-utils/db';
import { UserInDb, usersCollectionName } from 'data/user';
import { PermissionCategory, permissionsMeetRequirement, rolePrivilege } from 'utils/permissions';

const getUsers = async (req: Req, res: Res) => {
  const users = await db.find<UserInDb>(usersCollectionName);

  const userPermissions = await getPermissionsFromRequest(req);
  const hasRoleReadPermission = permissionsMeetRequirement(userPermissions, {
    [PermissionCategory.ROLE]: rolePrivilege.READ,
  });

  const usersResult = users.map(({ email, roleIds, ...rest }) =>
    hasRoleReadPermission ? { roleIds, ...rest } : rest,
  );

  res.status(200).json(usersResult);
};

export default getUsers;
