import { action } from '@storybook/addon-actions';
import { FormLabel } from 'components/core/Form/FormControl';
import Input, { InputProps } from 'components/core/Form/Input';
import { StoryCategory } from 'storybook/config/constants';
import { storybookSetup } from 'storybook/config/setup';

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
