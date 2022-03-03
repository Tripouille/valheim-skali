import { NextApiRequest as Req } from 'next';
import { getSession } from 'next-auth/react';
import { Permissions, userHasRequiredPermissions } from '../auth';
import { ServerException } from './api';

export const requirePermissions = async (requiredPermissions: Permissions, req: Req) => {
  const session = await getSession({ req });
  if (!session || !userHasRequiredPermissions(session.permissions, requiredPermissions)) {
    throw new ServerException(401);
  }
};
