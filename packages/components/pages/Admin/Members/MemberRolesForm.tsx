import { useMemo } from 'react';
import { BsPlusLg } from 'react-icons/bs';
import { isUserWithInfos, User } from '@packages/data/user';
import { compareRolesFromName, Role } from '@packages/data/role';
import { getDataValue, DataAttributes } from '@packages/utils/dataAttributes';
import { PermissionCategory, PermissionPrivilege } from '@packages/utils/auth';
import { useSession } from '@packages/utils/hooks/useSession';
import { Wrap } from '@packages/components/core/Containers/Wrap';
import Box from '@packages/components/core/Containers/Box';
import { Menu, MenuButton, MenuItem, MenuList } from '@packages/components/core/Overlay/Menu';
import Tag from '@packages/components/core/DataDisplay/Tag';
import Button from '@packages/components/core/Interactive/Button';
import { useUpdateUser } from '../hooks/useUpdateUser';
import { canUserAssignRole } from '../utils';

export interface MembersRoleFormProps extends DataAttributes {
  user: User;
  roles: Role[];
}

const MembersRoleForm: React.FC<MembersRoleFormProps> = ({ dataCy, user, roles }) => {
  const session = useSession();
  const { addRoleToUser, removeRoleFromUser } = useUpdateUser(user);

  const userHasInfos = isUserWithInfos(user);
  const userRoles = useMemo(
    () =>
      userHasInfos
        ? user.roleIds.map(roleId => roles.find(r => r._id === roleId)).sort(compareRolesFromName)
        : [],
    [roles, user, userHasInfos],
  );

  const hasUserWritePermission = session.hasRequiredPermissions({
    [PermissionCategory.USER]: PermissionPrivilege.READ_WRITE,
  });

  const addableRoles = useMemo(() => {
    if (!hasUserWritePermission) return [];
    const nonOwnedRoles = userHasInfos
      ? roles.filter(role => !user.roleIds.includes(role._id))
      : roles;
    return nonOwnedRoles.filter(role => canUserAssignRole(role, session.hasRequiredPermissions));
  }, [roles, userHasInfos, user, session.hasRequiredPermissions, hasUserWritePermission]);

  const canRemoveRole = (role: Role) => {
    return hasUserWritePermission && canUserAssignRole(role, session.hasRequiredPermissions);
  };

  return (
    <Wrap>
      {userRoles.map(role => {
        return role ? (
          <Tag
            key={role._id}
            label={role.name}
            size="lg"
            onClose={canRemoveRole(role) ? removeRoleFromUser(role) : undefined}
          />
        ) : null;
      })}
      {addableRoles.length > 0 && (
        <Box>
          <Menu placement="bottom" gutter={0}>
            <MenuButton
              dataCy={getDataValue(dataCy, 'add_role')}
              as={Button}
              leftIcon={<BsPlusLg />}
              lineHeight="1em"
              colorScheme="green"
            >
              Ajouter un rôle
            </MenuButton>
            <MenuList minW="min-content">
              {addableRoles.map(role => (
                <MenuItem
                  key={role._id}
                  dataCy={getDataValue(dataCy, 'add_role', role._id)}
                  justifyContent="center"
                  onClick={addRoleToUser(role)}
                >
                  <Tag label={role.name} size="lg" />
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </Box>
      )}
    </Wrap>
  );
};

export default MembersRoleForm;
