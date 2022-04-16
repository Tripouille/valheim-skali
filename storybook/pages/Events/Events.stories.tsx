import { storybookSetup } from 'storybook/config/setup';
import { StoryCategory } from 'storybook/config/constants';
import Events from 'components/pages/Events';
import { APIRoute } from 'utils/routes';
import { PermissionCategory, PermissionPrivilege } from 'utils/auth';
import events from './events.json';

const { defaultExport, StoryFactory } = storybookSetup(Events, StoryCategory.PAGE);

export default defaultExport;

export const Empty = StoryFactory({}, { [PermissionCategory.EVENT]: PermissionPrivilege.READ }, [
  { url: APIRoute.EVENTS, result: [] },
]);

export const Filled = StoryFactory({}, { [PermissionCategory.EVENT]: PermissionPrivilege.READ }, [
  { url: APIRoute.EVENTS, result: events },
]);

export const CanEdit = StoryFactory(
  {},
  { [PermissionCategory.EVENT]: PermissionPrivilege.READ_WRITE },
  [{ url: APIRoute.EVENTS, result: events }],
);
