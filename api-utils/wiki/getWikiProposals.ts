import { NextApiRequest as Req } from 'next';
import { getSession } from 'next-auth/react';
import db from 'api-utils/db';
import { WikiProposalInDb, wikiProposalsCollectionName } from 'data/wiki';
import { PermissionCategory, permissionsMeetRequirement, wikiPrivilege } from 'utils/permissions';

const getWikiProposals = async (req: Req): Promise<WikiProposalInDb[]> => {
  const wikiProposals = await db.find<WikiProposalInDb>(wikiProposalsCollectionName);

  const session = await getSession({ req });
  if (!session) return [];
  const hasWikiWritePermission = permissionsMeetRequirement(session.permissions, {
    [PermissionCategory.WIKI]: wikiPrivilege.WRITE,
  });

  if (hasWikiWritePermission) return wikiProposals;
  else
    return wikiProposals.filter(
      wikiProposal => wikiProposal.authorId.toString() === session.user._id,
    );
};

export default getWikiProposals;
