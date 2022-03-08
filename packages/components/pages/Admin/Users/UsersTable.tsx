import Secured from '@packages/components/core/Authentication/Secured';
import { Table, Th, Thead, Tr, Tbody } from '@packages/components/core/DataDisplay/Table';
import { User } from '@packages/data/user';
import { PermissionCategory, PermissionPrivilege } from '@packages/utils/auth';
import { getDataValue } from '@packages/utils/dataAttributes';
import { tableSize, avatarSize, getCellWidth, rowIconWidth, UserQueryFilter } from '../utils';
import { useRoles } from '../hooks/useRoles';
import UserRow from './UserRow';

export interface UsersTableProps {
  users: User[];
  filter: UserQueryFilter;
}

const UsersTable: React.FC<UsersTableProps> = ({ users, filter }) => {
  const roles = useRoles();

  if (users.length === 0)
    return (
      <>
        {filter === UserQueryFilter.MEMBER
          ? "Aucun viking n'a été accepté au Valhabba."
          : "Aucune âme ne s'est perdue aux frontières du Valhabba."}
      </>
    );

  return (
    <Table
      variant="striped"
      colorScheme="blue"
      size={tableSize}
      w={{ base: '100%', md: '90%', xl: '70%' }}
      margin="auto"
      sx={{ tableLayout: 'fixed' }}
    >
      <Thead>
        <Tr>
          <Th width={getCellWidth(`${avatarSize}px`)}></Th>
          <Th textAlign="center">Pseudo en jeu</Th>
          <Th textAlign="center" display={{ base: 'none', md: 'table-cell' }}>
            Pseudo discord
          </Th>
          {filter === UserQueryFilter.MEMBER && (
            <Secured permissions={{ [PermissionCategory.ROLE]: PermissionPrivilege.READ }}>
              <Th textAlign="center" display={{ base: 'none', sm: 'table-cell' }}>
                Rôles
              </Th>
            </Secured>
          )}
          <Secured permissions={{ [PermissionCategory.USER]: PermissionPrivilege.READ_WRITE }}>
            {filter === UserQueryFilter.NON_MEMBER && <Th textAlign="center">Promouvoir</Th>}
            <Th width={getCellWidth(rowIconWidth)}></Th>
          </Secured>
        </Tr>
      </Thead>
      <Tbody>
        {users.map(user => (
          <UserRow
            dataCy={getDataValue('users', user._id)}
            key={user._id}
            user={user}
            roles={roles}
            filter={filter}
          />
        ))}
      </Tbody>
    </Table>
  );
};

export default UsersTable;
