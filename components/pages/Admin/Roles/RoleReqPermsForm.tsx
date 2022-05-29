import { FiHelpCircle } from 'react-icons/fi';
import {
  PermissionCategory,
  Permissions,
  PERMISSION_CATEGORY_TO_LABEL,
  PERMISSION_PRIVILEGE_TO_LABEL,
  userPrivilege,
} from 'utils/permissions';
import { Table, Tbody, Td, Th, Tr } from 'components/core/DataDisplay/Table';
import { FormLabel } from 'components/core/Form/FormControl';
import Select from 'components/core/Form/Select';
import Flex from 'components/core/Containers/Flex';
import Tooltip from 'components/core/Overlay/Tooltip';
import { modalTableHeaderWidth } from '../utils';

export interface RoleReqPermsFormProps {
  requiredPermissionsToAssign: Permissions;
  setRequiredPermissionsToAssign: (requiredPermissionsToAssign: Permissions) => void;
  isAdminRole: boolean;
  roleHasUserWritePermission: boolean;
}

/** "Required permissions to assign the role" form in role modal */
const RoleReqPermsForm: React.FC<RoleReqPermsFormProps> = ({
  requiredPermissionsToAssign,
  setRequiredPermissionsToAssign,
  roleHasUserWritePermission,
  isAdminRole,
}) => {
  const changeRequiredPermissionsToAssign = (
    newPrivilege: NonNullable<Permissions[PermissionCategory.USER]>,
  ) => {
    setRequiredPermissionsToAssign({
      [PermissionCategory.USER]: newPrivilege,
    });
  };

  return (
    <Table data-cy="required-permissions-form">
      <Tbody>
        <Tr>
          <Th w={modalTableHeaderWidth}>
            <FormLabel htmlFor="required_to_assign">
              {PERMISSION_CATEGORY_TO_LABEL[PermissionCategory.USER]}
            </FormLabel>
          </Th>
          <Td>
            <Flex align="center">
              <Select
                data-cy="required-to-assign"
                id="required_to_assign"
                maxW="sm"
                value={requiredPermissionsToAssign[PermissionCategory.USER]}
                onChange={changeRequiredPermissionsToAssign}
                isDisabled={roleHasUserWritePermission}
              >
                <option value={userPrivilege.READ_WRITE}>
                  {PERMISSION_PRIVILEGE_TO_LABEL[PermissionCategory.USER][userPrivilege.READ_WRITE]}
                </option>
                <option value={userPrivilege.ADMIN}>
                  {PERMISSION_PRIVILEGE_TO_LABEL[PermissionCategory.USER][userPrivilege.ADMIN]}
                </option>
                {isAdminRole && (
                  <option value={userPrivilege.SUPER_ADMIN}>
                    {
                      PERMISSION_PRIVILEGE_TO_LABEL[PermissionCategory.USER][
                        userPrivilege.SUPER_ADMIN
                      ]
                    }
                  </option>
                )}
              </Select>
              {roleHasUserWritePermission && !isAdminRole && (
                <Tooltip
                  label="Le rôle Admin est obligatoire pour assigner le rôle si ce rôle peut modifier les utilisateurs."
                  placement="end"
                >
                  <span style={{ marginLeft: '1em' }} data-cy="req-permissions-help">
                    <FiHelpCircle />
                  </span>
                </Tooltip>
              )}
            </Flex>
          </Td>
        </Tr>
      </Tbody>
    </Table>
  );
};

export default RoleReqPermsForm;
