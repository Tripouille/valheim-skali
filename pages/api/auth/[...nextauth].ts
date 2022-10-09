import { ObjectId } from 'bson';
import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import { getRolesPermissions } from 'api-utils/auth';
import { updateOneInCollection } from 'api-utils/common';
import db from 'api-utils/db';
import { SpecialRoleName } from 'data/role';
import { UserInDb, usersCollectionName, WithRolesAndApplications } from 'data/user';

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
        delete session.user.email;
				session.permissions = {};
        if (token.sub) {
          const usersCollection = await db.connectToCollection<UserInDb>(usersCollectionName);
          const usersWithRolesAndApplications = (await usersCollection
            .aggregate(
              [
                { $match: { _id: new ObjectId(token.sub) } },
                {
                  $lookup: {
                    from: 'applications',
                    localField: '_id',
                    foreignField: 'userId',
                    as: 'applications',
                  },
                },
                {
                  $lookup: {
                    from: 'roles',
                    localField: 'roleIds',
                    foreignField: '_id',
                    as: 'roles',
                  },
                },
              ],
              {},
            )
            .toArray()) as WithRolesAndApplications<UserInDb>[];
          const user = usersWithRolesAndApplications[0];
          if (user) {
            session.permissions = await getRolesPermissions(user.roles);
            session.isNonMember = !user.roles.some(role => role.name === SpecialRoleName.MEMBER);
            session.hasApplication = user.applications.length > 0;
            session.user.nameInGame = user.nameInGame;
          }
        }
        return session;
      },
      async signIn({ user, profile }) {
        if (user.image !== profile.image_url)
          await updateOneInCollection(usersCollectionName, user.id, { image: profile.image_url });
        return true;
      },
    },
    adapter: MongoDBAdapter({
      db: await db.connectToDb(),
    }),
  });
  return nextAuth;
}
