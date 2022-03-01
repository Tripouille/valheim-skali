import { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import db from '@packages/utils/db';

export type AddResponse = { _id: string };

export const pullCollection = async <T>(collectionName: string, req: Req, res: Res) => {
  const response = await db.find<T>(collectionName);

  res.status(200).json(response);
};

export const addToCollection = async <TWithoutId>(collectionName: string, req: Req, res: Res) => {
  const newId = await db.insert<TWithoutId>(collectionName, req.body);
  const response: AddResponse = { _id: newId };

  res.status(201).json(response);
};

export const removeFromCollection = async (collectionName: string, req: Req, res: Res) => {
  const { id } = req.query as { id: string };

  await db.remove(collectionName, id);
  res.status(204).end();
};

export const handlerWithoutId = async (collectionName: string, req: Req, res: Res) => {
  if (req.method === 'GET') {
    await pullCollection(collectionName, req, res);
  } else if (req.method === 'POST') {
    await addToCollection(collectionName, req, res);
  }
};

export const handlerWithId = async (collectionName: string, req: Req, res: Res) => {
  if (req.method === 'DELETE') {
    await removeFromCollection(collectionName, req, res);
  }
};
