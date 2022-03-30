import { useEffect, useState } from 'react';
import { Callback, Children } from '@packages/utils/types';
import { getDataValue, DataAttributes } from '@packages/utils/dataAttributes';
import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  ModalFooter,
} from '@packages/components/core/Overlay/Modal';
import Center from '@packages/components/core/Containers/Center';
import Box from '@packages/components/core/Containers/Box';
import Button from '@packages/components/core/Interactive/Button';
import ButtonGroup from '@packages/components/core/Interactive/ButtonGroup';
import DeletePopover from './DeletePopover';

/** T = CreateObjectData */
export type FormModalProps<T> = DataAttributes & {
  /** Modal is open */
  isOpen: boolean;
  /** Function to close the modal */
  onClose: Callback;
  formData: Partial<T>;
  /** Function returning validation error message or null */
  getValidationError: (object: Partial<T>) => string | null;
  canSubmit?: boolean;
  onSubmit: (newObject: T) => void;
  /** Form */
  children: Children;
} & (
    | { isEdition: false; onDelete?: never }
    | {
        isEdition: true;
        canDelete?: boolean;
        onDelete: Callback;
        deleteLabel: string;
        deletePopoverBody: string;
      }
  );

const FormModal = <T extends object>(props: FormModalProps<T>) => {
  const { dataCy, formData, getValidationError, canSubmit = true, onSubmit, children } = props;

  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    setValidationError(getValidationError(formData));
  }, [formData, getValidationError]);

  const handleSubmit = () => {
    /** If validationError is null, formData is T */
    if (validationError === null) onSubmit(formData as T);
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        {children}
        <ModalFooter>
          <Center w="full">
            <ButtonGroup>
              {props.isEdition && (props.canDelete ?? true) && (
                <Box>
                  <DeletePopover
                    dataCy={dataCy}
                    onDelete={props.onDelete}
                    deleteLabel={props.deleteLabel}
                    deletePopoverBody={props.deletePopoverBody}
                  />
                </Box>
              )}
              {canSubmit && (
                <Button
                  dataCy={getDataValue(dataCy, 'submit')}
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
        <ModalCloseButton dataCy={getDataValue(dataCy, 'close_button')} />
      </ModalContent>
    </Modal>
  );
};

export default FormModal;
