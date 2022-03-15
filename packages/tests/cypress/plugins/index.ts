import * as dotenv from 'dotenv';
import { OptionalId } from 'mongodb';
import db from '../../../api/db';

dotenv.config({ path: '../../.env.test' });

interface SeedCollectionDto<T> {
  collectionName: string;
  data: OptionalId<T>[];
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
  });
};
export default plugins;
