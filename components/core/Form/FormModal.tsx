import { useEffect, useState } from 'react';
import { Callback, Children, CypressProps } from 'utils/types';
import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  ModalFooter,
} from 'components/core/Overlay/Modal';
import Center from 'components/core/Containers/Center';
import Button from 'components/core/Interactive/Button';
import ButtonGroup from 'components/core/Interactive/ButtonGroup';
import DeletePopover from './DeletePopover';

/** T = CreateObjectData */
export type FormModalProps<F, T> = CypressProps & {
  /** Set initial focus to close button or first tabbable element in modal */
  initialFocusOnCloseButton?: boolean;
  /** Modal is open */
  isOpen: boolean;
  /** Function to close the modal */
  onClose: Callback;
  formData?: F;
  /** Function returning validation error message or null */
  getValidationError?: (object: F) => string | null;
  canSubmit?: boolean;
  onSubmit?: (newObject: T) => void;
  /** Form */
  children: Children;
} & (
    | { isEdition: false }
    | {
        isEdition: true;
        canDelete?: boolean;
        onDelete: Callback;
        deleteLabel: string;
        deletePopoverBody: string;
      }
  );

const FormModal = <F extends object, T extends object>(props: FormModalProps<F, T>) => {
  const {
    'data-cy': dataCy,
    formData,
    getValidationError,
    canSubmit = true,
    onSubmit,
    children,
  } = props;

  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    if (getValidationError && formData) {
      setValidationError(getValidationError(formData));
    }
  }, [formData, getValidationError]);

  const handleSubmit = () => {
    /** If validationError is null, formData is T */
    if (validationError === null && onSubmit) onSubmit(formData as unknown as T);
  };

  const canDelete = props.isEdition && (props.canDelete ?? true);

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent data-cy={dataCy}>
        {children}
        {(canSubmit || canDelete) && (
          <ModalFooter>
            <Center w="full">
              <ButtonGroup>
                {canDelete && (
                  <DeletePopover
                    onDelete={props.onDelete}
                    deleteLabel={props.deleteLabel}
                    deletePopoverBody={props.deletePopoverBody}
                  />
                )}
                {canSubmit && (
                  <Button
                    data-cy="submit"
                    colorScheme="green"
                    onClick={handleSubmit}
                    isDisabled={!!validationError}
                    title={validationError ?? undefined}
                  >
                    {props.isEdition ? 'Valider les changements' : 'Valider la création'}
                  </Button>
                )}
              </ButtonGroup>
            </Center>
          </ModalFooter>
        )}
        <ModalCloseButton tabIndex={props.initialFocusOnCloseButton ? 1 : 0} />
      </ModalContent>
    </Modal>
  );
};

export default FormModal;
