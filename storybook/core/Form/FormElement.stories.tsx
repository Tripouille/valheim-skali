import FormElement, { FormElementProps } from 'components/core/Form/FormElement';
import Input from 'components/core/Form/Input';
import { StoryCategory } from 'storybook/config/constants';
import { storybookSetup } from 'storybook/config/setup';

const { defaultExport, StoryFactory } = storybookSetup<FormElementProps>(
  FormElement,
  StoryCategory.CORE_FORM,
);

export default defaultExport;

export const Default = StoryFactory({
  label: 'Label',
  hint: 'Hint',
  isDisabled: false,
  isInvalid: false,
  isReadOnly: false,
  isRequired: false,
  children: <Input />,
});
