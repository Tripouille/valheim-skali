import { action } from '@storybook/addon-actions';
import Textarea, { TextareaProps } from '@packages/components/core/Form/Textarea';
import { storybookSetup } from '@packages/storybook/config/setup';
import { StoryCategory } from '@packages/storybook/config/constants';
import { FormLabel } from '@packages/components/core/Form/FormControl';

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
  dataCy: '',
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
