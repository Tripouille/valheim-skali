import { useMemo } from 'react';
import { BsPlusLg } from 'react-icons/bs';
import Box from 'components/core/Containers/Box';
import { Wrap } from 'components/core/Containers/Wrap';
import Tag from 'components/core/DataDisplay/Tag';
import Button from 'components/core/Interactive/Button';
import { Menu, MenuButton, MenuItem, MenuList } from 'components/core/Overlay/Menu';
import { compareRolesFromName, Role } from 'data/role';
import { canUserAssignRole, getUserRoles, User } from 'data/user';
import useUpdateUser from 'hooks/users/useUpdateUser';
import useSession from 'hooks/useSession';
import { PermissionCategory, userPrivilege } from 'utils/permissions';

export interface UserRolesFormProps {
  user: User;
  roles: Role[];
}

const UserRolesForm: React.FC<UserRolesFormProps> = ({ user, roles }) => {
  const session = useSession();
  const { addRoleToUser, removeRoleFromUser } = useUpdateUser(user);

  const userRoles = useMemo(
    () => getUserRoles(user, roles).sort(compareRolesFromName),
    [roles, user],
  );

  const hasUserWritePermission = session.hasRequiredPermissions({
    [PermissionCategory.USER]: userPrivilege.READ_WRITE,
  });

  const addableRoles = useMemo(() => {
    if (!hasUserWritePermission) return [];
    const nonOwnedRoles = roles.filter(role => !user.roleIds || !user.roleIds.includes(role._id));
    return nonOwnedRoles.filter(role => canUserAssignRole(role, session.hasRequiredPermissions));
  }, [roles, user, session.hasRequiredPermissions, hasUserWritePermission]);

  const canRemoveRole = (role: Role) => {
    return hasUserWritePermission && canUserAssignRole(role, session.hasRequiredPermissions);
  };

  if (userRoles.length === 0 && addableRoles.length === 0) return <>Aucun rôle</>;

  return (
    <Wrap data-cy="roles-form">
      {userRoles.map(role => {
        return role ? (
          <Tag
            key={role._id}
            label={role.name}
            size="lg"
            onClose={canRemoveRole(role) ? removeRoleFromUser(role) : undefined}
            data-cy={role.name}
          />
        ) : null;
      })}
      {addableRoles.length > 0 && (
        <Box>
          <Menu placement="bottom" gutter={0}>
            <MenuButton
              data-cy="add-role"
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
                  data-cy={`add-role-${role.name}`}
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

export default UserRolesForm;
