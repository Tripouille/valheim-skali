import db from 'api-utils/db';
import { WikiProposalInDb, wikiProposalsCollectionName } from 'data/wiki';

const getWikiProposals = async () => {
  const wikiProposals = await db.find<WikiProposalInDb>(wikiProposalsCollectionName);
  return wikiProposals;
};

export default getWikiProposals;
