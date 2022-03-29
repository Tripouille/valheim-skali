import { useEffect, useState } from 'react';
import { getDataValue, DataAttributes } from '@packages/utils/dataAttributes';
import { Callback } from '@packages/utils/types';
import { CreateRoleData, Role, UpdateRoleData } from '@packages/data/role';
import {
  isAdminRole,
  isSpecialRole,
  PermissionCategory,
  PermissionPrivilege,
  SpecialRoleName,
} from '@packages/utils/auth';
import Secured from '@packages/components/core/Authentication/Secured';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from '@packages/components/core/Overlay/Modal';
import { Table, Tbody, Td, Th, Tr } from '@packages/components/core/DataDisplay/Table';
import Text from '@packages/components/core/Typography/Text';
import Input from '@packages/components/core/Form/Input';
import { darkerBackgroundColor, getRoleFormData, modalTableHeaderWidth } from '../utils';
import RolePermissionsForm from './RolePermissionsForm';
import RoleFormFooter from './RoleFormFooter';
import RoleReqPermsForm from './RoleReqPermsForm';

const defaultRoleData: CreateRoleData = {
  name: '',
  permissions: {},
  requiredPermissionsToAssign: { [PermissionCategory.USER]: PermissionPrivilege.READ_WRITE },
};

export interface RoleFormProps extends DataAttributes {
  /** Modal is open */
  isOpen: boolean;
  /** Function to close the modal */
  onClose: Callback;
  /** If no role, this is a creation modal */
  role?: Role;
  /** Function to create or update role */
  onSubmit: ((newRole: UpdateRoleData) => void) | ((newRole: CreateRoleData) => void);
  /** Function to delete role */
  onDelete?: Callback;
}

const RoleForm: React.FC<RoleFormProps> = ({
  dataCy,
  isOpen,
  onClose,
  role,
  onSubmit,
  onDelete,
}: RoleFormProps) => {
  const [roleData, setRoleData] = useState(role ? getRoleFormData(role) : defaultRoleData);

  const roleHasUserWritePermission =
    (roleData.permissions[PermissionCategory.USER] ?? PermissionPrivilege.NONE) >=
      PermissionPrivilege.READ_WRITE ||
    (!!role && isAdminRole(role));

  useEffect(() => {
    if (isOpen) setRoleData(role ? getRoleFormData(role) : defaultRoleData);
  }, [role, isOpen]);

  useEffect(() => {
    if (
      isOpen &&
      roleHasUserWritePermission &&
      (roleData.requiredPermissionsToAssign[PermissionCategory.USER] ?? PermissionPrivilege.NONE) <
        PermissionPrivilege.ADMIN
    ) {
      setRoleData(prev => ({
        ...prev,
        requiredPermissionsToAssign: { [PermissionCategory.USER]: PermissionPrivilege.ADMIN },
      }));
    }
  }, [roleHasUserWritePermission, roleData, isOpen]);

  const changePermissions =
    (category: PermissionCategory) => (newPrivilege: PermissionPrivilege) => {
      setRoleData(prev => ({
        ...prev,
        permissions: { ...prev.permissions, [category]: newPrivilege },
      }));
    };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <Table>
            <Tbody>
              <Tr bgColor={darkerBackgroundColor}>
                <Th w={modalTableHeaderWidth}>Nom</Th>
                <Td>
                  <Secured
                    permissions={{
                      [PermissionCategory.ROLE]:
                        role && isSpecialRole(role)
                          ? PermissionPrivilege.SUPER_ADMIN
                          : PermissionPrivilege.READ_WRITE,
                    }}
                    fallback={
                      <Text fontSize="md" m="3">
                        {role?.name}
                      </Text>
                    }
                  >
                    <Input
                      dataCy={getDataValue(dataCy, 'name', 'input')}
                      id="role_name"
                      value={roleData.name}
                      onChange={name => setRoleData(prev => ({ ...prev, name }))}
                    />
                  </Secured>
                </Td>
              </Tr>
              <Tr>
                <Th></Th>
                <Td>
                  <RolePermissionsForm
                    dataCy={getDataValue(dataCy, 'permissions')}
                    isAdminRole={!!role && isAdminRole(role)}
                    permissions={roleData.permissions}
                    onChange={changePermissions}
                  />
                </Td>
              </Tr>
              {(!role || role.name !== SpecialRoleName.VISITOR) && (
                <Tr bgColor={darkerBackgroundColor}>
                  <Th>Permissions requises pour assigner ce rôle</Th>
                  <Td>
                    <RoleReqPermsForm
                      dataCy={dataCy}
                      requiredPermissionsToAssign={roleData.requiredPermissionsToAssign}
                      setRequiredPermissionsToAssign={requiredPermissionsToAssign =>
                        setRoleData(prev => ({ ...prev, requiredPermissionsToAssign }))
                      }
                      isAdminRole={!!role && isAdminRole(role)}
                      roleHasUserWritePermission={roleHasUserWritePermission}
                    />
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </ModalBody>
        <ModalCloseButton dataCy={getDataValue(dataCy, 'close_button')} />
        <RoleFormFooter
          dataCy={dataCy}
          role={role}
          onSubmit={() => onSubmit(roleData)}
          onDelete={onDelete}
          isValid={roleData.name.length > 0}
        />
      </ModalContent>
    </Modal>
  );
};

export default RoleForm;
