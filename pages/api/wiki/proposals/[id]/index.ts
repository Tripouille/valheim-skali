import { NextApiHandler } from 'next';
import { ServerException } from 'api-utils/common';
import getWikiProposal from 'api-utils/wiki/getWikiProposal';
import addWikiSuggestion from 'api-utils/wiki/addWikiSuggestion';

const wikiProposalsHandler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === 'GET') {
      await getWikiProposal(req, res);
    } else if (req.method === 'PUT') {
      await addWikiSuggestion(req, res);
    } else {
      throw new ServerException(501);
    }
  } catch (e) {
    if (e instanceof ServerException) res.status(e.statusCode).end();
    else throw e;
  }
};

export default wikiProposalsHandler;
