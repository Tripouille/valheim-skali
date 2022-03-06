import Secured from '@packages/components/core/Authentication/Secured';
import { Table, Th, Thead, Tr, Tbody } from '@packages/components/core/DataDisplay/Table';
import { User } from '@packages/data/user';
import { PermissionCategory, PermissionPrivilege } from '@packages/utils/auth';
import { getDataValue } from '@packages/utils/dataAttributes';
import { tableSize, avatarSize, getCellWidth, rowIconWidth } from '../utils';
import { useRoles } from '../hooks/useRoles';
import MemberRow from './MemberRow';

export interface MembersTableProps {
  users: User[];
}

const MembersTable: React.FC<MembersTableProps> = ({ users }) => {
  const roles = useRoles();

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
          <Secured permissions={{ [PermissionCategory.ROLE]: PermissionPrivilege.READ }}>
            <Th textAlign="center" display={{ base: 'none', sm: 'table-cell' }}>
              Rôles
            </Th>
          </Secured>
          <Th width={getCellWidth(rowIconWidth)}></Th>
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
  );
};

export default MembersTable;
