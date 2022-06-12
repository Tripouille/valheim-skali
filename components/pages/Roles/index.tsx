import { BsPlusLg } from 'react-icons/bs';
import { useDisclosure } from '@chakra-ui/react';
import { rolePrivilege, PermissionCategory } from 'utils/permissions';
import Button from 'components/core/Interactive/Button';
import Secured from 'components/core/Authentication/Secured';
import useCreateRole from 'hooks/roles/useCreateRole';
import useRoles from 'hooks/roles/useRoles';
import RolesTable from './RolesTable';
import RoleForm from './RoleForm';

const Roles = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const createRole = useCreateRole(onClose);

  const rolesQuery = useRoles();
  const roles = rolesQuery.data ?? [];

  return (
    <>
      <RolesTable roles={roles} />
      <Secured permissions={{ [PermissionCategory.ROLE]: rolePrivilege.ADMIN }}>
        <Button
          data-cy="create-role"
          leftIcon={<BsPlusLg />}
          colorScheme="green"
          mt="5"
          onClick={onOpen}
        >
          Créer un rôle
        </Button>
        <RoleForm data-cy="create-role" isOpen={isOpen} onSubmit={createRole} onClose={onClose} />
      </Secured>
    </>
  );
};

export default Roles;
