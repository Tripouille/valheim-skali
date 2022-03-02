import { NextApiRequest as Req } from 'next';
import { getSession } from 'next-auth/react';
import { Permissions, userHasRequiredPermissions } from '../auth';

export class AuthException extends Error {}

export const requirePermissions = async (requiredPermissions: Permissions, req: Req) => {
  const session = await getSession({ req });
  if (!session || !userHasRequiredPermissions(session.permissions, requiredPermissions)) {
    throw new AuthException();
  }
};
