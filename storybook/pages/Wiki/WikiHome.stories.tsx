import { storybookSetup } from 'storybook/config/setup';
import { StoryCategory } from 'storybook/config/constants';
import WikiHome from 'components/pages/Wiki';
import featured from './featured.json';
import { PermissionCategory, wikiPrivilege } from 'utils/permissions';

const { defaultExport, StoryFactory } = storybookSetup(WikiHome, StoryCategory.PAGE_WIKI);

export default defaultExport;

export const AsVisitor = StoryFactory({ featuredWikiPages: featured }, { permissions: {} });

export const CanPropose = StoryFactory(
  { featuredWikiPages: featured },
  { permissions: { [PermissionCategory.WIKI]: wikiPrivilege.PROPOSE } },
);
