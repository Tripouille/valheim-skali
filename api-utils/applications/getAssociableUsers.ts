import { ObjectId } from 'bson';
import { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import db from 'api-utils/db';
import { ApplicationAssociableUser } from 'data/application';
import { SpecialRoleName } from 'data/role';
import { UserInDb, usersCollectionName, WithRolesAndApplications } from 'data/user';

const getAssociableUsers = async (req: Req, res: Res) => {
  const usersCollection = await db.connectToCollection<UserInDb>(usersCollectionName);
  const usersWithRolesAndApplications = (await usersCollection
    .aggregate(
      [
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

  const usersResult: ApplicationAssociableUser<ObjectId>[] = usersWithRolesAndApplications.map(
    ({ _id, name, image, nameInGame, roles, applications }) => ({
      _id,
      name,
      image,
      nameInGame,
      isMember: roles.some(role => role.name === SpecialRoleName.MEMBER),
      applicationId: applications[0]?._id,
    }),
  );

  res.status(200).json(usersResult);
};

export default getAssociableUsers;
