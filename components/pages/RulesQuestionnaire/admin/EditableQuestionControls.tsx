import { BiEdit, BiTrash } from 'react-icons/bi';
import { BsCheckLg, BsXLg } from 'react-icons/bs';
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
}

const EditableQuestionControls: React.FC<Props> = ({
  isEditing,
  setIsEditing,
  canSubmit,
  onSubmit,
  onCancel,
  onDelete,
}) => (
  <ButtonGroup flexDirection="column" alignItems="center" gap="2" size="sm" spacing="0">
    {isEditing ? (
      <>
        <IconButton
          data-cy="submit-edition"
          aria-label="Valider"
          title="Valider"
          icon={<BsCheckLg />}
          colorScheme="green"
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
          onClick={onCancel}
        />
      </>
    ) : (
      <>
        <IconButton
          data-cy="edit"
          aria-label="Modifier"
          title="Modifier"
          alignSelf="center"
          icon={<BiEdit />}
          colorScheme="blue"
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
