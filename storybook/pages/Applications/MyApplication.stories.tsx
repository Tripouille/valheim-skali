import Component from 'components/pages/Applications/MyApplication';
import { Application, WithDiscordInfos } from 'data/application';
import { StoryCategory } from 'storybook/config/constants';
import { storybookSetup } from 'storybook/config/setup';
import applications from './applications.json';

const { defaultExport, StoryFactory } = storybookSetup(
  Component,
  StoryCategory.PAGE_APPLICATIONS,
  {},
  undefined,
  'My Application',
);

export default defaultExport;

export const MyApplication = StoryFactory({
  application: applications[0] as WithDiscordInfos<Application>,
});
