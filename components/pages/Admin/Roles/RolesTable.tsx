import { Role } from 'data/role';
import { getDataValue, noSpace } from 'utils/dataAttributes';
import { PermissionCategory, PermissionPrivilege } from 'utils/auth';
import Secured from 'components/core/Authentication/Secured';
import { Table, Th, Thead, Tr, Tbody } from 'components/core/DataDisplay/Table';
import { adminTableStyleProps, getCellWidth, rowIconWidth } from '../utils';
import RoleRow from './RoleRow';

export interface RolesTableProps {
  roles: Role[];
}

const RolesTable: React.FC<RolesTableProps> = ({ roles }) => {
  if (roles.length === 0) return <>Aucun rôle n&apos;a été créé.</>;

  return (
    <Table {...adminTableStyleProps}>
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
          <RoleRow dataCy={getDataValue('roles', noSpace(role.name))} key={role._id} role={role} />
        ))}
      </Tbody>
    </Table>
  );
};

export default RolesTable;
