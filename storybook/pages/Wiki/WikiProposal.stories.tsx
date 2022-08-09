import { storybookSetup } from 'storybook/config/setup';
import { StoryCategory } from 'storybook/config/constants';
import WikiProposalComponent from 'components/pages/Wiki/WikiProposals/WikiProposal';
import Background from 'components/core/Containers/Background';
import { WikiProposal } from 'data/wiki';
import { PermissionCategory, wikiPrivilege } from 'utils/permissions';
import { APIRoute } from 'utils/routes';
import wikiProposals from './wikiProposals.json';
import wikiAuthors from './wikiAuthors.json';

const { defaultExport, StoryFactory } = storybookSetup(
  WikiProposalComponent,
  StoryCategory.PAGE_WIKI,
  {
    decorators: [
      Story => (
        <Background>
          <Story />
        </Background>
      ),
    ],
  },
  undefined,
  'WikiProposal',
);

export default defaultExport;

export const CreationProposal = StoryFactory(
  { wikiProposal: wikiProposals[0] as WikiProposal },
  {
    permissions: { [PermissionCategory.WIKI]: wikiPrivilege.PROPOSE },
    requestResults: [{ url: APIRoute.USERS, result: wikiAuthors }],
  },
);

export const EditionProposal = StoryFactory(
  { wikiProposal: wikiProposals[3] as WikiProposal },
  {
    permissions: { [PermissionCategory.WIKI]: wikiPrivilege.PROPOSE },
    requestResults: [
      { url: `${APIRoute.WIKI}/6228cb385f506b78affc0ac1`, result: { slug: 'wiki-page-1' } },
      { url: APIRoute.USERS, result: wikiAuthors },
    ],
  },
);

export const Validated = StoryFactory(
  { wikiProposal: wikiProposals[1] as WikiProposal },
  {
    permissions: { [PermissionCategory.WIKI]: wikiPrivilege.PROPOSE },
    requestResults: [{ url: APIRoute.USERS, result: wikiAuthors }],
  },
);

export const Rejected = StoryFactory(
  { wikiProposal: wikiProposals[2] as WikiProposal },
  {
    permissions: { [PermissionCategory.WIKI]: wikiPrivilege.PROPOSE },
    requestResults: [{ url: APIRoute.USERS, result: wikiAuthors }],
  },
);
