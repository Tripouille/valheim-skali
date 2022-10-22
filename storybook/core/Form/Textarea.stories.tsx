import { action } from '@storybook/addon-actions';
import { FormLabel } from 'components/core/Form/FormControl';
import Textarea, { TextareaProps } from 'components/core/Form/Textarea';
import { StoryCategory } from 'storybook/config/constants';
import { storybookSetup } from 'storybook/config/setup';

const { defaultExport, StoryFactory } = storybookSetup<TextareaProps>(
  Textarea,
  StoryCategory.CORE_FORM,
  {
    decorators: [
      Story => (
        <>
          <FormLabel htmlFor="textarea_story">Label</FormLabel>
          <Story />
        </>
      ),
    ],
  },
);

export default defaultExport;

export const Default = StoryFactory({
  id: 'textarea_story',
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
