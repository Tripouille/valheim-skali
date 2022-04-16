import { Children } from 'utils/types';
import Box from 'components/core/Containers/Box';
import Flex from 'components/core/Containers/Flex';
import { FormControl, FormHelperText, FormLabel } from './FormControl';

const labelWidth = '20%';
const labelMinWidth = '48';

export interface FormElementProps {
  label: string;
  hint?: string;
  isDisabled?: boolean;
  isInvalid?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  /** The input, should be full width */
  children: Children;
}

/** A label and an input (provided as child) for a line in a classic form */
const FormElement: React.FC<FormElementProps> = ({
  label,
  hint,
  isDisabled,
  isInvalid,
  isReadOnly,
  isRequired,
  children,
}) => (
  <FormControl
    isDisabled={isDisabled}
    isInvalid={isInvalid}
    isReadOnly={isReadOnly}
    isRequired={isRequired}
  >
    <Flex align="center">
      <FormLabel w={labelWidth} minW={labelMinWidth}>
        {label}
      </FormLabel>
      {children}
    </Flex>
    {hint && (
      <Flex align="center">
        <Box w={labelWidth} minW={labelMinWidth} aria-hidden />
        <FormHelperText w="full">{hint}</FormHelperText>
      </Flex>
    )}
  </FormControl>
);

export default FormElement;
