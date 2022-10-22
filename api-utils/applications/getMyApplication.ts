import { ObjectId } from 'bson';
import { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import { getSession } from 'next-auth/react';
import { ServerException } from 'api-utils/common';
import db from 'api-utils/db';
import {
  ApplicationBaseWithUserId,
  ApplicationInDb,
  applicationsCollectionName,
  WithDiscordInfos,
} from 'data/application';

const getMyApplication = async (req: Req, res: Res) => {
  const session = await getSession({ req });
  if (!session?.user._id) throw new ServerException(401);

  const application = await db.findOne<ApplicationBaseWithUserId<ObjectId>>(
    applicationsCollectionName,
    {
      userId: new ObjectId(session.user._id),
    },
  );
  if (!application) throw new ServerException(404);

  const applicationWithDiscordInfos: WithDiscordInfos<ApplicationInDb> = {
    ...application,
    comments: [],
    discordName: session?.user.name ?? 'Utilisateur supprimé',
    discordImageUrl: session?.user.image ?? undefined,
  };

  res.status(200).json(applicationWithDiscordInfos);
};

export default getMyApplication;
