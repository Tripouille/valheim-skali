import Secured from 'components/core/Authentication/Secured';
import { Table, Th, Thead, Tr, Tbody } from 'components/core/DataDisplay/Table';
import QueryHandler from 'components/core/Disclosure/QueryHandler';
import { User } from 'data/user';
import useRoles from 'hooks/roles/useRoles';
import { UserQueryFilter, useUsers } from 'hooks/users/useUsers';
import { UseQueryResult } from 'react-query';
import { avatarSize, getCellWidth, rowIconWidth, tableStyleProps } from 'theme/admin';
import { PermissionCategory, rolePrivilege, userPrivilege } from 'utils/permissions';
import UserRow from './UserRow';

export interface UsersTableProps {
  filter: UserQueryFilter;
}

const UsersTable: React.FC<UsersTableProps> = ({ filter }) => {
  const rolesQuery = useRoles();
  const roles = rolesQuery.data ?? [];

  const usersQuery = useUsers(filter);
  if (usersQuery.status === 'success' && !rolesQuery.data)
    (usersQuery as UseQueryResult<User[]>).status = 'loading';
  const users = usersQuery.data ?? [];

  return (
    <QueryHandler query={usersQuery}>
      {users.length ? (
        <Table {...tableStyleProps}>
          <Thead>
            <Tr>
              <Th width={getCellWidth(avatarSize)}></Th>
              <Th textAlign="center">Pseudo en jeu</Th>
              <Th textAlign="center" display={{ base: 'none', md: 'table-cell' }}>
                Pseudo discord
              </Th>
              {filter === UserQueryFilter.MEMBER && (
                <Secured permissions={{ [PermissionCategory.ROLE]: rolePrivilege.READ }}>
                  <Th textAlign="center" display={{ base: 'none', sm: 'table-cell' }}>
                    Rôles
                  </Th>
                </Secured>
              )}
              {filter === UserQueryFilter.NON_MEMBER && (
                <Secured permissions={{ [PermissionCategory.USER]: userPrivilege.READ_WRITE }}>
                  <Th textAlign="center">Promouvoir</Th>
                </Secured>
              )}
              <Secured permissions={{ [PermissionCategory.USER]: userPrivilege.READ_WRITE }}>
                <Th width={getCellWidth(rowIconWidth)}></Th>
              </Secured>
              <Th width={0}>{/* For modal in td */}</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user, index) => (
              <UserRow
                data-cy={`user-${index}`}
                key={user._id}
                user={user}
                roles={roles}
                filter={filter}
              />
            ))}
          </Tbody>
        </Table>
      ) : filter === UserQueryFilter.MEMBER ? (
        "Aucun viking n'a été accepté au Valhabba."
      ) : (
        "Aucune âme ne s'est perdue aux frontières du Valhabba."
      )}
    </QueryHandler>
  );
};

export default UsersTable;
