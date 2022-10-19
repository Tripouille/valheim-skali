import ApplicationModal from 'components/pages/Applications/ApplicationModal';
import { Application, ApplicationStatus, WithDiscordInfos } from 'data/application';
import { StoryCategory } from 'storybook/config/constants';
import { storybookSetup } from 'storybook/config/setup';
import { PermissionCategory, applicationPrivilege } from 'utils/permissions';
import applications from './applications.json';

const { defaultExport, StoryFactory } = storybookSetup(
  ApplicationModal,
  StoryCategory.PAGE_APPLICATIONS,
);

export default defaultExport;

export const ReadOnly = StoryFactory(
  {
    application: applications[0] as WithDiscordInfos<Application>,
    isOpen: true,
    onClose: () => {},
  },
  {
    permissions: { [PermissionCategory.APPLICATION]: applicationPrivilege.READ },
  },
);

export const CanEdit = StoryFactory(
  {
    application: applications[0] as WithDiscordInfos<Application>,
    isOpen: true,
    onClose: () => {},
  },
  {
    permissions: { [PermissionCategory.APPLICATION]: applicationPrivilege.MANAGE },
  },
);

export const CanChangeStatus = StoryFactory(
  {
    application: {
      ...applications[0],
      status: ApplicationStatus.SCHEDULED_APPOINTMENT,
    } as WithDiscordInfos<Application>,
    isOpen: true,
    onClose: () => {},
  },
  {
    permissions: { [PermissionCategory.APPLICATION]: applicationPrivilege.MANAGE },
  },
);
