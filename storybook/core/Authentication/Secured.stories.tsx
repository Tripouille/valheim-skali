import { storybookSetup } from 'storybook/config/setup';
import { StoryCategory } from 'storybook/config/constants';
import Secured, { SecuredProps } from 'components/core/Authentication/Secured';
import { eventPrivilege, PermissionCategory, Permissions } from 'utils/permissions';

const { defaultExport, StoryFactory } = storybookSetup<SecuredProps>(
  Secured,
  StoryCategory.CORE_AUTHENTICATION,
  { parameters: { chromatic: { disableSnapshot: true } } },
);

export default defaultExport;

export const NoRequiredRights = StoryFactory({ permissions: {}, children: 'I have the rights !' });

const requiredPermissions = { PermissionName: 'PermissionsPrivilege' } as Permissions;
export const WithRights = StoryFactory(
  {
    permissions: requiredPermissions,
    children: 'I have the rights !',
  },
  { permissions: requiredPermissions },
);

export const WithoutRights = StoryFactory({
  permissions: { [PermissionCategory.EVENT]: eventPrivilege.SUPER_ADMIN },
  children: 'I have the rights !',
  fallback: "I don't have the rights :(",
});
