import { NextApiHandler } from 'next';
import { ServerException } from 'api-utils/common';
import validateWikiProposal from 'api-utils/wiki/validateWikiProposal';
import rejectWikiProposal from 'api-utils/wiki/rejectWikiProposal';

const wikiProposalsHandler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === 'PUT') {
      if (req.body.answer === 'validated') await validateWikiProposal(req, res);
      else if (req.body.answer === 'rejected') await rejectWikiProposal(req, res);
      else throw new ServerException(400);
      throw new ServerException(501);
    } else {
      throw new ServerException(501);
    }
  } catch (e) {
    if (e instanceof ServerException) res.status(e.statusCode).end();
    else throw e;
  }
};

export default wikiProposalsHandler;
