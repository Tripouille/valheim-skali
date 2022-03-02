import { Document, ObjectId } from 'bson';
import {
  Collection,
  Db,
  Filter,
  FindOptions,
  ModifyResult,
  MongoClient,
  OptionalId,
  UpdateFilter,
  WithId,
} from 'mongodb';

let cachedDb: Db;
let connecting = false;

function getDbUri(): string {
  if (!process.env.MONGODB_URI)
    throw new Error('Missing environment variable to connect to database.');

  return process.env.MONGODB_URI;
}

function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function waitForDb() {
  while (!cachedDb) {
    await wait(50);
  }
}

async function connectToDb(): Promise<Db> {
  if (!cachedDb) {
    if (!connecting) {
      connecting = true;
      const client = await MongoClient.connect(getDbUri());

      cachedDb = client.db();
      connecting = false;
    } else {
      await waitForDb();
    }
  }

  return cachedDb;
}

async function connectToCollection<T>(collectionName: string): Promise<Collection<T>> {
  const db = await connectToDb();

  return db.collection<T>(collectionName);
}

async function find<T>(
  collectionName: string,
  query: Filter<T> = {},
  projection?: FindOptions<Document>,
): Promise<WithId<T>[]> {
  const collection = await connectToCollection<T>(collectionName);
  const result = await collection.find(query, projection).toArray();

  return result;
}

async function findOne<T>(
  collectionName: string,
  query: Filter<T> = {},
  projection?: FindOptions<Document>,
): Promise<T | null> {
  const collection = await connectToCollection<T>(collectionName);
  const result = await collection.findOne(query, projection);

  return result;
}

async function insert<T>(collectionName: string, document: OptionalId<T>): Promise<string> {
  const collection = await connectToCollection<T>(collectionName);
  const result = await collection.insertOne(document);
  const newId = result.insertedId as ObjectId;

  return newId.toString();
}

async function updateOne<T>(
  collectionName: string,
  query: Filter<T>,
  update: UpdateFilter<T> | Partial<T>,
): Promise<ModifyResult<T>> {
  const collection = await connectToCollection<T>(collectionName);
  const result = await collection.findOneAndUpdate(query, update, { returnDocument: 'after' });

  return result;
}

async function remove<T>(collectionName: string, id: string) {
  const collection = await connectToCollection<T>(collectionName);

  await collection.deleteOne({ _id: new ObjectId(id) });
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getDbUri,
  connectToDb,
  connectToCollection,
  find,
  findOne,
  insert,
  updateOne,
  remove,
};
