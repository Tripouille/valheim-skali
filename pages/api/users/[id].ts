import { NextApiHandler, NextApiRequest as Req, NextApiResponse as Res } from 'next';
import db from '@packages/utils/db';

const removeHandler = async (req: Req, res: Res) => {
  const { id } = req.query as { id: string };

  await db.remove('users', id);
  res.status(204).end();
};

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'DELETE') {
    await removeHandler(req, res);
  }
};

export default handler;
