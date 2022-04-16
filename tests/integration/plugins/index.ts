import * as dotenv from 'dotenv';
import { OptionalId } from 'mongodb';
import { RoleInDb, rolesCollectionName } from 'data/role';
import { UserInDb, usersCollectionName } from 'data/user';
import { PermissionCategory, PermissionPrivilege, SpecialRoleName } from 'utils/auth';
import db from 'api-utils/db';

dotenv.config({ path: '../../.env.test' });

interface SeedCollectionDto<T> {
  collectionName: string;
  data: OptionalId<T>[];
}

interface SetPermissionDto {
  roleName: SpecialRoleName;
  permissionCategory: PermissionCategory;
  permissionPrivilege: PermissionPrivilege;
}

const plugins = (on: Cypress.PluginEvents) => {
  on('task', {
    seedCollection: async <T>({ collectionName, data }: SeedCollectionDto<T>) => {
      const collection = await db.connectToCollection<T>(collectionName);
      try {
        await collection.drop();
      } catch (e) {} // Drop throws error if collection doesn't exit
      await collection.insertMany(data);
      return null;
    },

    setPermission: async ({
      roleName,
      permissionCategory,
      permissionPrivilege,
    }: SetPermissionDto) => {
      await db.updateOne<RoleInDb>(
        rolesCollectionName,
        { name: roleName },
        { $set: { [`permissions.${permissionCategory}`]: permissionPrivilege } },
      );
      return null;
    },

    setUserRoles: async (roleNames: SpecialRoleName[]) => {
      const roles = await db.find<RoleInDb>(
        rolesCollectionName,
        { name: { $in: roleNames } },
        { projection: { _id: 1 } },
      );
      await db.updateOne<UserInDb>(
        usersCollectionName,
        { name: 'TestUser' },
        { $set: { roleIds: roles.map(role => role._id) } },
      );
      return null;
    },
  });
};
export default plugins;
