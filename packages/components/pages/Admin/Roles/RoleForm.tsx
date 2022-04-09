import { useEffect, useState } from 'react';
import { getDataValue, DataAttributes } from '@packages/utils/dataAttributes';
import { Callback } from '@packages/utils/types';
import { CreateRoleData, getRoleValidationError, Role } from '@packages/data/role';
import {
  isAdminRole,
  isSpecialRole,
  PermissionCategory,
  PermissionPrivilege,
  SpecialRoleName,
} from '@packages/utils/auth';
import Secured from '@packages/components/core/Authentication/Secured';
import { ModalBody } from '@packages/components/core/Overlay/Modal';
import { Table, Tbody, Td, Th, Tr } from '@packages/components/core/DataDisplay/Table';
import Text from '@packages/components/core/Typography/Text';
import FormModal from '@packages/components/core/Form/FormModal';
import Input from '@packages/components/core/Form/Input';
import { darkerBackgroundColor, getRoleFormData, modalTableHeaderWidth } from '../utils';
import RolePermissionsForm from './RolePermissionsForm';
import RoleReqPermsForm from './RoleReqPermsForm';

const defaultRoleFormData: CreateRoleData = {
  name: '',
  permissions: {},
  requiredPermissionsToAssign: { [PermissionCategory.USER]: PermissionPrivilege.READ_WRITE },
};

export type RoleFormProps = DataAttributes & {
  /** Modal is open */
  isOpen: boolean;
  /** Function to close the modal */
  onClose: Callback;
  /** Function to create or update role */
  onSubmit: (newRole: CreateRoleData) => void;
} & (
    | {
        /** If no role, this is a creation modal */
        role: Role;
        /** Function to delete role */
        onDelete: Callback;
      }
    | { role?: never; onDelete?: never }
  );

const RoleForm: React.FC<RoleFormProps> = (props: RoleFormProps) => {
  const { dataCy, isOpen, onClose, role, onSubmit } = props;

  const [roleFormData, setRoleFormData] = useState(
    role ? getRoleFormData(role) : defaultRoleFormData,
  );

  const roleHasUserWritePermission =
    (roleFormData.permissions[PermissionCategory.USER] ?? PermissionPrivilege.NONE) >=
      PermissionPrivilege.READ_WRITE ||
    (!!role && isAdminRole(role));

  useEffect(() => {
    if (isOpen) setRoleFormData(role ? getRoleFormData(role) : defaultRoleFormData);
  }, [role, isOpen]);

  useEffect(() => {
    if (
      isOpen &&
      roleHasUserWritePermission &&
      (roleFormData.requiredPermissionsToAssign[PermissionCategory.USER] ??
        PermissionPrivilege.NONE) < PermissionPrivilege.ADMIN
    ) {
      setRoleFormData(prev => ({
        ...prev,
        requiredPermissionsToAssign: { [PermissionCategory.USER]: PermissionPrivilege.ADMIN },
      }));
    }
  }, [roleHasUserWritePermission, roleFormData, isOpen]);

  const changePermissions =
    (category: PermissionCategory) => (newPrivilege: PermissionPrivilege) => {
      setRoleFormData(prev => ({
        ...prev,
        permissions: { ...prev.permissions, [category]: newPrivilege },
      }));
    };

  return (
    <FormModal
      dataCy={dataCy}
      isOpen={isOpen}
      onClose={onClose}
      formData={roleFormData}
      getValidationError={getRoleValidationError}
      canSubmit={!(role && isAdminRole(role))}
      onSubmit={onSubmit}
      {...(props.role
        ? {
            isEdition: true,
            canDelete: !(role && isSpecialRole(role)),
            onDelete: props.onDelete,
            deleteLabel: 'Supprimer le rôle',
            deletePopoverBody: 'Êtes-vous sûr de vouloir supprimer le rôle ?',
          }
        : { isEdition: false })}
    >
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
                    value={roleFormData.name}
                    onChange={name => setRoleFormData(prev => ({ ...prev, name }))}
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
                  permissions={roleFormData.permissions}
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
                    requiredPermissionsToAssign={roleFormData.requiredPermissionsToAssign}
                    setRequiredPermissionsToAssign={requiredPermissionsToAssign =>
                      setRoleFormData(prev => ({ ...prev, requiredPermissionsToAssign }))
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
    </FormModal>
  );
};

export default RoleForm;
