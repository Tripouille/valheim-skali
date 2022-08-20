import { storybookSetup } from 'storybook/config/setup';
import { StoryCategory } from 'storybook/config/constants';
import Events from 'components/pages/Events';
import { APIRoute } from 'utils/routes';
import { PermissionCategory, eventPrivilege } from 'utils/permissions';
import events from './events.json';

const { defaultExport, StoryFactory } = storybookSetup(Events, StoryCategory.PAGE);

export default defaultExport;

export const Empty = StoryFactory(
  {},
  {
    permissions: { [PermissionCategory.EVENT]: eventPrivilege.READ },
    requestResults: [{ url: APIRoute.EVENTS, result: { events: [] } }],
  },
);

export const Filled = StoryFactory(
  {},
  {
    permissions: { [PermissionCategory.EVENT]: eventPrivilege.READ },
    requestResults: [{ url: APIRoute.EVENTS, result: { events } }],
  },
);

export const CanEdit = StoryFactory(
  {},
  {
    permissions: { [PermissionCategory.EVENT]: eventPrivilege.READ_WRITE },
    requestResults: [{ url: APIRoute.EVENTS, result: { events } }],
  },
);
