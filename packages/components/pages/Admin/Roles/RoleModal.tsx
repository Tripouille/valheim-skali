import { useEffect, useState } from 'react';
import { getDataValue, DataAttributes } from '@packages/utils/dataAttributes';
import { Callback } from '@packages/utils/types';
import { Role } from '@packages/data/role';
import {
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
import { Table, Tbody, Td, Th, Tr } from '@packages/components/core/DataDisplay/Table';
import Text from '@packages/components/core/Typography/Text';
import FormLabel from '@packages/components/core/Interactive/FormControl';
import Input from '@packages/components/core/Interactive/Input';
import Select from '@packages/components/core/Interactive/Select';
import RoleModalFooter from './RoleModalFooter';

export interface RoleModalProps extends DataAttributes {
  isOpen: boolean;
  onClose: Callback;
  role: Role;
}

const RoleModal: React.FC<RoleModalProps> = ({ dataCy, isOpen, onClose, role }) => {
  const [name, setName] = useState(role.name);
  const [permissions, setPermissions] = useState(role.permissions);

  useEffect(() => setPermissions(role.permissions), [role.permissions]);
  useEffect(() => setName(role.name), [role.name]);

  /* onClose dans validate*/

  const onPermissionChange =
    (category: PermissionCategory) => (newPermission: PermissionPrivilege) => {
      setPermissions(previousPermissions => ({
        ...previousPermissions,
        [category]: newPermission,
      }));
    };

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
                    />
                  </Secured>
                </Td>
              </Tr>
              <Tr>
                <Th>Permissions</Th>
                <Td>
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
                              dataCy={getDataValue(dataCy, 'permissions', category, 'select')}
                              id={category}
                              maxW="max-content"
                              value={permissions[category]}
                              onChange={onPermissionChange(category)}
                            >
                              {Object.values(PermissionPrivilege).map(privilege => (
                                <option key={privilege} value={privilege}>
                                  {PERMISSION_PRIVILEGE_TO_LABEL[privilege]}
                                </option>
                              ))}
                            </Select>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </ModalBody>
        <RoleModalFooter dataCy={dataCy} role={role} />
      </ModalContent>
    </Modal>
  );
};

export default RoleModal;
