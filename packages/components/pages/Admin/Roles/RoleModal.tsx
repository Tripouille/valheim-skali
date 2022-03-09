import { useEffect, useState } from 'react';
import { getDataValue, DataAttributes } from '@packages/utils/dataAttributes';
import { Callback } from '@packages/utils/types';
import { Role } from '@packages/data/role';
import {
  isAdminRole,
  isSpecialRole,
  PermissionCategory,
  PermissionPrivilege,
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
import Input from '@packages/components/core/Interactive/Input';
import useUpdateRole from '../hooks/useUpdateRole';
import { darkerBackgroundColor, modalTableHeaderWidth } from '../utils';
import RolePermissionsForm from './RolePermissionsForm';
import RoleModalFooter from './RoleModalFooter';
import RoleModalReqPermsForm from './RoleModalReqPermsForm';

export interface RoleModalProps extends DataAttributes {
  isOpen: boolean;
  onClose: Callback;
  role: Role;
}

const RoleModal: React.FC<RoleModalProps> = ({ dataCy, isOpen, onClose, role }) => {
  const [name, setName] = useState(role.name);
  const [permissions, setPermissions] = useState(role.permissions);
  const [requiredPermissionsToAssign, setRequiredPermissionsToAssign] = useState(
    role.requiredPermissionsToAssign,
  );
  const updateRole = useUpdateRole(role);

  useEffect(() => {
    setName(role.name);
    setPermissions(role.permissions);
    setRequiredPermissionsToAssign(role.requiredPermissionsToAssign);
  }, [role, isOpen]);

  const roleHasUserWritePermission =
    (permissions[PermissionCategory.USER] ?? PermissionPrivilege.NONE) >=
      PermissionPrivilege.READ_WRITE || isAdminRole(role);

  useEffect(() => {
    if (
      roleHasUserWritePermission &&
      (requiredPermissionsToAssign[PermissionCategory.USER] ?? PermissionPrivilege.NONE) <
        PermissionPrivilege.ADMIN
    ) {
      setRequiredPermissionsToAssign({ [PermissionCategory.USER]: PermissionPrivilege.ADMIN });
    }
  }, [roleHasUserWritePermission, requiredPermissionsToAssign, isOpen]);

  const changePermissions =
    (category: PermissionCategory) => (newPrivilege: PermissionPrivilege) => {
      setPermissions(previousPermissions => ({
        ...previousPermissions,
        [category]: newPrivilege,
      }));
    };

  const submit = () => updateRole({ name, permissions, requiredPermissionsToAssign });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <Table>
            <Tbody>
              <Tr bgColor={darkerBackgroundColor}>
                <Th w={modalTableHeaderWidth}>Nom</Th>
                <Td>
                  <Secured
                    permissions={{ [PermissionCategory.ROLE]: PermissionPrivilege.READ_WRITE }}
                    fallback={<Text>{role.name}</Text>}
                  >
                    <Input
                      dataCy={getDataValue(dataCy, 'name', 'input')}
                      value={name}
                      onChange={setName}
                      isReadOnly={isSpecialRole(role)}
                    />
                  </Secured>
                </Td>
              </Tr>
              <Tr>
                <Th></Th>
                <Td>
                  <RolePermissionsForm
                    dataCy={getDataValue(dataCy, 'permissions')}
                    role={role}
                    permissions={permissions}
                    onChange={changePermissions}
                  />
                </Td>
              </Tr>
              <Tr bgColor={darkerBackgroundColor}>
                <Th>Permissions requises pour assigner ce rôle</Th>
                <Td>
                  <RoleModalReqPermsForm
                    dataCy={dataCy}
                    requiredPermissionsToAssign={requiredPermissionsToAssign}
                    setRequiredPermissionsToAssign={setRequiredPermissionsToAssign}
                    isAdminRole={isAdminRole(role)}
                    roleHasUserWritePermission={roleHasUserWritePermission}
                  />
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </ModalBody>
        <RoleModalFooter dataCy={dataCy} role={role} onSubmit={submit} />
      </ModalContent>
    </Modal>
  );
};

export default RoleModal;
