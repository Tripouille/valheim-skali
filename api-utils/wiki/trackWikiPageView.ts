import { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import { ServerException } from 'api-utils/common';
import db from 'api-utils/db';
import { WikiPageInDb, wikiPagesCollectionName } from 'data/wiki';

const trackWikiPageView = async (req: Req, res: Res) => {
  const { slug } = req.query as { slug: string };

  const result = await db.updateOne<WikiPageInDb>(
    wikiPagesCollectionName,
    { slug },
    { $inc: { views: 1 } },
  );
  if (!result.ok) throw new ServerException(500);

  res.status(200).end();
};

export default trackWikiPageView;
