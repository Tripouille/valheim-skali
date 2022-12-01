import { BiEdit, BiTrash } from 'react-icons/bi';
import { BsArrowDown, BsArrowUp, BsCheckLg, BsXLg } from 'react-icons/bs';
import ButtonGroup from 'components/core/Interactive/ButtonGroup';
import IconButton from 'components/core/Interactive/IconButton';
import { ActionPopover } from 'components/core/Overlay/Popover';
import { Callback } from 'utils/types';

interface Props {
  isEditing: boolean;
  setIsEditing: {
    on: () => void;
    off: () => void;
  };
  canSubmit: boolean;
  onSubmit: Callback;
  onCancel: Callback;
  onDelete?: Callback;
  canMoveUp: boolean;
  onMoveUp?: Callback;
  canMoveDown: boolean;
  onMoveDown?: Callback;
}

const EditableQuestionControls: React.FC<Props> = ({
  isEditing,
  setIsEditing,
  canSubmit,
  onSubmit,
  onCancel,
  onDelete,
  canMoveUp,
  onMoveUp,
  canMoveDown,
  onMoveDown,
}) => (
  <ButtonGroup
    display="grid"
    gridTemplateAreas={`"arrowup edit" "arrowdown delete"`}
    height="max-content"
    alignItems="center"
    gap="2"
    size="sm"
    spacing="0"
  >
    {isEditing ? (
      <>
        <IconButton
          data-cy="submit-edition"
          aria-label="Valider"
          title="Valider"
          icon={<BsCheckLg />}
          colorScheme="green"
          gridArea="edit"
          onClick={onSubmit}
          disabled={!canSubmit}
        />
        <IconButton
          data-cy="cancel-edition"
          aria-label="Annuler"
          title="Annuler"
          icon={<BsXLg />}
          bgColor="#708099"
          _hover={{ bgColor: '#607089' }}
          gridArea="delete"
          onClick={onCancel}
        />
      </>
    ) : (
      <>
        {canMoveUp && (
          <IconButton
            data-cy="move-up"
            aria-label="Remonter la question"
            title="Remonter la question"
            icon={<BsArrowUp />}
            colorScheme="purple"
            gridArea="arrowup"
            onClick={onMoveUp}
          />
        )}
        {canMoveDown && (
          <IconButton
            data-cy="move-down"
            aria-label="Descendre la question"
            title="Descendre la question"
            icon={<BsArrowDown />}
            colorScheme="purple"
            gridArea="arrowdown"
            onClick={onMoveDown}
          />
        )}
        <IconButton
          data-cy="edit"
          aria-label="Modifier"
          title="Modifier"
          alignSelf="center"
          icon={<BiEdit />}
          colorScheme="blue"
          gridArea="edit"
          onClick={setIsEditing.on}
        />
        {onDelete && (
          <ActionPopover
            data-cy="delete"
            action={onDelete}
            label="Supprimer la question"
            confirmLabel="Confirmer la suppression"
            confirmBody="Êtes-vous sûr de vouloir supprimer cette question ?"
            colorScheme="red"
            gridArea="delete"
          >
            {({ children, ...props }) => (
              <IconButton
                aria-label="Supprimer"
                title="Supprimer"
                alignSelf="center"
                icon={<BiTrash />}
                {...props}
              />
            )}
          </ActionPopover>
        )}
      </>
    )}
  </ButtonGroup>
);

export default EditableQuestionControls;
