import { NextApiHandler } from 'next';
import { MongoClient } from 'mongodb';

const handler: NextApiHandler = async (req, res) => {
  // console.log(req.method, `${process.env.DB_USER}:${process.env.DB_PASSWORD}`);
  if (req.method === 'POST') {
    const data = req.body;
    const client = await MongoClient.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@dev.ppp4p.mongodb.net/valheim-skali?retryWrites=true&w=majority`,
    );
    const db = client.db();
    const collection = db.collection('users');
    const result = await collection.insertOne(data);
    client.close();
    console.log('result', result);
    const status = result.acknowledged ? 200 : 501;
    res.status(status).json({ message: 'OKI DOKI!' });
  }
};

export default handler;
