import Secured from 'components/core/Authentication/Secured';
import { Table, Th, Thead, Tr, Tbody } from 'components/core/DataDisplay/Table';
import { User } from 'data/user';
import { PermissionCategory, rolePrivilege, userPrivilege } from 'utils/permissions';
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
  );
};

export default UsersTable;
