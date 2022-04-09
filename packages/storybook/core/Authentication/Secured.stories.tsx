import { storybookSetup } from '@packages/storybook/config/setup';
import { StoryCategory } from '@packages/storybook/config/constants';
import Secured, { SecuredProps } from '@packages/components/core/Authentication/Secured';
import { PermissionCategory, PermissionPrivilege, Permissions } from '@packages/utils/auth';

const { defaultExport, StoryFactory } = storybookSetup<SecuredProps>(
  Secured,
  StoryCategory.CORE_AUTHENTICATION,
);

export default defaultExport;

export const NoRequiredRights = StoryFactory({ permissions: {}, children: 'I have the rights !' });

const requiredPermissions = { PermissionName: 'PermissionsPrivilege' } as Permissions;
export const WithRights = StoryFactory(
  {
    permissions: requiredPermissions,
    children: 'I have the rights !',
  },
  requiredPermissions,
);

export const WithoutRights = StoryFactory({
  permissions: { [PermissionCategory.EVENT]: PermissionPrivilege.SUPER_ADMIN },
  children: 'I have the rights !',
  fallback: "I don't have the rights :(",
});