import { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import db from '@packages/utils/api/db';
import { ObjectId } from 'bson';

export type AddResponse = { _id: string };

export const pullCollection = async <T>(collectionName: string, req: Req, res: Res) => {
  const response = await db.find<T>(collectionName);

  res.status(200).json(response);
};

export const addToCollection = async <T>(collectionName: string, req: Req, res: Res) => {
  const newId = await db.insert<T>(collectionName, req.body);
  const response: AddResponse = { _id: newId };

  res.status(201).json(response);
};

export const patchOneInCollection = async <T>(collectionName: string, req: Req, res: Res) => {
  const { id } = req.query as { id: string };
  const body: Partial<T> = req.body;

  const result = await db.updateOne<T>(collectionName, { _id: new ObjectId(id) }, { $set: body });

  if (result.ok) {
    res.status(201).json(result.value);
  } else {
    res.status(500).end();
  }
};

export const removeFromCollection = async <T>(collectionName: string, req: Req, res: Res) => {
  const { id } = req.query as { id: string };

  await db.remove<T>(collectionName, id);
  res.status(204).end();
};

export const handlerWithoutId = async <T>(collectionName: string, req: Req, res: Res) => {
  if (req.method === 'GET') {
    await pullCollection<T>(collectionName, req, res);
  } else if (req.method === 'POST') {
    await addToCollection<T>(collectionName, req, res);
  }
};

export const handlerWithId = async <T>(collectionName: string, req: Req, res: Res) => {
  if (req.method === 'DELETE') {
    await removeFromCollection<T>(collectionName, req, res);
  } else if (req.method === 'PATCH') {
    await patchOneInCollection<T>(collectionName, req, res);
  }
};
