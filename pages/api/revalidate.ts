import { NextApiHandler } from 'next';
import { isObject, ServerException } from 'api-utils/common';

const isRevalidateBody = (body: unknown): body is { urls: string[] } => {
  return (
    isObject(body) &&
    'urls' in body &&
    Array.isArray(body.urls) &&
    body.urls.every(url => typeof url === 'string')
  );
};

const revalidateHandler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === 'POST') {
      if (!isRevalidateBody(req.body)) throw new ServerException(400);
      await Promise.all(req.body.urls.map(url => res.unstable_revalidate(url)));
      res.status(200).end();
    } else {
      throw new ServerException(501);
    }
  } catch (e) {
    if (e instanceof ServerException) res.status(e.statusCode).end();
    else throw e;
  }
};

export default revalidateHandler;
