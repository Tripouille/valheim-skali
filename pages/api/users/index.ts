import { NextApiHandler, NextApiRequest as Req, NextApiResponse as Res } from 'next';
import { User, UserWithoutId } from 'store/users/type';
import db from '../../../utils/db';

export type PullAllResponse = User[];
export type AddResponse = { _id: string };

const collectionName = 'users';

const pullAllHandler = async (req: Req, res: Res) => {
  try {
    const response = await db.find<User>(collectionName);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const addHandler = async (req: Req, res: Res) => {
  const { name, age }: UserWithoutId = req.body;

  try {
    const newId = await db.insert<UserWithoutId>(collectionName, { name, age });
    const response: AddResponse = { _id: newId };
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'GET') {
    await pullAllHandler(req, res);
  } else if (req.method === 'POST') {
    await addHandler(req, res);
  }
};

export default handler;
