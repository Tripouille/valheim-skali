import { NextApiHandler } from 'next';
import { MongoClient } from 'mongodb';

const handler: NextApiHandler = async (req, res) => {
  // console.log(req.method, `${process.env.DB_USER}:${process.env.DB_PASSWORD}`);
  if (req.method === 'POST') {
    const data = req.body;
    const { message } = data;

    const client = await MongoClient.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@dev.ppp4p.mongodb.net/valheim-skali?retryWrites=true&w=majority`,
    );
    const db = client.db();
    const collection = db.collection('messages');
    await collection.insertOne({ message });
    client.close();
    res.status(200).json({ message: 'OKI DOKI!' });
  }
};

export default handler;
