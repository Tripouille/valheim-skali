import { action } from '@storybook/addon-actions';
import Input, { InputProps } from '@packages/components/core/Form/Input';
import { storybookSetup } from '@packages/utils/Storybook/setup';
import { StoryCategory } from '@packages/utils/Storybook/constants';
import { FormLabel } from '@packages/components/core/Form/FormControl';

const { defaultExport, StoryFactory } = storybookSetup<InputProps>(Input, StoryCategory.CORE_FORM, {
  decorators: [
    Story => (
      <>
        <FormLabel htmlFor="input_story">Label</FormLabel>
        <Story />
      </>
    ),
  ],
});

export default defaultExport;

export const Default = StoryFactory({
  dataCy: '',
  id: 'input_story',
  onChange: action('Changed'),
  errorBorderColor: 'red.500',
  focusBorderColor: 'blue.500',
  isDisabled: false,
  isInvalid: false,
  isReadOnly: false,
  isRequired: false,
  size: 'md',
  variant: 'outline',
});
