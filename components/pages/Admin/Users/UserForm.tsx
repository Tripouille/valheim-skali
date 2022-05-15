import { useMemo } from 'react';
import { CypressProps, Callback } from 'utils/types';
import { User, USER_NAME_IN_GAME_MAX_LENGTH } from 'data/user';
import { Role } from 'data/role';
import { PermissionCategory, PermissionPrivilege } from 'utils/auth';
import useSession from 'utils/hooks/useSession';
import Secured from 'components/core/Authentication/Secured';
import Center from 'components/core/Containers/Center';
import { ModalBody, ModalHeader } from 'components/core/Overlay/Modal';
import { Table, Tbody, Td, Th, Tr } from 'components/core/DataDisplay/Table';
import Text from 'components/core/Typography/Text';
import Editable from 'components/core/Interactive/Editable';
import FormModal from 'components/core/Form/FormModal';
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

export interface UserFormProps extends CypressProps {
  isOpen: boolean;
  onClose: Callback;
  user: User;
  roles: Role[];
}

const UserForm: React.FC<UserFormProps> = ({ 'data-cy': dataCy, isOpen, onClose, user, roles }) => {
  const { updateUserNameInGame } = useUpdateUser(user);
  const deleteUser = useDeleteUser(user);
  const session = useSession();

  const canDeleteUser = useMemo(() => {
    const userRoles = getUserRoles(user, roles);
    if (
      !session.hasRequiredPermissions({ [PermissionCategory.USER]: PermissionPrivilege.READ_WRITE })
    )
      return false;
    for (const role of userRoles) {
      if (role && !canUserAssignRole(role, session.hasRequiredPermissions)) return false;
    }
    return true;
  }, [user, roles, session]);

  return (
    <FormModal
      data-cy={dataCy}
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
          <UserAvatar src={user.image} />
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
                    data-cy="name-in-game"
                    initialValue={user.nameInGame}
                    onSubmit={updateUserNameInGame}
                    inputProps={{ maxLength: USER_NAME_IN_GAME_MAX_LENGTH }}
                  />
                </Secured>
              </Td>
            </Tr>
            <Secured permissions={{ [PermissionCategory.ROLE]: PermissionPrivilege.READ }}>
              <Tr>
                <Th>Rôles</Th>
                <Td>
                  <UserRolesForm user={user} roles={roles} />
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
