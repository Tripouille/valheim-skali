import { useMemo } from 'react';
import {
  PlacementWithLogical,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  useBreakpointValue,
} from '@chakra-ui/react';
import { User } from '@packages/data/user';
import { Role } from '@packages/data/role';
import { useSession } from '@packages/utils/hooks/useSession';
import { DataAttributes, getDataValue } from '@packages/utils/dataAttributes';
import { PermissionCategory, PermissionPrivilege } from '@packages/utils/auth';
import Secured from '@packages/components/core/Authentication/Secured';
import { ModalFooter } from '@packages/components/core/Overlay/Modal';
import Button from '@packages/components/core/Interactive/Button';
import Center from '@packages/components/core/Containers/Center';
import useDeleteUser from '../hooks/useDeleteUser';
import { canUserAssignRole, getUserRoles } from '../utils';

export interface MemberModalFooterProps extends DataAttributes {
  user: User;
  roles: Role[];
}

const MemberModalFooter: React.FC<MemberModalFooterProps> = ({ dataCy, user, roles }) => {
  const deletePopoverPlacement: PlacementWithLogical | undefined = useBreakpointValue({
    base: 'bottom',
    lg: 'end',
  });
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
    <Secured permissions={{ [PermissionCategory.USER]: PermissionPrivilege.READ_WRITE }}>
      {canDeleteUser && (
        <ModalFooter borderTop="1px gray solid">
          <Center w="full">
            <Popover placement={deletePopoverPlacement} preventOverflow>
              <PopoverTrigger>
                <Button dataCy={getDataValue(dataCy, 'delete')} colorScheme="red">
                  Supprimer l&apos;utilisateur
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Supprimer l&apos;utilisateur</PopoverHeader>
                <PopoverBody>
                  Êtes-vous sûr de vouloir supprimer l&apos;utilisateur ? Il reviendra comme âme
                  perdue à sa prochaine connexion.
                </PopoverBody>
                <PopoverFooter textAlign="end">
                  <Button
                    dataCy={getDataValue(dataCy, 'delete')}
                    colorScheme="red"
                    onClick={deleteUser}
                  >
                    Confirmer la suppression
                  </Button>
                </PopoverFooter>
              </PopoverContent>
            </Popover>
          </Center>
        </ModalFooter>
      )}
    </Secured>
  );
};

export default MemberModalFooter;
