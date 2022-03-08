import { NextApiHandler, NextApiRequest as Req, NextApiResponse as Res } from 'next';
import { ServerException } from '@packages/api/common';
import addOrRemoveRoleToUser, { Action } from '@packages/api/users/addOrRemoveRoleToUser';

const userRolesHandler: NextApiHandler = async (req: Req, res: Res) => {
  try {
    if (req.method === 'PATCH') {
      await addOrRemoveRoleToUser(Action.REMOVE, req, res);
    } else {
      throw new ServerException(501);
    }
  } catch (e) {
    if (e instanceof ServerException) res.status(e.statusCode).end();
    else throw e;
  }
};

export default userRolesHandler;
