import Admin from 'components/Layout/Admin';
import { StoryCategory } from 'storybook/config/constants';
import { storybookSetup } from 'storybook/config/setup';
import { wikiPrivilege, PermissionCategory } from 'utils/permissions';
import { APIRoute } from 'utils/routes';
import wikiProposals from './wikiProposals.json';

const { defaultExport, StoryFactory } = storybookSetup(
  Admin,
  StoryCategory.PAGE_ADMIN,
  {},
  undefined,
  'Wiki proposals',
);

export default defaultExport;

export const WikiProposalsEmpty = StoryFactory(
  {},
  {
    permissions: { [PermissionCategory.WIKI]: wikiPrivilege.WRITE },
    requestResults: [{ url: APIRoute.WIKI_PROPOSALS, result: [] }],
    router: { query: { route: 'wiki-proposals' } },
  },
);

export const WikiProposalsFull = StoryFactory(
  {},
  {
    permissions: { [PermissionCategory.WIKI]: wikiPrivilege.WRITE },
    requestResults: [{ url: APIRoute.WIKI_PROPOSALS, result: wikiProposals }],
    router: { query: { route: 'wiki-proposals' } },
  },
);
