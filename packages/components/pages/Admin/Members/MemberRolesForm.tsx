import { BsPlusLg } from 'react-icons/bs';
import { isUserWithInfos, User } from '@packages/data/user';
import { Role } from '@packages/data/role';
import { getDataValue, DataAttributes } from '@packages/utils/dataAttributes';
import { Wrap } from '@packages/components/core/Containers/Wrap';
import Box from '@packages/components/core/Containers/Box';
import { Menu, MenuButton, MenuItem, MenuList } from '@packages/components/core/Overlay/Menu';
import Tag from '@packages/components/core/DataDisplay/Tag';
import Button from '@packages/components/core/Interactive/Button';
import { useUpdateUser } from '../hooks/useUpdateUser';
import { useMemo } from 'react';
import {
  SpecialRole,
  SpecialRolesParameters,
  userHasRequiredPermissions,
} from '@packages/utils/auth';
import { useSession } from '@packages/utils/hooks/useSession';

export interface MembersRoleFormProps extends DataAttributes {
  user: User;
  roles: Role[];
}

// TODO: move in data role
const isSpecialRoleName = (roleName: string): roleName is SpecialRole => {
  return Object.values(SpecialRole).includes(roleName as SpecialRole);
};

const MembersRoleForm: React.FC<MembersRoleFormProps> = ({ dataCy, user, roles }) => {
  const session = useSession();
  const updateUser = useUpdateUser(user);

  const userHasInfos = isUserWithInfos(user);

  const availableRoles = useMemo(() => {
    if (!session.data) return [];
    const nonOwnedRoles = userHasInfos
      ? roles.filter(role => !user.roleIds.includes(role._id))
      : roles;
    return nonOwnedRoles.filter(role => {
      if (
        isSpecialRoleName(role.name) &&
        !userHasRequiredPermissions(
          session.data.permissions,
          SpecialRolesParameters[role.name].canAssign,
        )
      ) {
        return false;
      }
      return true;
    });
  }, [roles, userHasInfos, user, session.data]);

  const removeRoleFromUser = (removedRole: Role) => () => {
    if ('roleIds' in user)
      updateUser({ roleIds: user.roleIds.filter(roleId => roleId !== removedRole._id) });
  };

  const addRoleToUser = (addedRole: Role) => () => {
    updateUser({ roleIds: [...('roleIds' in user ? user.roleIds : []), addedRole._id] });
  };

  return (
    <Wrap>
      {userHasInfos &&
        user.roleIds.map(roleId => {
          const role = roles.find(r => r._id === roleId);
          return role ? (
            <Tag key={roleId} label={role.name} size="lg" onClose={removeRoleFromUser(role)} />
          ) : null;
        })}
      {availableRoles.length > 0 && (
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
              {availableRoles.map(role => (
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
