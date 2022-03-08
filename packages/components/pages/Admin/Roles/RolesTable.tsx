import { Role } from '@packages/data/role';
import { getDataValue } from '@packages/utils/dataAttributes';
import { PermissionCategory, PermissionPrivilege } from '@packages/utils/auth';
import Secured from '@packages/components/core/Authentication/Secured';
import { Table, Th, Thead, Tr, Tbody } from '@packages/components/core/DataDisplay/Table';
import { getCellWidth, rowIconWidth, tableSize } from '../utils';
import RoleRow from './RoleRow';

export interface RolesTableProps {
  roles: Role[];
}

const RolesTable: React.FC<RolesTableProps> = ({ roles }) => {
  if (roles.length === 0) return <>Aucun rôle n&apos;a été créé.</>;

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
          <Th textAlign="center" w={{ base: '36', xl: '2xs' }}>
            Nom
          </Th>
          <Th>Permissions</Th>
          <Secured permissions={{ [PermissionCategory.ROLE]: PermissionPrivilege.READ_WRITE }}>
            <Th width={getCellWidth(rowIconWidth)}></Th>
          </Secured>
        </Tr>
      </Thead>
      <Tbody>
        {roles.map(role => (
          <RoleRow dataCy={getDataValue('roles', role._id)} key={role._id} role={role} />
        ))}
      </Tbody>
    </Table>
  );
};

export default RolesTable;