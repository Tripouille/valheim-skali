import { PlacementWithLogical, useBreakpointValue } from '@chakra-ui/react';
import { Role } from '@packages/data/role';
import { DataAttributes, getDataValue } from '@packages/utils/dataAttributes';
import { PermissionCategory, PermissionPrivilege } from '@packages/utils/auth';
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

export interface RoleModalFooterProps extends DataAttributes {
  role: Role;
}

const RoleModalFooter: React.FC<RoleModalFooterProps> = ({ dataCy }) => {
  const deletePopoverPlacement: PlacementWithLogical | undefined = useBreakpointValue({
    base: 'bottom',
    lg: 'end',
  });

  return (
    <Secured permissions={{ [PermissionCategory.ROLE]: PermissionPrivilege.READ_WRITE }}>
      <ModalFooter>
        <Center w="full">
          <ButtonGroup>
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
                    // onClick={deleteUser}
                  >
                    Confirmer la suppression
                  </Button>
                </PopoverFooter>
              </PopoverContent>
            </Popover>
            <Button dataCy={getDataValue(dataCy, 'submit')} colorScheme="green">
              Valider les changements
            </Button>
          </ButtonGroup>
        </Center>
      </ModalFooter>
    </Secured>
  );
};

export default RoleModalFooter;
