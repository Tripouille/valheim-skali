import Secured from '@packages/components/core/Authentication/Secured';
import { Table, Th, Thead, Tr, Tbody } from '@packages/components/core/DataDisplay/Table';
import { User } from '@packages/data/user';
import { PermissionCategory, PermissionPrivilege } from '@packages/utils/auth';
import { getDataValue } from '@packages/utils/dataAttributes';
import {
  avatarSize,
  getCellWidth,
  rowIconWidth,
  UserQueryFilter,
  adminTableStyleProps,
} from '../utils';
import { useRoles } from '../hooks/useRoles';
import UserRow from './UserRow';

export interface UsersTableProps {
  users?: User[];
  filter: UserQueryFilter;
}

const UsersTable: React.FC<UsersTableProps> = ({ users = [], filter }) => {
  const { data: roles = [] } = useRoles();

  if (users.length === 0)
    return (
      <>
        {filter === UserQueryFilter.MEMBER
          ? "Aucun viking n'a été accepté au Valhabba."
          : "Aucune âme ne s'est perdue aux frontières du Valhabba."}
      </>
    );

  return (
    <Table {...adminTableStyleProps}>
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
          {filter === UserQueryFilter.NON_MEMBER && (
            <Secured permissions={{ [PermissionCategory.USER]: PermissionPrivilege.READ_WRITE }}>
              <Th textAlign="center">Promouvoir</Th>
            </Secured>
          )}
          <Th width={getCellWidth(rowIconWidth)}></Th>
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
