import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import db from '@packages/utils/db';
import { Role } from '@packages/store/roles/type';
import { PermissionCategory, PermissionPrivilege, Permissions } from '@packages/utils/auth';

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
      async jwt({ token, user }) {
        if (user) {
          const userRoles: Role[] = await db.find('roles', {
            _id: { $in: user.roles as string[] },
          });
          const userPermissions: Permissions = {};
          userRoles.forEach(role => {
            (
              Object.entries(role.permissions) as [PermissionCategory, PermissionPrivilege][]
            ).forEach(([category, privilege]) => {
              if (privilege !== undefined) {
                userPermissions[category] = Math.max(userPermissions[category] ?? 0, privilege);
              }
            });
          });
          token.permissions = userPermissions;
        } else if (!token.permissions) {
          token.permissions = {};
        }
        return token;
      },
      session({ session, token }) {
        session.permissions = token.permissions;
        return session;
      },
    },
    adapter: MongoDBAdapter({
      db: await db.connectToDb(),
    }),
  });
  return nextAuth;
}
