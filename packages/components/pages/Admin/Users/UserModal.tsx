import { getDataValue, DataAttributes } from '@packages/utils/dataAttributes';
import { Callback } from '@packages/utils/types';
import { User } from '@packages/data/user';
import { Role } from '@packages/data/role';
import { PermissionCategory, PermissionPrivilege } from '@packages/utils/auth';
import Secured from '@packages/components/core/Authentication/Secured';
import Center from '@packages/components/core/Containers/Center';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  ModalHeader,
} from '@packages/components/core/Overlay/Modal';
import { Table, Tbody, Td, Th, Tr } from '@packages/components/core/DataDisplay/Table';
import Text from '@packages/components/core/Typography/Text';
import Editable from '@packages/components/core/Interactive/Editable';
import UserRolesForm from './UserRolesForm';
import UserAvatar from './UserAvatar';
import useUpdateUser from '../hooks/useUpdateUser';
import UserModalFooter from './UserModalFooter';

export interface UserModalProps extends DataAttributes {
  isOpen: boolean;
  onClose: Callback;
  user: User;
  roles: Role[];
}

const UserModal: React.FC<UserModalProps> = ({ dataCy, isOpen, onClose, user, roles }) => {
  const { updateUserNameInGame } = useUpdateUser(user);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl" scrollBehavior="inside" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>
          <Center>
            <UserAvatar dataCy={dataCy} src={user.image} />
            <Text px="5" maxW="80%" variant="limitedWidth">
              {user.name}
            </Text>
          </Center>
        </ModalHeader>
        <ModalBody>
          <Table colorScheme="blue">
            <Tbody>
              <Tr bgColor="rgba(0, 0, 0, 0.08)">
                <Th w="20%">Pseudo en jeu</Th>
                <Td>
                  <Secured
                    permissions={{ [PermissionCategory.USER]: PermissionPrivilege.READ_WRITE }}
                    fallback={<Text>{user.nameInGame}</Text>}
                  >
                    <Editable
                      dataCy={getDataValue(dataCy, 'name_in_game', 'editable')}
                      initialValue={user.nameInGame}
                      onSubmit={updateUserNameInGame}
                    />
                  </Secured>
                </Td>
              </Tr>
              <Secured permissions={{ [PermissionCategory.ROLE]: PermissionPrivilege.READ }}>
                <Tr>
                  <Th>Rôles</Th>
                  <Td>
                    <UserRolesForm dataCy={dataCy} user={user} roles={roles} />
                  </Td>
                </Tr>
              </Secured>
            </Tbody>
          </Table>
        </ModalBody>
        <UserModalFooter dataCy={dataCy} user={user} roles={roles} />
      </ModalContent>
    </Modal>
  );
};

export default UserModal;
