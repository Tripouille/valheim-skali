import { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import { ObjectId } from 'bson';
import { ModifyResult } from 'mongodb';
import db from '@packages/api/db';

export class ServerException extends Error {
  statusCode: number;

  constructor(statusCode: number) {
    super();
    this.name = 'ServerException';
    this.statusCode = statusCode;
  }
}

export type AddResponse = { _id: string };

export const pullCollection = async <T>(collectionName: string, req: Req, res: Res) => {
  const response = await db.find<T>(collectionName);

  res.status(200).json(response);
};

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

/*export const removeFromCollection = async <T>(collectionName: string, req: Req, res: Res) => {
  const { id } = req.query as { id: string };

  await db.remove<T>(collectionName, id);
  res.status(204).end();
};*/
