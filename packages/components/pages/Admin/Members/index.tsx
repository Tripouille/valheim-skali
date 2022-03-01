import { getDataValue } from '@packages/utils/dataAttributes';
import { AdminNavRoute, ROUTES_TO_LABEL } from '@packages/utils/routes';
import {
  PermissionCategory,
  PermissionPrivilege,
  ROUTES_TO_PERMISSIONS,
} from '@packages/utils/auth';
import Secured from '@packages/components/core/Authentication/Secured';
import {
  Table,
  TableCaption,
  Tbody,
  Th,
  Thead,
  Tr,
} from '@packages/components/core/DataDisplay/Table';
import { avatarSize, getCellWidth, rowIconWidth, tableSize } from '../utils';
import { UserQueryFilter, useUsers } from '../hooks/useUsers';
import { useRoles } from '../hooks/useRoles';
import MemberRow from './MemberRow';

const Members = () => {
  const users = useUsers(UserQueryFilter.MEMBER);
  const roles = useRoles();

  return (
    <Secured permissions={ROUTES_TO_PERMISSIONS[AdminNavRoute.MEMBERS]}>
      <Table
        variant="striped"
        colorScheme="blue"
        size={tableSize}
        w={{ base: '100%', md: '90%', xl: '70%' }}
        margin="auto"
        sx={{ tableLayout: 'fixed' }}
      >
        <TableCaption placement="top" mt="0" pt="0" fontFamily="Norse" fontSize="2xl">
          {ROUTES_TO_LABEL[AdminNavRoute.MEMBERS]}
        </TableCaption>
        <Thead>
          <Tr>
            <Th width={getCellWidth(`${avatarSize}px`)}></Th>
            <Th textAlign="center">Pseudo en jeu</Th>
            <Th textAlign="center" display={{ base: 'none', md: 'table-cell' }}>
              Pseudo discord
            </Th>
            <Th textAlign="center" display={{ base: 'none', sm: 'table-cell' }}>
              Rôles
            </Th>
            <Secured permissions={{ [PermissionCategory.USER]: PermissionPrivilege.READ_WRITE }}>
              <Th width={getCellWidth(rowIconWidth)}></Th>
            </Secured>
          </Tr>
        </Thead>
        <Tbody>
          {users.map(user => (
            <MemberRow
              dataCy={getDataValue('members', user._id)}
              key={user._id}
              user={user}
              roles={roles}
            />
          ))}
        </Tbody>
      </Table>
    </Secured>
  );
};

export default Members;
