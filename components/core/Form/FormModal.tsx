import { Callback, Children, CypressProps } from 'utils/types';
import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  ModalFooter,
} from 'components/core/Overlay/Modal';
import Center from 'components/core/Containers/Center';
import ButtonGroup from 'components/core/Interactive/ButtonGroup';
import DeletePopover from './DeletePopover';
import FormSubmitButton from './FormSubmitButton';

/** F = FormData (usually Partial<C>), C = CreateObjectData */
export type FormModalProps<F, C> = CypressProps & {
  /** Set initial focus to close button or first tabbable element in modal */
  initialFocusOnCloseButton?: boolean;
  /** Modal is open */
  isOpen: boolean;
  /** Function to close the modal */
  onClose: Callback;
  formData?: F;
  /** Function returning validation error message or null (--> formData is C) */
  getValidationError?: (formData: F) => string | null;
  canSubmit?: boolean;
  onSubmit?: (newObject: C) => void;
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

const FormModal = <F extends object, C extends object>(props: FormModalProps<F, C>) => {
  const {
    'data-cy': dataCy,
    isEdition,
    formData,
    getValidationError,
    canSubmit = true,
    onSubmit,
    children,
  } = props;

  const canDelete = isEdition && (props.canDelete ?? true);

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
                  <FormSubmitButton
                    isEdition={isEdition}
                    formData={formData}
                    getValidationError={getValidationError}
                    onSubmit={onSubmit}
                  />
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
