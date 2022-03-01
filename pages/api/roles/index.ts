import { NextApiHandler, NextApiRequest as Req, NextApiResponse as Res } from 'next';
import { Role, RoleWithoutId } from '@packages/data/role';
import db from '@packages/utils/db';

export type PullAllResponse = Role[];
export type AddResponse = { _id: string };

const collectionName = 'roles';

const pullAllHandler = async (req: Req, res: Res) => {
  const response = await db.find<Role>(collectionName);

  res.status(200).json(response);
};

const addHandler = async (req: Req, res: Res) => {
  const { name, permissions }: RoleWithoutId = req.body;
  const newId = await db.insert<RoleWithoutId>(collectionName, { name, permissions });
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
