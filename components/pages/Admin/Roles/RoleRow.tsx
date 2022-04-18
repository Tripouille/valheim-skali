import { BiEdit } from 'react-icons/bi';
import { useDisclosure } from '@chakra-ui/react';
import { Role } from 'data/role';
import { CypressProps } from 'utils/types';
import {
  isAdminRole,
  PermissionCategory,
  PermissionPrivilege,
  PERMISSION_CATEGORY_TO_LABEL,
  PERMISSION_PRIVILEGE_TO_LABEL,
} from 'utils/auth';
import useSession from 'utils/hooks/useSession';
import Secured from 'components/core/Authentication/Secured';
import IconButton from 'components/core/Interactive/IconButton';
import { Table, Td, Tr, Th, Tbody } from 'components/core/DataDisplay/Table';
import Tag from 'components/core/DataDisplay/Tag';
import useUpdateRole from '../hooks/useUpdateRole';
import useDeleteRole from '../hooks/useDeleteRole';
import { rowIconSize } from '../utils';
import RoleForm from './RoleForm';

export interface RoleRowProps extends CypressProps {
  role: Role;
}

const RoleRow: React.FC<RoleRowProps> = ({ 'data-cy': dataCy, role }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { hasRequiredPermissions } = useSession();
  const updateRole = useUpdateRole(role);
  const deleteRole = useDeleteRole(role);

  const hasRoleWritePermission = hasRequiredPermissions({
    [PermissionCategory.ROLE]: PermissionPrivilege.READ_WRITE,
  });

  return (
    <Tr cursor={hasRoleWritePermission ? 'pointer' : 'auto'} onClick={onOpen} data-cy={dataCy}>
      <Td textAlign="center">
        <Tag label={role.name} />
      </Td>
      <Td>
        {isAdminRole(role) ? (
          'Toutes'
        ) : (
          <Table>
            <Tbody>
              {(
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
        )}
      </Td>
      <Secured permissions={{ [PermissionCategory.ROLE]: PermissionPrivilege.READ_WRITE }}>
        <Td>
          <IconButton
            data-cy="edit"
            aria-label="Modifier le rôle"
            title="Modifier le rôle"
            icon={<BiEdit size="30" />}
            variant="ghost"
            size={rowIconSize}
            onClick={onOpen}
          />
          <RoleForm
            data-cy="edit-role"
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
