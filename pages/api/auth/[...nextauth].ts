import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import db from '@packages/utils/api/db';
import { Role } from '@packages/data/role';
import {
  PermissionCategory,
  PermissionPrivilege,
  Permissions,
  SpecialRole,
} from '@packages/utils/auth';
import { ObjectId } from 'bson';
import { isUserWithInfos, User, UserWithInfos } from '@packages/data/user';

const getUserPermissions = async (user: UserWithInfos) => {
  const userRoleIds: Role[] = await db.find('roles', {
    _id: { $in: user.roleIds as string[] },
  });
  const userPermissions: Permissions = {};
  userRoleIds.forEach(role => {
    // TODO better
    if (role.name === SpecialRole.SUPER_ADMIN) {
      Object.values(PermissionCategory).forEach(category => {
        userPermissions[category] = PermissionPrivilege.SUPER_ADMIN;
      });
    } else if (role.name === SpecialRole.ADMIN) {
      Object.values(PermissionCategory).forEach(category => {
        userPermissions[category] = PermissionPrivilege.ADMIN;
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

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  const nextAuth = NextAuth(req, res, {
    providers: [
      DiscordProvider({
        clientId: process.env.DISCORD_CLIENT_ID,
        clientSecret: process.env.DISCORD_CLIENT_SECRET,
      }),
    ],
    secret: process.env.SECRET,
    session: {
      strategy: 'jwt',
    },
    pages: {
      signIn: '/auth/signin',
    },
    callbacks: {
      async session({ session, token }) {
        const user = await db.findOne<User>('users', {
          _id: new ObjectId(token.sub),
        });
        if (user && isUserWithInfos(user)) {
          session.permissions = await getUserPermissions(user);
        } else {
          session.permissions = {};
        }
        return session;
      },
    },
    adapter: MongoDBAdapter({
      db: await db.connectToDb(),
    }),
  });
  return nextAuth;
}
