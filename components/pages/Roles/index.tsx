import { BsPlusLg } from 'react-icons/bs';
import { useDisclosure } from '@chakra-ui/react';
import Secured from 'components/core/Authentication/Secured';
import QueryHandler from 'components/core/Disclosure/QueryHandler';
import Button from 'components/core/Interactive/Button';
import useCreateRole from 'hooks/roles/useCreateRole';
import useRoles from 'hooks/roles/useRoles';
import { rolePrivilege, PermissionCategory } from 'utils/permissions';
import RoleForm from './RoleForm';
import RolesTable from './RolesTable';

const Roles = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const createRole = useCreateRole(onClose);

  const rolesQuery = useRoles();
  const roles = rolesQuery.data ?? [];

  return (
    <QueryHandler query={rolesQuery}>
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
    </QueryHandler>
  );
};

export default Roles;
