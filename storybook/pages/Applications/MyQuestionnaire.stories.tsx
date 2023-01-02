import Background from 'components/core/Containers/Background';
import PageTitle from 'components/core/Typography/PageTitle';
import Component from 'components/pages/RulesQuestionnaire/MyQuestionnaire';
import { Application } from 'data/application';
import { StoryCategory } from 'storybook/config/constants';
import { storybookSetup } from 'storybook/config/setup';
import applications from './applications.json';

const { defaultExport, StoryFactory } = storybookSetup(
  Component,
  StoryCategory.PAGE_APPLICATIONS,
  {
    decorators: [
      Story => (
        <Background>
          <PageTitle title="Questionnaire" mb="8" />
          <Story />
        </Background>
      ),
    ],
  },
  undefined,
  'My Application',
);

export default defaultExport;

export const MyQuestionnaire = StoryFactory({
  application: applications[0] as unknown as Application & {
    questionnaire: NonNullable<Application['questionnaire']>;
  },
});
