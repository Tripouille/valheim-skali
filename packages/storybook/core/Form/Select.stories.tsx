import { action } from '@storybook/addon-actions';
import Select, { SelectProps } from '@packages/components/core/Form/Select';
import { storybookSetup } from '@packages/utils/Storybook/setup';
import { StoryCategory } from '@packages/utils/Storybook/constants';

const { defaultExport, StoryFactory } = storybookSetup<SelectProps<string>>(
  Select,
  StoryCategory.CORE_FORM,
);

export default defaultExport;

export const Default = StoryFactory({
  dataCy: '',
  onChange: action('Changed'),
  errorBorderColor: 'red.500',
  focusBorderColor: 'blue.500',
  iconColor: 'white',
  iconSize: 'md',
  isDisabled: false,
  isInvalid: false,
  isReadOnly: false,
  isRequired: false,
  placeholder: 'Placeholder',
  size: 'md',
  variant: 'outline',
  children: (
    <>
      <option>Option 1</option>
      <option>Option 2</option>
    </>
  ),
});
