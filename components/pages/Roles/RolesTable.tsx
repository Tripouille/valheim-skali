import Secured from 'components/core/Authentication/Secured';
import { Table, Th, Thead, Tr, Tbody } from 'components/core/DataDisplay/Table';
import { Role } from 'data/role';
import { tableStyleProps, getCellWidth, rowIconWidth } from 'theme/admin';
import { rolePrivilege, PermissionCategory } from 'utils/permissions';
import RoleRow from './RoleRow';

export interface RolesTableProps {
  roles: Role[];
}

const RolesTable: React.FC<RolesTableProps> = ({ roles }) => {
  if (roles.length === 0) return null;

  return (
    <Table {...tableStyleProps} w={{ base: '100%', xl: '80%' }}>
      <Thead>
        <Tr>
          <Th textAlign="center" w={{ base: '36', xl: '2xs' }}>
            Nom
          </Th>
          <Th>Permissions</Th>
          <Secured permissions={{ [PermissionCategory.ROLE]: rolePrivilege.ADMIN }}>
            <Th width={getCellWidth(rowIconWidth)}></Th>
          </Secured>
        </Tr>
      </Thead>
      <Tbody>
        {roles.map((role, index) => (
          <RoleRow data-cy={`role-${index}`} key={role._id} role={role} />
        ))}
      </Tbody>
    </Table>
  );
};

export default RolesTable;
