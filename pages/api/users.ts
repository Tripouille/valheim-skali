import { NextApiHandler } from 'next';
import { MongoClient } from 'mongodb';
import { User } from 'store/users/type';

export type Response = User[];

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'GET') {
    const client = await MongoClient.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@dev.ppp4p.mongodb.net/valheim-skali?retryWrites=true&w=majority`,
    );
    const db = client.db();
    const collection = db.collection<User>('users');
    const response: Response = await collection.find().toArray();
    client.close();
    res.status(200).json(response);
  }
};

export default handler;
