import Center from 'components/core/Containers/Center';
import { Stack } from 'components/core/Containers/Stack';
import { Callback, Children } from 'utils/types';
import DeletePopover from './DeletePopover';
import FormSubmitButton from './FormSubmitButton';

/** F = FormData (usually Partial<C>), C = CreateObjectData */
export type FormFullPageProps<F, C> = {
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

const FormFullPage = <F extends object, C extends object>(props: FormFullPageProps<F, C>) => {
  const { isEdition, formData, getValidationError, canSubmit = true, onSubmit, children } = props;

  const canDelete = isEdition && (props.canDelete ?? true);

  return (
    <Stack spacing={5}>
      {children}
      {(canSubmit || canDelete) && (
        <Center w="full">
          <Stack direction={{ base: 'column-reverse', md: 'row' }}>
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
          </Stack>
        </Center>
      )}
    </Stack>
  );
};

export default FormFullPage;
