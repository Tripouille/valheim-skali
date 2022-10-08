import { NextApiHandler } from 'next';
import { ServerException } from 'api-utils/common';
import addWikiSuggestion from 'api-utils/wiki/addWikiSuggestion';
import getWikiProposal from 'api-utils/wiki/getWikiProposal';
import proposeWikiPageEdition from 'api-utils/wiki/proposeWikiPageEdition';

const wikiProposalsHandler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === 'GET') {
      await getWikiProposal(req, res);
    } else if (req.method === 'PUT') {
      await addWikiSuggestion(req, res);
    } else if (req.method === 'POST') {
      await proposeWikiPageEdition(req, res);
    } else {
      throw new ServerException(501);
    }
  } catch (e) {
    if (e instanceof ServerException) res.status(e.statusCode).end();
    else throw e;
  }
};

export default wikiProposalsHandler;
