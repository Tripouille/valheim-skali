import { Role } from '@packages/data/role';
import { getDataValue, DataAttributes } from '@packages/utils/dataAttributes';
import {
  PermissionCategory,
  PermissionPrivilege,
  Permissions,
  PERMISSION_CATEGORY_TO_LABEL,
  PERMISSION_PRIVILEGE_TO_LABEL,
  SpecialRoleName,
} from '@packages/utils/auth';
import { Table, Tbody, Td, Th, Tr } from '@packages/components/core/DataDisplay/Table';
import FormLabel from '@packages/components/core/Interactive/FormControl';
import Select from '@packages/components/core/Interactive/Select';

export interface RolePermissionsFormProps extends DataAttributes {
  role: Role;
  permissions: Permissions;
  onChange: (category: PermissionCategory) => (newPrivilege: PermissionPrivilege) => void;
}

const RolePermissionsForm: React.FC<RolePermissionsFormProps> = ({
  dataCy,
  role,
  permissions,
  onChange,
}) => {
  const availablePermissions = Object.values(PermissionPrivilege).filter(
    privilege =>
      privilege !== PermissionPrivilege.ADMIN && privilege !== PermissionPrivilege.SUPER_ADMIN,
  );

  const isAdminRole =
    role.name === SpecialRoleName.ADMIN || role.name === SpecialRoleName.SUPER_ADMIN;

  const isPrivilegeForbiddenAndWhy = (
    category: PermissionCategory,
    privilege: PermissionPrivilege,
  ): false | string => {
    if (isAdminRole) return false;
    if (category === PermissionCategory.ROLE && privilege === PermissionPrivilege.READ_WRITE)
      return 'Réservé aux Admins';
    if (
      category === PermissionCategory.USER &&
      privilege === PermissionPrivilege.READ_WRITE &&
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
    <Table colorScheme="blue" size="sm">
      <Tbody>
        {Object.values(PermissionCategory).map(category => (
          <Tr key={category}>
            <Th w="20%">
              <FormLabel htmlFor={category} m="0">
                {PERMISSION_CATEGORY_TO_LABEL[category]}
              </FormLabel>
            </Th>
            <Td>
              <Select
                dataCy={getDataValue(dataCy, category, 'select')}
                id={category}
                maxW="sm"
                value={isAdminRole ? PermissionPrivilege.READ_WRITE : permissions[category]}
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
