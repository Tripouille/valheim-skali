import { FiHelpCircle } from 'react-icons/fi';
import { Setter } from '@packages/utils/types';
import {
  PermissionCategory,
  PermissionPrivilege,
  Permissions,
  PERMISSION_CATEGORY_TO_LABEL,
  PERMISSION_PRIVILEGE_TO_LABEL,
} from '@packages/utils/auth';
import { DataAttributes, getDataValue } from '@packages/utils/dataAttributes';
import { Table, Tbody, Td, Th, Tr } from '@packages/components/core/DataDisplay/Table';
import FormLabel from '@packages/components/core/Interactive/FormControl';
import Select from '@packages/components/core/Interactive/Select';
import Flex from '@packages/components/core/Containers/Flex';
import Tooltip from '@packages/components/core/Overlay/Tooltip';
import { modalTableHeaderWidth } from '../utils';

export interface RoleModalReqPermsFormProps extends DataAttributes {
  requiredPermissionsToAssign: Permissions;
  setRequiredPermissionsToAssign: Setter<Permissions>;
  isAdminRole: boolean;
  roleHasUserWritePermission: boolean;
}

/** "Required permissions to assign the role" form in role modal */
const RoleModalReqPermsForm: React.FC<RoleModalReqPermsFormProps> = ({
  dataCy,
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
            <FormLabel htmlFor="required_to_assign" m="0">
              {PERMISSION_CATEGORY_TO_LABEL[PermissionCategory.USER]}
            </FormLabel>
          </Th>
          <Td>
            <Flex align="center">
              <Select
                dataCy={getDataValue(dataCy, 'required_to_assign', 'select')}
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

export default RoleModalReqPermsForm;
