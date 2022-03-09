import { BiEdit } from 'react-icons/bi';
import { useDisclosure } from '@chakra-ui/react';
import { Role } from '@packages/data/role';
import { getDataValue, DataAttributes } from '@packages/utils/dataAttributes';
import {
  isAdminRole,
  PermissionCategory,
  PermissionPrivilege,
  PERMISSION_CATEGORY_TO_LABEL,
  PERMISSION_PRIVILEGE_TO_LABEL,
} from '@packages/utils/auth';
import useSession from '@packages/utils/hooks/useSession';
import Secured from '@packages/components/core/Authentication/Secured';
import IconButton from '@packages/components/core/Interactive/IconButton';
import { Table, Td, Tr, Th, Tbody } from '@packages/components/core/DataDisplay/Table';
import Tag from '@packages/components/core/DataDisplay/Tag';
import useUpdateRole from '../hooks/useUpdateRole';
import useDeleteRole from '../hooks/useDeleteRole';
import { rowIconSize } from '../utils';
import RoleModal from './RoleModal';

export interface RoleRowProps extends DataAttributes {
  role: Role;
}

const RoleRow: React.FC<RoleRowProps> = ({ dataCy, role }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { hasRequiredPermissions } = useSession();
  const updateRole = useUpdateRole(role);
  const deleteRole = useDeleteRole(role);

  const hasRoleWritePermission = hasRequiredPermissions({
    [PermissionCategory.ROLE]: PermissionPrivilege.READ_WRITE,
  });

  return (
    <Tr cursor={hasRoleWritePermission ? 'pointer' : 'auto'} onClick={onOpen}>
      <Td textAlign="center">
        <Tag label={role.name} />
      </Td>
      <Td>
        <Table>
          <Tbody>
            {isAdminRole(role)
              ? 'Toutes'
              : (
                  Object.entries(role.permissions) as [PermissionCategory, PermissionPrivilege][]
                ).map(([category, privilege]) => (
                  <Tr key={category}>
                    <Th w="28" ps="0">
                      {PERMISSION_CATEGORY_TO_LABEL[category]}
                    </Th>
                    <Td>{PERMISSION_PRIVILEGE_TO_LABEL[privilege]}</Td>
                  </Tr>
                ))}
          </Tbody>
        </Table>
      </Td>
      <Secured permissions={{ [PermissionCategory.ROLE]: PermissionPrivilege.READ_WRITE }}>
        <Td>
          <IconButton
            dataCy={getDataValue(dataCy, 'edit')}
            aria-label="Modifier le rôle"
            title="Modifier le rôle"
            icon={<BiEdit size="30" />}
            variant="ghost"
            size={rowIconSize}
            onClick={onOpen}
          />
          <RoleModal
            dataCy={getDataValue(dataCy, 'modal')}
            isOpen={isOpen}
            onClose={onClose}
            role={role}
            onSubmit={updateRole}
            onDelete={deleteRole}
          />
        </Td>
      </Secured>
    </Tr>
  );
};

export default RoleRow;
