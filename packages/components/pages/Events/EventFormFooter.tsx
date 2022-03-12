import { PlacementWithLogical, useBreakpointValue } from '@chakra-ui/react';
import { Event } from '@packages/data/event';
import { DataAttributes, getDataValue } from '@packages/utils/dataAttributes';
import { Callback } from '@packages/utils/types';
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
import Box from '@packages/components/core/Containers/Box';
import Button from '@packages/components/core/Interactive/Button';
import ButtonGroup from '@packages/components/core/Interactive/ButtonGroup';

export interface EventFormFooterProps extends DataAttributes {
  /** If no event, this is a creation modal */
  event?: Event;
  onSubmit: Callback;
  onDelete?: Callback;
  error: string | null;
}

const EventFormFooter: React.FC<EventFormFooterProps> = ({
  dataCy,
  event,
  onSubmit,
  onDelete,
  error,
}) => {
  const deletePopoverPlacement: PlacementWithLogical | undefined = useBreakpointValue({
    base: 'bottom',
    lg: 'end',
  });

  return (
    <ModalFooter>
      <Center w="full">
        <ButtonGroup>
          {event && (
            <Box>
              <Popover placement={deletePopoverPlacement} preventOverflow>
                <PopoverTrigger>
                  <Button dataCy={getDataValue(dataCy, 'delete')} colorScheme="red">
                    Supprimer l&apos;événement
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverHeader>Supprimer l&apos;événement</PopoverHeader>
                  <PopoverBody>Êtes-vous sûr de vouloir supprimer l&apos;événement ?</PopoverBody>
                  <PopoverFooter textAlign="end">
                    <Button
                      dataCy={getDataValue(dataCy, 'delete')}
                      colorScheme="red"
                      onClick={onDelete}
                    >
                      Confirmer la suppression
                    </Button>
                  </PopoverFooter>
                </PopoverContent>
              </Popover>
            </Box>
          )}
          <Button
            dataCy={getDataValue(dataCy, 'submit')}
            colorScheme="green"
            onClick={onSubmit}
            isDisabled={!!error}
            title={error ?? undefined}
          >
            {event ? 'Valider les changements' : 'Valider la création'}
          </Button>
        </ButtonGroup>
      </Center>
    </ModalFooter>
  );
};

export default EventFormFooter;
