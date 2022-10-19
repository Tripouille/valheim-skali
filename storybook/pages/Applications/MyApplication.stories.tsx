import Component from 'components/pages/Applications/MyApplication';
import { Application } from 'data/application';
import { StoryCategory } from 'storybook/config/constants';
import { storybookSetup } from 'storybook/config/setup';
// import { PermissionCategory, applicationPrivilege } from 'utils/permissions';
import { APIRoute } from 'utils/routes';
import applications from './applications.json';

const { defaultExport, StoryFactory } = storybookSetup(
  Component,
  StoryCategory.PAGE_APPLICATIONS,
  {},
  undefined,
  'My Application',
);

export default defaultExport;

export const MyApplication = StoryFactory(
  {},
  {
    requestResults: [
      {
        url: APIRoute.MY_APPLICATION,
        result: applications[0] as Application,
      },
    ],
  },
);
