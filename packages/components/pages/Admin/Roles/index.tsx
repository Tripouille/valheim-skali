import { BsPlusLg } from 'react-icons/bs';
import { useDisclosure } from '@chakra-ui/react';
import { AdminNavRoute } from '@packages/utils/routes';
import { getDataValue } from '@packages/utils/dataAttributes';
import Button from '@packages/components/core/Interactive/Button';
import { useRoles } from '../hooks/useRoles';
import useCreateRole from '../hooks/useCreateRole';
import RolesTable from './RolesTable';
import RoleModal from './RoleModal';
import AdminTableWrapper from '../AdminTableWrapper';

const Roles = () => {
  const rolesQuery = useRoles();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const createRole = useCreateRole(onClose);

  return (
    <AdminTableWrapper adminNavRoute={AdminNavRoute.ROLES} query={rolesQuery}>
      <RolesTable roles={rolesQuery.data ?? []} />
      <Button
        dataCy={getDataValue('roles', 'create', 'button')}
        leftIcon={<BsPlusLg />}
        colorScheme="green"
        mt="5"
        onClick={onOpen}
      >
        Créer un rôle
      </Button>
      <RoleModal
        dataCy={getDataValue('roles', 'create', 'modal')}
        isOpen={isOpen}
        onSubmit={createRole}
        onClose={onClose}
      />
    </AdminTableWrapper>
  );
};

export default Roles;
