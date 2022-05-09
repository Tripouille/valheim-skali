import { storybookSetup } from 'storybook/config/setup';
import { StoryCategory } from 'storybook/config/constants';
import Events from 'components/pages/Events';
import { APIRoute } from 'utils/routes';
import { PermissionCategory, PermissionPrivilege } from 'utils/auth';
import events from './events.json';

const { defaultExport, StoryFactory } = storybookSetup(Events, StoryCategory.PAGE);

export default defaultExport;

export const Empty = StoryFactory(
  {},
  {
    permissions: { [PermissionCategory.EVENT]: PermissionPrivilege.READ },
    requestResults: [{ url: APIRoute.EVENTS, result: [] }],
  },
);

export const Filled = StoryFactory(
  {},
  {
    permissions: { [PermissionCategory.EVENT]: PermissionPrivilege.READ },
    requestResults: [{ url: APIRoute.EVENTS, result: events }],
  },
);

export const CanEdit = StoryFactory(
  {},
  {
    permissions: { [PermissionCategory.EVENT]: PermissionPrivilege.READ_WRITE },
    requestResults: [{ url: APIRoute.EVENTS, result: events }],
  },
);
