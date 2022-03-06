import { getDataValue, DataAttributes } from '@packages/utils/dataAttributes';
import { Callback } from '@packages/utils/types';
import { isUserWithInfos, User } from '@packages/data/user';
import { Role } from '@packages/data/role';
import Center from '@packages/components/core/Containers/Center';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  ModalFooter,
  ModalHeader,
} from '@packages/components/core/Overlay/Modal';
import { Table, Tbody, Td, Th, Tr } from '@packages/components/core/DataDisplay/Table';
import Text from '@packages/components/core/Typography/Text';
import Button from '@packages/components/core/Interactive/Button';
import Editable from '@packages/components/core/Interactive/Editable';
import MembersRoleForm from './MemberRolesForm';
import MemberAvatar from './MemberAvatar';
import { useUpdateUser } from '../hooks/useUpdateUser';
import { PermissionCategory, PermissionPrivilege } from '@packages/utils/auth';
import Secured from '../../../core/Authentication/Secured';

export interface MemberModalProps extends DataAttributes {
  isOpen: boolean;
  onClose: Callback;
  user: User;
  roles: Role[];
}

const MemberModal: React.FC<MemberModalProps> = ({ dataCy, isOpen, onClose, user, roles }) => {
  const userHasInfos = isUserWithInfos(user);
  const { updateUserNameInGame } = useUpdateUser(user);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl" scrollBehavior="inside" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>
          <Center>
            <MemberAvatar dataCy={dataCy} src={user.image} />
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
                    fallback={<Text>{userHasInfos ? user.nameInGame : undefined}</Text>}
                  >
                    <Editable
                      dataCy={getDataValue(dataCy, 'name_in_game', 'editable')}
                      initialValue={userHasInfos ? user.nameInGame : undefined}
                      onSubmit={updateUserNameInGame}
                    />
                  </Secured>
                </Td>
              </Tr>
              <Secured permissions={{ [PermissionCategory.ROLE]: PermissionPrivilege.READ }}>
                <Tr>
                  <Th>Rôles</Th>
                  <Td>
                    <MembersRoleForm dataCy={dataCy} user={user} roles={roles} />
                  </Td>
                </Tr>
              </Secured>
            </Tbody>
          </Table>
        </ModalBody>
        <ModalFooter borderTop="1px gray solid">
          <Center w="full">
            <Button dataCy={getDataValue(dataCy, 'delete')} colorScheme="red">
              Supprimer l&apos;utilisateur
            </Button>
          </Center>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MemberModal;
