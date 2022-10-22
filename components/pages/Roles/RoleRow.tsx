import { BiEdit } from 'react-icons/bi';
import { useDisclosure } from '@chakra-ui/react';
import Secured from 'components/core/Authentication/Secured';
import { Table, Td, Tr, Th, Tbody } from 'components/core/DataDisplay/Table';
import Tag from 'components/core/DataDisplay/Tag';
import IconButton from 'components/core/Interactive/IconButton';
import { isAdminRole, Role } from 'data/role';
import useDeleteRole from 'hooks/roles/useDeleteRole';
import useUpdateRole from 'hooks/roles/useUpdateRole';
import useSession from 'hooks/useSession';
import { rowIconSize } from 'theme/admin';
import {
  rolePrivilege,
  PermissionCategory,
  PERMISSION_CATEGORY_TO_LABEL,
  PERMISSION_PRIVILEGE_TO_LABEL,
  isPermissionCategory,
} from 'utils/permissions';
import { CypressProps } from 'utils/types';
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
    [PermissionCategory.ROLE]: rolePrivilege.ADMIN,
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
              {Object.entries(role.permissions).map(([category, privilege]) =>
                isPermissionCategory(category) ? (
                  <Tr key={category}>
                    <Th w="32" ps="0">
                      {PERMISSION_CATEGORY_TO_LABEL[category]}
                    </Th>
                    <Td>{PERMISSION_PRIVILEGE_TO_LABEL[category][privilege]}</Td>
                  </Tr>
                ) : null,
              )}
            </Tbody>
          </Table>
        )}
      </Td>
      <Secured permissions={{ [PermissionCategory.ROLE]: rolePrivilege.ADMIN }}>
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
