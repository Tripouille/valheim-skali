import * as dotenv from 'dotenv';
import { ObjectId } from 'bson';
import { OptionalId } from 'mongodb';
import db from 'api-utils/db';
import { RoleInDb, rolesCollectionName, SpecialRoleName } from 'data/role';
import { UserInDb, usersCollectionName } from 'data/user';
import { PermissionCategory, Permissions } from 'utils/permissions';

dotenv.config({ path: '../../.env.test' });

interface SeedCollectionDto<T> {
  collectionName: string;
  data: (OptionalId<T> & Record<string, ObjectId[]>)[];
}

interface SetPermissionDto<C extends PermissionCategory> {
  roleName: SpecialRoleName;
  permissionCategory: C;
  permissionPrivilege: Permissions[C];
}

const plugins = (on: Cypress.PluginEvents) => {
  on('task', {
    seedCollection: async <T>({ collectionName, data }: SeedCollectionDto<T>) => {
      const collection = await db.connectToCollection<T>(collectionName);
      try {
        await collection.drop();
      } catch (e) {} // Drop throws error if collection doesn't exit
      if (data.length) {
        await collection.insertMany(
          data.map((item: OptionalId<T> & Partial<{ roleIds: string[]; wikiPageId: string }>) => ({
            ...item,
            _id: new ObjectId(item._id),
            ...(item.roleIds
              ? { roleIds: item.roleIds && item.roleIds.map(roleId => new ObjectId(roleId)) }
              : {}),
            ...(item.wikiPageId ? { wikiPageId: new ObjectId(item.wikiPageId) } : {}),
          })),
        );
      }
      return null;
    },

    setPermission: async <C extends PermissionCategory>({
      roleName,
      permissionCategory,
      permissionPrivilege,
    }: SetPermissionDto<C>) => {
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
