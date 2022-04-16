import { PlacementWithLogical, useBreakpointValue } from '@chakra-ui/react';
import { Callback } from 'utils/types';
import { DataAttributes, getDataValue } from 'utils/dataAttributes';
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

export interface DeletePopoverProps extends DataAttributes {
  onDelete: Callback;
  deleteLabel: string;
  deletePopoverBody: string;
}

const DeletePopover: React.FC<DeletePopoverProps> = ({
  dataCy,
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
        <Button dataCy={getDataValue(dataCy, 'delete')} colorScheme="red">
          {deleteLabel}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>{deleteLabel}</PopoverHeader>
        <PopoverBody>{deletePopoverBody}</PopoverBody>
        <PopoverFooter textAlign="end">
          <Button
            dataCy={getDataValue(dataCy, 'delete', 'confirm')}
            colorScheme="red"
            onClick={onDelete}
          >
            Confirmer la suppression
          </Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};

export default DeletePopover;
