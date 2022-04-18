import { useEffect, useRef, useState } from 'react';
import { Callback, Children, CypressProps } from 'utils/types';
import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  ModalFooter,
} from 'components/core/Overlay/Modal';
import Center from 'components/core/Containers/Center';
import Box from 'components/core/Containers/Box';
import Button from 'components/core/Interactive/Button';
import ButtonGroup from 'components/core/Interactive/ButtonGroup';
import DeletePopover from './DeletePopover';

/** T = CreateObjectData */
export type FormModalProps<T> = CypressProps & {
  /** Set initial focus to close button or first tabbable element in modal */
  initialFocusOnCloseButton?: boolean;
  /** Modal is open */
  isOpen: boolean;
  /** Function to close the modal */
  onClose: Callback;
  formData?: Partial<T>;
  /** Function returning validation error message or null */
  getValidationError?: (object: Partial<T>) => string | null;
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

const FormModal = <T extends object>(props: FormModalProps<T>) => {
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
    if (validationError === null && onSubmit) onSubmit(formData as T);
  };

  const canDelete = props.isEdition && (props.canDelete ?? true);

  const testRef = useRef(null);

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} initialFocusRef={testRef}>
      <ModalOverlay />
      <ModalContent data-cy={dataCy}>
        {children}
        {(canSubmit || canDelete) && (
          <ModalFooter>
            <Center w="full">
              <ButtonGroup>
                {canDelete && (
                  <Box>
                    <DeletePopover
                      onDelete={props.onDelete}
                      deleteLabel={props.deleteLabel}
                      deletePopoverBody={props.deletePopoverBody}
                    />
                  </Box>
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
