import Admin from 'components/Layout/Admin';
import { StoryCategory } from 'storybook/config/constants';
import { storybookSetup } from 'storybook/config/setup';
import { wikiPrivilege, PermissionCategory } from 'utils/permissions';
import { APIRoute } from 'utils/routes';
import wikiPages from './wikiPages.json';

const { defaultExport, StoryFactory } = storybookSetup(
  Admin,
  StoryCategory.PAGE_ADMIN,
  {},
  undefined,
  'Wiki pages',
);

export default defaultExport;

export const WikiPagesEmpty = StoryFactory(
  {},
  {
    permissions: { [PermissionCategory.WIKI]: wikiPrivilege.WRITE },
    requestResults: [{ url: APIRoute.WIKI, result: [] }],
    router: { query: { route: 'wiki-pages' } },
  },
);

export const WikiPagesFull = StoryFactory(
  {},
  {
    permissions: { [PermissionCategory.WIKI]: wikiPrivilege.WRITE },
    requestResults: [{ url: APIRoute.WIKI, result: wikiPages }],
    router: { query: { route: 'wiki-pages' } },
  },
);
