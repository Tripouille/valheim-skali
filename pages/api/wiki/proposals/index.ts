import { NextApiHandler } from 'next';
import { ServerException } from 'api-utils/common';
import getWikiProposals from 'api-utils/wiki/getWikiProposals';
import proposeWikiPage from 'api-utils/wiki/proposeWikiPage';
import { requirePermissions } from 'api-utils/auth';
import { PermissionCategory, wikiPrivilege } from 'utils/permissions';

const wikiProposalsHandler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === 'POST') {
      await proposeWikiPage(req, res);
    } else if (req.method === 'GET') {
      await requirePermissions({ [PermissionCategory.WIKI]: wikiPrivilege.WRITE }, req);
      const wikiProposals = await getWikiProposals();
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
