/**
 * @jest-environment node
 */

import { MongoClient } from 'mongodb';
import { ObjectId } from 'bson';
import db from '@packages/utils/db';

describe('Db utils', () => {
  const originalEnv = process.env;
  const collectionName = 'example_collection';
  const findResults: unknown[] = [];
  const id = '012345678901234567890123';
  const mockedCollection = {
    collectionName,
    find: jest.fn().mockReturnValue({ toArray: jest.fn().mockResolvedValue(findResults) }),
    insertOne: jest.fn().mockReturnValue({ insertedId: new ObjectId(id) }),
    deleteOne: jest.fn(),
  };
  const mockedDb = {
    collection: jest
      .fn()
      .mockImplementation(name => (name === collectionName ? mockedCollection : {})),
  };
  const mockedClient = { db: jest.fn().mockReturnValue(mockedDb) };

  beforeAll(() => {
    jest.spyOn(MongoClient, 'connect').mockResolvedValue(mockedClient as never);
  });

  beforeEach(() => {
    process.env = { ...originalEnv, MONGODB_URI: 'example_uri' };
  });

  it('throws an error in db.getDbUri() without env var', () => {
    delete process.env.MONGODB_URI;

    expect(db.getDbUri).toThrowError();
  });

  it('returns the uri without throwing error in db.getDbUri() with env var', () => {
    expect(db.getDbUri()).toEqual('example_uri');
  });

  it('calls mongodb connect in db.connectToDb()', async () => {
    const database = await db.connectToDb();

    expect(MongoClient.connect).toHaveBeenCalledTimes(1);
    expect(database).toEqual(mockedDb);
  });

  it('calls db method collection() in db.connectToCollection()', async () => {
    const collection = await db.connectToCollection(collectionName);

    expect(mockedDb.collection).toHaveBeenCalledTimes(1);
    expect(collection.collectionName).toEqual(collectionName);
  });

  it('calls collection method find() in db.find()', async () => {
    const result = await db.find(collectionName);

    expect(mockedCollection.find).toHaveBeenCalledTimes(1);
    expect(result).toBe(findResults);
  });

  it('calls collection method insertOne() in db.insert()', async () => {
    const document = { username: 'example_username' };

    const result = await db.insert(collectionName, document);

    expect(mockedCollection.insertOne).toHaveBeenCalledTimes(1);
    expect(mockedCollection.insertOne).toHaveBeenCalledWith(document);
    expect(result).toBe(id);
  });

  it('calls collection method deleteOne() in db.remove()', async () => {
    await db.remove(collectionName, id);

    expect(mockedCollection.deleteOne).toHaveBeenCalledTimes(1);
    expect(mockedCollection.deleteOne).toHaveBeenCalledWith({ _id: new ObjectId(id) });
  });
});
