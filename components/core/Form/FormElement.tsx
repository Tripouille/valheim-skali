import { chakra } from '@chakra-ui/react';
import { Grid } from 'components/core/Containers/Grid';
import { Children, CypressProps } from 'utils/types';
import FromMarkup from '../DataDisplay/FromMarkup';
import { FormControl, FormHelperText, FormLabel } from './FormControl';

export interface FormElementProps extends Partial<CypressProps> {
  label: string;
  withMarkup?: boolean;
  hint?: string;
  isDisabled?: boolean;
  isInvalid?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  vertical?: true;
  className?: string;
  /** The input, should be full width */
  children: Children;
}

/** A label and an input (provided as child) for a line in a classic form */
const FormElement: React.FC<FormElementProps> = ({
  'data-cy': dataCy,
  label,
  withMarkup,
  hint,
  isDisabled,
  isInvalid,
  isReadOnly,
  isRequired,
  vertical,
  className,
  children,
}) => (
  <FormControl
    data-cy={dataCy}
    isDisabled={isDisabled}
    isInvalid={isInvalid}
    isReadOnly={isReadOnly}
    isRequired={isRequired}
    className={className}
  >
    <Grid
      templateColumns={vertical ? '1fr' : ['1fr 2fr', null, '1fr 3fr', '1fr 4fr']}
      columnGap="3"
      rowGap={vertical ? 1 : 0}
      alignItems="center"
    >
      <FormLabel fontWeight="normal">
        {withMarkup ? <FromMarkup content={label} /> : label}
      </FormLabel>
      {children}
      {hint && (
        <FormHelperText
          gridColumn={vertical ? '1' : '2 / 2'}
          marginTop={vertical ? 0 : undefined}
          wordBreak="break-word"
        >
          {hint}
        </FormHelperText>
      )}
    </Grid>
  </FormControl>
);

export default chakra(FormElement);
