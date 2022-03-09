import { PlacementWithLogical, useBreakpointValue } from '@chakra-ui/react';
import { Role } from '@packages/data/role';
import { DataAttributes, getDataValue } from '@packages/utils/dataAttributes';
import {
  isAdminRole,
  isSpecialRole,
  PermissionCategory,
  PermissionPrivilege,
} from '@packages/utils/auth';
import { Callback } from '@packages/utils/types';
import Secured from '@packages/components/core/Authentication/Secured';
import { ModalFooter } from '@packages/components/core/Overlay/Modal';
import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
} from '@packages/components/core/Overlay/Popover';
import Center from '@packages/components/core/Containers/Center';
import Button from '@packages/components/core/Interactive/Button';
import ButtonGroup from '@packages/components/core/Interactive/ButtonGroup';
import useDeleteRole from '../hooks/useDeleteRole';

export interface RoleModalFooterProps extends DataAttributes {
  role: Role;
  onSubmit: Callback;
}

const RoleModalFooter: React.FC<RoleModalFooterProps> = ({ dataCy, role, onSubmit }) => {
  const deletePopoverPlacement: PlacementWithLogical | undefined = useBreakpointValue({
    base: 'bottom',
    lg: 'end',
  });
  const deleteRole = useDeleteRole(role);

  if (isAdminRole(role)) return null;

  return (
    <Secured permissions={{ [PermissionCategory.ROLE]: PermissionPrivilege.READ_WRITE }}>
      <ModalFooter>
        <Center w="full">
          <ButtonGroup>
            {!isSpecialRole(role) && (
              <Popover placement={deletePopoverPlacement} preventOverflow>
                <PopoverTrigger>
                  <Button dataCy={getDataValue(dataCy, 'delete')} colorScheme="red">
                    Supprimer le rôle
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverHeader>Supprimer le rôle</PopoverHeader>
                  <PopoverBody>Êtes-vous sûr de vouloir supprimer le rôle ?</PopoverBody>
                  <PopoverFooter textAlign="end">
                    <Button
                      dataCy={getDataValue(dataCy, 'delete')}
                      colorScheme="red"
                      onClick={deleteRole}
                    >
                      Confirmer la suppression
                    </Button>
                  </PopoverFooter>
                </PopoverContent>
              </Popover>
            )}
            <Button dataCy={getDataValue(dataCy, 'submit')} colorScheme="green" onClick={onSubmit}>
              Valider les changements
            </Button>
          </ButtonGroup>
        </Center>
      </ModalFooter>
    </Secured>
  );
};

export default RoleModalFooter;
