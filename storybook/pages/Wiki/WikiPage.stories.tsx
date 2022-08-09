import { storybookSetup } from 'storybook/config/setup';
import { StoryCategory } from 'storybook/config/constants';
import WikiPageComponent from 'components/pages/Wiki/WikiPage';
import { PermissionCategory, wikiPrivilege } from 'utils/permissions';
import wikiPageWithMarkup from './wikiPageWithMarkup.json';

const { defaultExport, StoryFactory } = storybookSetup(WikiPageComponent, StoryCategory.PAGE_WIKI);

export default defaultExport;

export const WithMarkup = StoryFactory({ wikiPage: wikiPageWithMarkup });

export const CanProposeEdition = StoryFactory(
  { wikiPage: wikiPageWithMarkup },
  {
    permissions: { [PermissionCategory.WIKI]: wikiPrivilege.PROPOSE },
  },
);
