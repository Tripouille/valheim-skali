import { NextApiHandler, NextApiRequest as Req, NextApiResponse as Res } from 'next';
import { User, UserWithoutId } from '@packages/data/user';
import db from '@packages/utils/db';

export type PullAllResponse = User[];
export type AddResponse = { _id: string };

const collectionName = 'users';

const pullAllHandler = async (req: Req, res: Res) => {
  const response = await db.find<User>(collectionName);

  res.status(200).json(response);
};

const addHandler = async (req: Req, res: Res) => {
  const { name, email, image, roles }: UserWithoutId = req.body;
  const newId = await db.insert<UserWithoutId>(collectionName, { name, email, image, roles });
  const response: AddResponse = { _id: newId };

  res.status(201).json(response);
};

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'GET') {
    await pullAllHandler(req, res);
  } else if (req.method === 'POST') {
    await addHandler(req, res);
  }
};

export default handler;
