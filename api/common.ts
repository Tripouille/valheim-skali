import { ObjectId } from 'bson';
import { ModifyResult, WithoutId } from 'mongodb';
import db from 'api/db';

export class ServerException extends Error {
  statusCode: number;

  constructor(statusCode: number) {
    super();
    this.name = 'ServerException';
    this.statusCode = statusCode;
  }
}

export type AddResponse = { _id: string };

export const updateOneInCollection = async <T>(
  collectionName: string,
  id: string,
  updateData: Partial<T>,
): Promise<ModifyResult<T>> => {
  const result = await db.updateOne<T>(
    collectionName,
    { _id: new ObjectId(id) },
    { $set: updateData },
  );

  return result;
};

export const replaceOneInCollection = async <T>(
  collectionName: string,
  id: string,
  newData: WithoutId<T>,
): Promise<ModifyResult<T>> => {
  const result = await db.replaceOne<T>(collectionName, { _id: new ObjectId(id) }, newData);

  return result;
};

export const isObject = (data: unknown): data is Record<string, unknown> => {
  return !!data && typeof data === 'object';
};

type KeyToValueTypeCheckFunction = (value: unknown) => boolean;

/**
 * Checks that data (typically a request body) is an object of type T.
 * @param keyToValueTypeCheckFunctions Record<T keys,
 * functions that check the associated value in data>
 */
export const isRequiredObjectType = <T>(
  data: unknown,
  keyToValueTypeCheckFunctions: Record<keyof T, KeyToValueTypeCheckFunction>,
): data is T =>
  isObject(data) &&
  Object.keys(data).every(key => key in keyToValueTypeCheckFunctions) &&
  Object.entries(keyToValueTypeCheckFunctions).every(([key, checkFunction]) =>
    (checkFunction as KeyToValueTypeCheckFunction)(data[key]),
  );
