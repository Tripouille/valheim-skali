import {
  isAdminPrivilege,
  PermissionCategory,
  PermissionPrivilege,
  Permissions,
  PERMISSION_CATEGORY_TO_LABEL,
  PERMISSION_PRIVILEGE_TO_LABEL,
} from 'utils/auth';
import { Table, Tbody, Td, Th, Tr } from 'components/core/DataDisplay/Table';
import { FormLabel } from 'components/core/Form/FormControl';
import Select from 'components/core/Form/Select';
import { modalTableHeaderWidth } from '../utils';

export interface RolePermissionsFormProps {
  isAdminRole: boolean;
  permissions: Permissions;
  onChange: (category: PermissionCategory) => (newPrivilege: PermissionPrivilege) => void;
}

const RolePermissionsForm: React.FC<RolePermissionsFormProps> = ({
  isAdminRole,
  permissions,
  onChange,
}) => {
  const availablePermissions = Object.values(PermissionPrivilege).filter(
    privilege => isAdminRole || !isAdminPrivilege(privilege),
  );

  const isPrivilegeForbiddenAndWhy = (
    category: PermissionCategory,
    privilege: PermissionPrivilege,
  ): false | string => {
    if (isAdminRole) return false;
    if (category === PermissionCategory.ROLE && privilege >= PermissionPrivilege.READ_WRITE)
      return 'Réservé aux Admins';
    if (
      category === PermissionCategory.USER &&
      privilege >= PermissionPrivilege.READ &&
      (permissions[PermissionCategory.ROLE] ?? PermissionPrivilege.NONE) < PermissionPrivilege.READ
    )
      return 'Doit pouvoir lire les rôles';
    return false;
  };

  const downgradePermissionInCategory = (category: PermissionCategory) => {
    const privilegesArray = Object.values(PermissionPrivilege);
    const privilegeIndex = privilegesArray.indexOf(
      permissions[category] ?? PermissionPrivilege.NONE,
    );
    if (privilegeIndex > 0) onChange(category)(privilegesArray[privilegeIndex - 1]);
  };

  return (
    <Table data-cy="permissions-form">
      <Tbody>
        <Tr>
          <Th>Catégorie</Th>
          <Th>Permissions sur la catégorie</Th>
        </Tr>
        {Object.values(PermissionCategory).map(category => (
          <Tr key={category}>
            <Th w={modalTableHeaderWidth}>
              <FormLabel htmlFor={category}>{PERMISSION_CATEGORY_TO_LABEL[category]}</FormLabel>
            </Th>
            <Td>
              <Select
                data-cy={category}
                id={category}
                maxW="sm"
                value={isAdminRole ? PermissionPrivilege.ADMIN : permissions[category]}
                onChange={onChange(category)}
                isDisabled={isAdminRole}
              >
                {availablePermissions.map(privilege => {
                  const forbiddenPrivilegeReason = isPrivilegeForbiddenAndWhy(category, privilege);
                  if (forbiddenPrivilegeReason && permissions[category] === privilege)
                    downgradePermissionInCategory(category);
                  return (
                    <option key={privilege} value={privilege} disabled={!!forbiddenPrivilegeReason}>
                      {PERMISSION_PRIVILEGE_TO_LABEL[privilege]}{' '}
                      {forbiddenPrivilegeReason ? `(${forbiddenPrivilegeReason})` : null}
                    </option>
                  );
                })}
              </Select>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default RolePermissionsForm;
