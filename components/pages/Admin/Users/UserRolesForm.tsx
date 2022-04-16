import { useMemo } from 'react';
import { BsPlusLg } from 'react-icons/bs';
import { User } from 'data/user';
import { compareRolesFromName, Role } from 'data/role';
import { getDataValue, DataAttributes } from 'utils/dataAttributes';
import { PermissionCategory, PermissionPrivilege } from 'utils/auth';
import useSession from 'utils/hooks/useSession';
import { Wrap } from 'components/core/Containers/Wrap';
import Box from 'components/core/Containers/Box';
import { Menu, MenuButton, MenuItem, MenuList } from 'components/core/Overlay/Menu';
import Tag from 'components/core/DataDisplay/Tag';
import Button from 'components/core/Interactive/Button';
import useUpdateUser from '../hooks/useUpdateUser';
import { canUserAssignRole, getUserRoles } from '../utils';

export interface UserRolesFormProps extends DataAttributes {
  user: User;
  roles: Role[];
}

const UserRolesForm: React.FC<UserRolesFormProps> = ({ dataCy, user, roles }) => {
  const session = useSession();
  const { addRoleToUser, removeRoleFromUser } = useUpdateUser(user);

  const userRoles = useMemo(
    () => getUserRoles(user, roles).sort(compareRolesFromName),
    [roles, user],
  );

  const hasUserWritePermission = session.hasRequiredPermissions({
    [PermissionCategory.USER]: PermissionPrivilege.READ_WRITE,
  });

  const addableRoles = useMemo(() => {
    if (!hasUserWritePermission) return [];
    const nonOwnedRoles = roles.filter(role => !user.roleIds || !user.roleIds.includes(role._id));
    return nonOwnedRoles.filter(role => canUserAssignRole(role, session.hasRequiredPermissions));
  }, [roles, user, session.hasRequiredPermissions, hasUserWritePermission]);

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
            dataCy={getDataValue(dataCy, 'roles', role._id)}
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
      {userRoles.length === 0 && addableRoles.length === 0 && 'Aucun rôle'}
    </Wrap>
  );
};

export default UserRolesForm;
