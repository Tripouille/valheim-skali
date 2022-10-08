import Button from 'components/core/Interactive/Button';
import { useEffect, useState } from 'react';

interface FormSubmitButtonProps<F, C> {
  isEdition: boolean;
  formData?: F;
  getValidationError?: (formData: F) => string | null;
  onSubmit?: (newObject: C) => void;
}

const FormSubmitButton = <F extends object, C extends object>({
  isEdition,
  formData,
  getValidationError,
  onSubmit,
}: FormSubmitButtonProps<F, C>) => {
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    if (getValidationError && formData) {
      setValidationError(getValidationError(formData));
    }
  }, [formData, getValidationError]);

  const handleSubmit = () => {
    /** If validationError is null, formData is C */
    if (validationError === null && onSubmit) onSubmit(formData as unknown as C);
  };

  return (
    <Button
      data-cy="submit"
      colorScheme="green"
      onClick={handleSubmit}
      isDisabled={!!validationError}
      title={validationError ?? undefined}
    >
      {isEdition ? 'Valider les changements' : 'Valider la création'}
    </Button>
  );
};

export default FormSubmitButton;
