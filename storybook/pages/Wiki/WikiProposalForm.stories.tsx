import { storybookSetup } from 'storybook/config/setup';
import { StoryCategory } from 'storybook/config/constants';
import WikiProposalForm from 'components/pages/Wiki/WikiProposals/WikiProposalForm';
import { WikiProposal } from 'data/wiki';
import { PermissionCategory, wikiPrivilege } from 'utils/permissions';
import wikiPageWithMarkup from './wikiPageWithMarkup.json';
import wikiProposals from './wikiProposals.json';

const { defaultExport, StoryFactory } = storybookSetup(WikiProposalForm, StoryCategory.PAGE_WIKI);

export default defaultExport;

export const CreateCreationProposal = StoryFactory(
  { onSubmit: () => {} },
  { permissions: { [PermissionCategory.WIKI]: wikiPrivilege.PROPOSE } },
);

export const CreateEditionProposal = StoryFactory(
  { wikiPage: wikiPageWithMarkup, onSubmit: () => {} },
  { permissions: { [PermissionCategory.WIKI]: wikiPrivilege.PROPOSE } },
);

export const EditCreationProposal = StoryFactory(
  { wikiProposal: wikiProposals[0] as WikiProposal, onSubmit: () => {} },
  { permissions: { [PermissionCategory.WIKI]: wikiPrivilege.PROPOSE } },
);

export const EditEditionProposal = StoryFactory(
  { wikiProposal: wikiProposals[3] as WikiProposal, onSubmit: () => {} },
  { permissions: { [PermissionCategory.WIKI]: wikiPrivilege.PROPOSE } },
);
