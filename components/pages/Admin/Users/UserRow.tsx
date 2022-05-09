import { MouseEventHandler, useMemo } from 'react';
import { BiEdit } from 'react-icons/bi';
import { GiArmorUpgrade } from 'react-icons/gi';
import { useDisclosure } from '@chakra-ui/react';
import { limitedWidthVariant } from 'theme/components/LimitedWidthText';
import { CypressProps } from 'utils/types';
import { PermissionCategory, PermissionPrivilege, SpecialRoleName } from 'utils/auth';
import { User } from 'data/user';
import { compareRolesFromName, Role } from 'data/role';
import { Wrap } from 'components/core/Containers/Wrap';
import IconButton from 'components/core/Interactive/IconButton';
import Tag from 'components/core/DataDisplay/Tag';
import { Td, Tr } from 'components/core/DataDisplay/Table';
import Secured from 'components/core/Authentication/Secured';
import { getUserRoles, rowIconSize, UserQueryFilter } from '../utils';
import useUpdateUser from '../hooks/useUpdateUser';
import UserForm from './UserForm';
import UserAvatar from './UserAvatar';

export interface UserRowProps extends CypressProps {
  user: User;
  roles: Role[];
  filter: UserQueryFilter;
}

const UserRow: React.FC<UserRowProps> = ({ 'data-cy': dataCy, user, roles, filter }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { addRoleToUser } = useUpdateUser(user);

  const userRoles = useMemo(
    () => getUserRoles(user, roles).sort(compareRolesFromName),
    [user, roles],
  );

  const handlePromoteClick: MouseEventHandler<HTMLButtonElement> = e => {
    e.stopPropagation(); /** Prevent opening the user modal */
    const memberRole = roles.find(role => role.name === SpecialRoleName.MEMBER);
    if (memberRole) {
      addRoleToUser(memberRole)();
    }
  };

  return (
    <Tr cursor="pointer" onClick={onOpen} data-cy={dataCy}>
      <Td>
        <UserAvatar src={user.image} />
      </Td>
      <Td textAlign="center" {...limitedWidthVariant}>
        {user.nameInGame}
      </Td>
      <Td textAlign="center" display={{ base: 'none', md: 'table-cell' }} {...limitedWidthVariant}>
        {user.name}
      </Td>
      {filter === UserQueryFilter.MEMBER && (
        <Secured permissions={{ [PermissionCategory.ROLE]: PermissionPrivilege.READ }}>
          <Td display={{ base: 'none', sm: 'table-cell' }}>
            {
              <Wrap justify="center">
                {userRoles.map(role => {
                  return role ? <Tag key={role._id} label={role.name} /> : null;
                })}
              </Wrap>
            }
          </Td>
        </Secured>
      )}
      <Secured permissions={{ [PermissionCategory.USER]: PermissionPrivilege.READ_WRITE }}>
        {filter === UserQueryFilter.NON_MEMBER && (
          <Td textAlign="center">
            <IconButton
              data-cy="promote"
              aria-label="Promouvoir comme Viking"
              title="Promouvoir comme Viking"
              icon={<GiArmorUpgrade size="30" />}
              variant="ghost"
              size={rowIconSize}
              onClick={handlePromoteClick}
            />
          </Td>
        )}
        <Td>
          <IconButton
            data-cy="edit"
            aria-label="Modifier l'utilisateur"
            title="Modifier l'utilisateur"
            icon={<BiEdit size="30" />}
            variant="ghost"
            size={rowIconSize}
            onClick={onOpen}
          />
        </Td>
      </Secured>
      <Td>
        <UserForm data-cy="edit-user" isOpen={isOpen} onClose={onClose} user={user} roles={roles} />
      </Td>
    </Tr>
  );
};

export default UserRow;
