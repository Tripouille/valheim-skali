import {
  CommonPermissionPrivilege,
  getSortedCategoryPrivileges,
  isAdminPrivilege,
  PermissionCategory,
  PermissionPrivilege,
  Permissions,
  PERMISSION_CATEGORY_TO_LABEL,
  PERMISSION_PRIVILEGE_TO_LABEL,
  rolePrivilege,
  userPrivilege,
} from 'utils/permissions';
import { Table, Tbody, Td, Th, Tr } from 'components/core/DataDisplay/Table';
import { FormLabel } from 'components/core/Form/FormControl';
import Select from 'components/core/Form/Select';
import { modalTableHeaderWidth } from '../utils';

export interface RolePermissionsFormProps {
  isAdminRole: boolean;
  permissions: Permissions;
  onChange: <C extends PermissionCategory>(
    category: C,
  ) => (newPrivilege: PermissionPrivilege<C>) => void;
}

const RolePermissionsForm: React.FC<RolePermissionsFormProps> = ({
  isAdminRole,
  permissions,
  onChange,
}) => {
  const getAvailablePrivileges = <C extends PermissionCategory>(category: C) => {
    return getSortedCategoryPrivileges(category)
      .filter(privilege => isAdminRole || !isAdminPrivilege(privilege))
      .sort();
  };

  const isPrivilegeForbiddenAndWhy = <C extends PermissionCategory>(
    category: C,
    privilege: PermissionPrivilege<C>,
  ): false | string => {
    if (isAdminRole) return false;
    if (
      category === PermissionCategory.USER &&
      privilege >= userPrivilege.READ &&
      (permissions[PermissionCategory.ROLE] ?? rolePrivilege.NONE) < rolePrivilege.READ
    )
      return 'Doit pouvoir lire les rôles';
    return false;
  };

  const downgradePermissionInCategory = <C extends PermissionCategory>(category: C) => {
    const categoryPrivileges = getSortedCategoryPrivileges(category);
    const privilegeIndex = categoryPrivileges.indexOf(
      permissions[category] ?? (CommonPermissionPrivilege.NONE as PermissionPrivilege<C>),
    );
    if (privilegeIndex > 0) onChange(category)(categoryPrivileges[privilegeIndex - 1]);
  };

  return (
    <Table data-cy="permissions-form">
      <Tbody>
        <Tr>
          <Th>Catégorie</Th>
          <Th>Permissions sur la catégorie</Th>
        </Tr>
        {Object.values(PermissionCategory).map(<C extends PermissionCategory>(category: C) => (
          <Tr key={category}>
            <Th w={modalTableHeaderWidth}>
              <FormLabel htmlFor={category}>{PERMISSION_CATEGORY_TO_LABEL[category]}</FormLabel>
            </Th>
            <Td>
              <Select
                data-cy={category}
                id={category}
                maxW="sm"
                value={isAdminRole ? CommonPermissionPrivilege.ADMIN : permissions[category]}
                onChange={onChange(category)}
                isDisabled={isAdminRole}
              >
                {getAvailablePrivileges(category).map(privilege => {
                  const forbiddenPrivilegeReason = isPrivilegeForbiddenAndWhy(category, privilege);
                  if (forbiddenPrivilegeReason && permissions[category] === privilege)
                    downgradePermissionInCategory(category);
                  return (
                    <option key={privilege} value={privilege} disabled={!!forbiddenPrivilegeReason}>
                      {PERMISSION_PRIVILEGE_TO_LABEL[category][privilege]}
                      {forbiddenPrivilegeReason ? ` (${forbiddenPrivilegeReason})` : null}
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
