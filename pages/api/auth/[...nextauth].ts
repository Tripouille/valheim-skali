import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import { ObjectId } from 'bson';
import DiscordProvider from 'next-auth/providers/discord';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import db from 'api-utils/db';
import { getUserPermissions } from 'api-utils/auth';
import { updateOneInCollection } from 'api-utils/common';
import { UserInDb, usersCollectionName } from 'data/user';

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
        const user = await db.findOne<UserInDb>('users', {
          _id: new ObjectId(token.sub),
        });
        if (user) {
          session.permissions = await getUserPermissions(user);
        } else {
          session.permissions = {};
        }
        session.user._id = token.sub;
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
