import { useEffect, useState } from 'react';
import { FiHelpCircle } from 'react-icons/fi';
import { getDataValue, DataAttributes } from '@packages/utils/dataAttributes';
import { Callback } from '@packages/utils/types';
import { Role } from '@packages/data/role';
import {
  isAdminRole,
  isSpecialRole,
  PermissionCategory,
  PermissionPrivilege,
  PERMISSION_CATEGORY_TO_LABEL,
  PERMISSION_PRIVILEGE_TO_LABEL,
} from '@packages/utils/auth';
import Secured from '@packages/components/core/Authentication/Secured';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from '@packages/components/core/Overlay/Modal';
import Tooltip from '@packages/components/core/Overlay/Tooltip';
import { Table, Tbody, Td, Th, Tr } from '@packages/components/core/DataDisplay/Table';
import Text from '@packages/components/core/Typography/Text';
import Input from '@packages/components/core/Interactive/Input';
import FormLabel from '@packages/components/core/Interactive/FormControl';
import Select from '@packages/components/core/Interactive/Select';
import Flex from '@packages/components/core/Containers/Flex';
import useUpdateRole from '../hooks/useUpdateRole';
import RolePermissionsForm from './RolePermissionsForm';
import RoleModalFooter from './RoleModalFooter';

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

  const hasUserWritePermission =
    (permissions[PermissionCategory.USER] ?? PermissionPrivilege.NONE) >=
      PermissionPrivilege.READ_WRITE || isAdminRole(role);

  useEffect(() => {
    if (
      hasUserWritePermission &&
      (requiredPermissionsToAssign[PermissionCategory.USER] ?? PermissionPrivilege.NONE) <
        PermissionPrivilege.ADMIN
    ) {
      setRequiredPermissionsToAssign({ [PermissionCategory.USER]: PermissionPrivilege.ADMIN });
    }
  }, [hasUserWritePermission, requiredPermissionsToAssign, isOpen]);

  const changePermissions =
    (category: PermissionCategory) => (newPrivilege: PermissionPrivilege) => {
      setPermissions(previousPermissions => ({
        ...previousPermissions,
        [category]: newPrivilege,
      }));
    };

  const changeRequiredPermissionsToAssign = (newPrivilege: PermissionPrivilege) => {
    setRequiredPermissionsToAssign({
      [PermissionCategory.USER]: newPrivilege,
    });
  };

  const submit = () => updateRole({ name, permissions, requiredPermissionsToAssign });

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl" scrollBehavior="inside" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <Table colorScheme="blue">
            <Tbody>
              <Tr bgColor="rgba(0, 0, 0, 0.08)">
                <Th w="20%">Nom</Th>
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
              <Tr bgColor="rgba(0, 0, 0, 0.08)">
                <Th>Permissions requises pour assigner ce rôle</Th>
                <Td>
                  <Table colorScheme="blue" size="sm">
                    <Tbody>
                      <Tr>
                        <Th w="20%">
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
                              isDisabled={hasUserWritePermission}
                            >
                              <option value={PermissionPrivilege.READ_WRITE}>
                                {PERMISSION_PRIVILEGE_TO_LABEL[PermissionPrivilege.READ_WRITE]}
                              </option>
                              <option value={PermissionPrivilege.ADMIN}>
                                {PERMISSION_PRIVILEGE_TO_LABEL[PermissionPrivilege.ADMIN]}
                              </option>
                              {isAdminRole(role) && (
                                <option value={PermissionPrivilege.SUPER_ADMIN}>
                                  {PERMISSION_PRIVILEGE_TO_LABEL[PermissionPrivilege.SUPER_ADMIN]}
                                </option>
                              )}
                            </Select>
                            {hasUserWritePermission && !isAdminRole(role) && (
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
