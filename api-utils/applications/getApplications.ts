import { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import { getSession } from 'next-auth/react';
import { getPermissionsFromRequest, requirePermissions } from 'api-utils/auth';
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
  const session = await getSession({ req });

  const computedApplications: WithDiscordInfos<ApplicationInDb>[] = applications.map(
    application => {
      const isOwnApplication =
        'userId' in application && session?.user._id === application.userId.toString();
      const computedApplication = {
        ...application,
        // Remove comments if user is not application manager
        comments: hasApplicationManagePermission
          ? application.comments.map(comment => getCommentWithUserInfos(comment, users))
          : [],
        // Remove sensitive data if user is not application manager or application owner
        applicationFormAnswer:
          hasApplicationManagePermission || isOwnApplication
            ? application.applicationFormAnswer
            : {
                ...application.applicationFormAnswer,
                steamID: '(masqué)',
                steamName: '(masqué)',
              },
        // Remove questionnaire if user is not application manager or application owner
        questionnaire:
          hasApplicationManagePermission || isOwnApplication
            ? application.questionnaire
            : undefined,
      };

      // Add discord infos if application is linked to a user
      if ('discordName' in computedApplication) return computedApplication;
      const applicant = users.find(user => user._id.equals(computedApplication.userId));
      return {
        ...computedApplication,
        discordName: applicant?.name ?? 'Utilisateur supprimé',
        discordImageUrl: applicant?.image,
      };
    },
  );

  res.status(200).json(computedApplications);
};

export default getApplications;
