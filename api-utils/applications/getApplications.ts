import { ObjectId } from 'bson';
import { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import { requirePermissions } from 'api-utils/auth';
import { ServerException } from 'api-utils/common';
import db from 'api-utils/db';
import {
  ApplicationComment,
  ApplicationInDb,
  applicationsCollectionName,
  WithDiscordInfos,
  WithUserInfos,
} from 'data/application';
import { UserInDb, usersCollectionName } from 'data/user';
import { applicationPrivilege, PermissionCategory } from 'utils/permissions';

const getCommentWithUserInfos = (
  comment: ApplicationComment<ObjectId>,
  users: UserInDb[],
): WithUserInfos<ApplicationComment<ObjectId>> => {
  const commentAuthor = users.find(user => user._id.equals(comment.authorId));
  return {
    ...comment,
    discordName:
      comment.authorId === 'system'
        ? comment.authorId
        : commentAuthor?.name ?? 'Utilisateur supprimé',
    nameInGame: commentAuthor?.nameInGame,
    discordImageUrl: commentAuthor?.image,
  };
};

const getApplications = async (req: Req, res: Res) => {
  await requirePermissions({ [PermissionCategory.APPLICATION]: applicationPrivilege.READ }, req);

  const applications = await db.find<ApplicationInDb>(
    applicationsCollectionName,
    {},
    { sort: { createdAt: -1 } },
  );
  const users = await db.find<UserInDb>(usersCollectionName);

  const applicationsWithDiscordInfos: WithDiscordInfos<ApplicationInDb>[] = applications.map(
    application => {
      const applicationWithCommentsWithUserInfos = {
        ...application,
        comments: application.comments.map(comment => getCommentWithUserInfos(comment, users)),
      };
      if ('discordName' in applicationWithCommentsWithUserInfos)
        return applicationWithCommentsWithUserInfos;
      const applicant = users.find(user =>
        user._id.equals(applicationWithCommentsWithUserInfos.userId),
      );
      if (!applicant) throw new ServerException(500);
      return {
        ...applicationWithCommentsWithUserInfos,
        discordName: applicant.name,
        discordImageUrl: applicant.image,
      };
    },
  );

  res.status(200).json(applicationsWithDiscordInfos);
};

export default getApplications;
