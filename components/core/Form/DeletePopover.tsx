import { PlacementWithLogical, useBreakpointValue } from '@chakra-ui/react';
import { ActionPopover } from 'components/core/Overlay/Popover';
import { Callback } from 'utils/types';

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
    <ActionPopover
      data-cy="delete"
      action={onDelete}
      label={deleteLabel}
      confirmLabel="Confirmer la suppression"
      confirmBody={deletePopoverBody}
      colorScheme="red"
      placement={deletePopoverPlacement}
    />
  );
};

export default DeletePopover;
