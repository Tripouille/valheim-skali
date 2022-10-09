import { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import { getPermissionsFromRequest, requirePermissions } from 'api-utils/auth';
import { ServerException } from 'api-utils/common';
import db from 'api-utils/db';
import { ApplicationInDb, applicationsCollectionName, WithDiscordInfos } from 'data/application';
import { UserInDb, usersCollectionName } from 'data/user';
import {
  applicationPrivilege,
  PermissionCategory,
  permissionsMeetRequirement,
} from 'utils/permissions';
import { getCommentWithUserInfos } from './utils';

const getApplications = async (req: Req, res: Res) => {
  await requirePermissions({ [PermissionCategory.APPLICATION]: applicationPrivilege.READ }, req);
  const userPermissions = await getPermissionsFromRequest(req);
  const hasApplicationManagePermission = permissionsMeetRequirement(userPermissions, {
    [PermissionCategory.APPLICATION]: applicationPrivilege.MANAGE,
  });

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
        comments: hasApplicationManagePermission
          ? application.comments.map(comment => getCommentWithUserInfos(comment, users))
          : [],
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
