import { useEffect, useState } from 'react';
import { getDataValue, DataAttributes } from '@packages/utils/dataAttributes';
import { Callback } from '@packages/utils/types';
import { Role } from '@packages/data/role';
import { isSpecialRoleName, PermissionCategory, PermissionPrivilege } from '@packages/utils/auth';
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
import RoleModalFooter from './RoleModalFooter';
import useUpdateRole from '../hooks/useUpdateRole';
import RolePermissionsForm from './RolePermissionsForm';

export interface RoleModalProps extends DataAttributes {
  isOpen: boolean;
  onClose: Callback;
  role: Role;
}

const RoleModal: React.FC<RoleModalProps> = ({ dataCy, isOpen, onClose, role }) => {
  const [name, setName] = useState(role.name);
  const [permissions, setPermissions] = useState(role.permissions);
  const updateRole = useUpdateRole(role);

  useEffect(() => setPermissions(role.permissions), [role.permissions, isOpen]);
  useEffect(() => setName(role.name), [role.name, isOpen]);

  const isSpecialRole = isSpecialRoleName(role.name);

  const changePermissions =
    (category: PermissionCategory) => (newPrivilege: PermissionPrivilege) => {
      setPermissions(previousPermissions => ({
        ...previousPermissions,
        [category]: newPrivilege,
      }));
    };

  const submit = () => updateRole({ name, permissions });

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
                      isReadOnly={isSpecialRole}
                    />
                  </Secured>
                </Td>
              </Tr>
              <Tr>
                <Th>Permissions</Th>
                <Td>
                  <RolePermissionsForm
                    dataCy={getDataValue(dataCy, 'permissions')}
                    role={role}
                    permissions={permissions}
                    onChange={changePermissions}
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
