import { FiHelpCircle } from 'react-icons/fi';
import {
  PermissionCategory,
  PermissionPrivilege,
  Permissions,
  PERMISSION_CATEGORY_TO_LABEL,
  PERMISSION_PRIVILEGE_TO_LABEL,
} from 'utils/auth';
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
  const changeRequiredPermissionsToAssign = (newPrivilege: PermissionPrivilege) => {
    setRequiredPermissionsToAssign({
      [PermissionCategory.USER]: newPrivilege,
    });
  };

  return (
    <Table>
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
                id="required_to_assign"
                maxW="sm"
                value={requiredPermissionsToAssign[PermissionCategory.USER]}
                onChange={changeRequiredPermissionsToAssign}
                isDisabled={roleHasUserWritePermission}
              >
                <option value={PermissionPrivilege.READ_WRITE}>
                  {PERMISSION_PRIVILEGE_TO_LABEL[PermissionPrivilege.READ_WRITE]}
                </option>
                <option value={PermissionPrivilege.ADMIN}>
                  {PERMISSION_PRIVILEGE_TO_LABEL[PermissionPrivilege.ADMIN]}
                </option>
                {isAdminRole && (
                  <option value={PermissionPrivilege.SUPER_ADMIN}>
                    {PERMISSION_PRIVILEGE_TO_LABEL[PermissionPrivilege.SUPER_ADMIN]}
                  </option>
                )}
              </Select>
              {roleHasUserWritePermission && !isAdminRole && (
                <Tooltip
                  label="Le rôle Admin est obligatoire pour assigner le rôle si ce rôle peut modifier les utilisateurs."
                  placement="end"
                >
                  <span style={{ marginLeft: '1em' }}>
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
