import { NextApiHandler } from 'next';
import { requirePermissions } from 'api-utils/auth';
import { ServerException } from 'api-utils/common';
import getWikiProposals from 'api-utils/wiki/getWikiProposals';
import proposeWikiPageCreation from 'api-utils/wiki/proposeWikiPageCreation';
import { PermissionCategory, wikiPrivilege } from 'utils/permissions';

const wikiProposalsHandler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === 'POST') {
      await proposeWikiPageCreation(req, res);
    } else if (req.method === 'GET') {
      await requirePermissions({ [PermissionCategory.WIKI]: wikiPrivilege.PROPOSE }, req);
      const wikiProposals = await getWikiProposals(req);
      res.status(200).json(wikiProposals);
    } else {
      throw new ServerException(501);
    }
  } catch (e) {
    if (e instanceof ServerException) res.status(e.statusCode).end();
    else throw e;
  }
};

export default wikiProposalsHandler;
