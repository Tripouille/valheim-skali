import { MouseEventHandler, useMemo } from 'react';
import { BiEdit } from 'react-icons/bi';
import { GiArmorUpgrade } from 'react-icons/gi';
import { useDisclosure } from '@chakra-ui/react';
import { limitedWidthVariant } from '@packages/theme/components/LimitedWidthText';
import { getDataValue, DataAttributes } from '@packages/utils/dataAttributes';
import { PermissionCategory, PermissionPrivilege, SpecialRoleName } from '@packages/utils/auth';
import { User } from '@packages/data/user';
import { compareRolesFromName, Role } from '@packages/data/role';
import { Wrap } from '@packages/components/core/Containers/Wrap';
import IconButton from '@packages/components/core/Interactive/IconButton';
import Tag from '@packages/components/core/DataDisplay/Tag';
import { Td, Tr } from '@packages/components/core/DataDisplay/Table';
import Secured from '@packages/components/core/Authentication/Secured';
import { getUserRoles, rowIconSize, UserQueryFilter } from '../utils';
import useUpdateUser from '../hooks/useUpdateUser';
import UserForm from './UserForm';
import UserAvatar from './UserAvatar';

export interface UserRowProps extends DataAttributes {
  user: User;
  roles: Role[];
  filter: UserQueryFilter;
}

const UserRow: React.FC<UserRowProps> = ({ dataCy, user, roles, filter }) => {
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
    <Tr cursor="pointer" onClick={onOpen}>
      <Td>
        <UserAvatar dataCy={dataCy} src={user.image} />
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
      {filter === UserQueryFilter.NON_MEMBER && (
        <Secured permissions={{ [PermissionCategory.USER]: PermissionPrivilege.READ_WRITE }}>
          <Td textAlign="center">
            <IconButton
              dataCy={getDataValue(dataCy, 'promote')}
              aria-label="Promouvoir comme Viking"
              title="Promouvoir comme Viking"
              icon={<GiArmorUpgrade size="30" />}
              variant="ghost"
              size={rowIconSize}
              onClick={handlePromoteClick}
            />
          </Td>
        </Secured>
      )}
      <Td>
        <IconButton
          dataCy={getDataValue(dataCy, 'edit')}
          aria-label="Modifier l'utilisateur"
          title="Modifier l'utilisateur"
          icon={<BiEdit size="30" />}
          variant="ghost"
          size={rowIconSize}
          onClick={onOpen}
        />
        <UserForm
          dataCy={getDataValue(dataCy, 'modal')}
          isOpen={isOpen}
          onClose={onClose}
          user={user}
          roles={roles}
        />
      </Td>
    </Tr>
  );
};

export default UserRow;
