import { ObjectId } from 'bson';
import { Collection, Db, Filter, FindOptions, MongoClient, OptionalId } from 'mongodb';

let cachedDb: Db;

function getDbUri(): string {
  if (!process.env.MONGODB_URI)
    throw new Error('Missing environment variable to connect to database.');

  return process.env.MONGODB_URI;
}

async function connectToDb(): Promise<Db> {
  if (!cachedDb) {
    const client = await MongoClient.connect(getDbUri());

    cachedDb = client.db();
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
) {
  const collection = await connectToCollection<T>(collectionName);
  const result = await collection.find(query, projection).toArray();

  return result;
}

async function insert<T>(collectionName: string, document: OptionalId<T>): Promise<string> {
  const collection = await connectToCollection<T>(collectionName);
  const result = await collection.insertOne(document);
  const newId = result.insertedId as ObjectId;

  return newId.toString();
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
  insert,
  remove,
};
