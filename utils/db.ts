import { ObjectId } from 'bson';
import { Db, MongoClient, OptionalId } from 'mongodb';

if (!process.env.MONGODB_URI)
  throw new Error('Missing environment variable to connect to database.');
const uri = process.env.MONGODB_URI;

let cachedDb: Db;

async function connectToCollection<T>(collectionName: string) {
  let db;
  if (cachedDb) {
    db = cachedDb;
  } else {
    const client = await MongoClient.connect(uri);
    db = await client.db();
    cachedDb = db;
  }

  return db.collection<T>(collectionName);
}

async function find<T>(collectionName: string): Promise<T[]> {
  const collection = await connectToCollection<T>(collectionName);
  const result = await collection.find().toArray();
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

export default {
  find,
  insert,
  remove,
};
