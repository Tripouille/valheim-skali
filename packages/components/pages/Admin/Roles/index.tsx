import { BsPlusLg } from 'react-icons/bs';
import { useDisclosure } from '@chakra-ui/react';
import { Role } from '@packages/data/role';
import { getDataValue } from '@packages/utils/dataAttributes';
import { PermissionCategory, PermissionPrivilege } from '@packages/utils/auth';
import Button from '@packages/components/core/Interactive/Button';
import Secured from '@packages/components/core/Authentication/Secured';
import useCreateRole from '../hooks/useCreateRole';
import RolesTable from './RolesTable';
import RoleForm from './RoleForm';

export interface RolesProps {
  roles?: Role[];
}

const Roles: React.FC<RolesProps> = ({ roles = [] }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const createRole = useCreateRole(onClose);

  return (
    <>
      <RolesTable roles={roles} />
      <Secured permissions={{ [PermissionCategory.ROLE]: PermissionPrivilege.READ_WRITE }}>
        <Button
          dataCy={getDataValue('roles', 'create', 'button')}
          leftIcon={<BsPlusLg />}
          colorScheme="green"
          mt="5"
          onClick={onOpen}
        >
          Créer un rôle
        </Button>
        <RoleForm
          dataCy={getDataValue('roles', 'create', 'modal')}
          isOpen={isOpen}
          onSubmit={createRole}
          onClose={onClose}
        />
      </Secured>
    </>
  );
};

export default Roles;
