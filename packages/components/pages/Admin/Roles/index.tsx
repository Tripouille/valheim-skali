import { BsPlusLg } from 'react-icons/bs';
import { useDisclosure } from '@chakra-ui/react';
import { Role } from '@packages/data/role';
import { getDataValue } from '@packages/utils/dataAttributes';
import Button from '@packages/components/core/Interactive/Button';
import useCreateRole from '../hooks/useCreateRole';
import RolesTable from './RolesTable';
import RoleModal from './RoleModal';

export interface RolesProps {
  roles?: Role[];
}

const Roles: React.FC<RolesProps> = ({ roles = [] }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const createRole = useCreateRole(onClose);

  return (
    <>
      <RolesTable roles={roles} />
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
    </>
  );
};

export default Roles;
