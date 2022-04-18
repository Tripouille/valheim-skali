import { PlacementWithLogical, useBreakpointValue } from '@chakra-ui/react';
import { Callback } from 'utils/types';
import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
} from 'components/core/Overlay/Popover';
import Button from 'components/core/Interactive/Button';

export interface DeletePopoverProps {
  onDelete: Callback;
  deleteLabel: string;
  deletePopoverBody: string;
}

const DeletePopover: React.FC<DeletePopoverProps> = ({
  onDelete,
  deleteLabel,
  deletePopoverBody,
}) => {
  const deletePopoverPlacement: PlacementWithLogical | undefined = useBreakpointValue({
    base: 'bottom',
    lg: 'end',
  });

  return (
    <Popover placement={deletePopoverPlacement} preventOverflow>
      <PopoverTrigger>
        <Button data-cy="delete" colorScheme="red">
          {deleteLabel}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>{deleteLabel}</PopoverHeader>
        <PopoverBody>{deletePopoverBody}</PopoverBody>
        <PopoverFooter textAlign="end">
          <Button data-cy="confirm-delete" colorScheme="red" onClick={onDelete}>
            Confirmer la suppression
          </Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};

export default DeletePopover;
