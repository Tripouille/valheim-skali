import { useMemo } from 'react';
import { getDataValue, DataAttributes } from '@packages/utils/dataAttributes';
import { Callback } from '@packages/utils/types';
import { User } from '@packages/data/user';
import { Role } from '@packages/data/role';
import { PermissionCategory, PermissionPrivilege } from '@packages/utils/auth';
import useSession from '@packages/utils/hooks/useSession';
import Secured from '@packages/components/core/Authentication/Secured';
import Center from '@packages/components/core/Containers/Center';
import { ModalBody, ModalHeader } from '@packages/components/core/Overlay/Modal';
import { Table, Tbody, Td, Th, Tr } from '@packages/components/core/DataDisplay/Table';
import Text from '@packages/components/core/Typography/Text';
import Editable from '@packages/components/core/Interactive/Editable';
import FormModal from '@packages/components/core/Form/FormModal';
import UserRolesForm from './UserRolesForm';
import UserAvatar from './UserAvatar';
import useUpdateUser from '../hooks/useUpdateUser';
import useDeleteUser from '../hooks/useDeleteUser';
import {
  darkerBackgroundColor,
  modalTableHeaderWidth,
  getUserRoles,
  canUserAssignRole,
} from '../utils';

export interface UserFormProps extends DataAttributes {
  isOpen: boolean;
  onClose: Callback;
  user: User;
  roles: Role[];
}

const UserForm: React.FC<UserFormProps> = ({ dataCy, isOpen, onClose, user, roles }) => {
  const { updateUserNameInGame } = useUpdateUser(user);
  const deleteUser = useDeleteUser(user);
  const session = useSession();

  const canDeleteUser = useMemo(() => {
    const userRoles = getUserRoles(user, roles);
    for (const role of userRoles) {
      if (role && !canUserAssignRole(role, session.hasRequiredPermissions)) return false;
    }
    return true;
  }, [user, roles, session]);

  return (
    <FormModal
      dataCy={dataCy}
      initialFocusOnCloseButton
      isOpen={isOpen}
      onClose={onClose}
      isEdition
      canSubmit={false}
      canDelete={canDeleteUser}
      onDelete={deleteUser}
      deleteLabel="Supprimer l'utilisateur"
      deletePopoverBody="Êtes-vous sûr de vouloir supprimer l'utilisateur ? Il reviendra comme âme perdue à sa prochaine connexion."
    >
      <ModalHeader>
        <Center>
          <UserAvatar dataCy={dataCy} src={user.image} />
          <Text px="5" maxW="80%" variant="limitedWidth">
            {user.name}
          </Text>
        </Center>
      </ModalHeader>
      <ModalBody>
        <Table>
          <Tbody>
            <Tr bgColor={darkerBackgroundColor}>
              <Th w={modalTableHeaderWidth}>Pseudo en jeu</Th>
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
    </FormModal>
  );
};

export default UserForm;
