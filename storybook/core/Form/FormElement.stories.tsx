import { storybookSetup } from 'storybook/config/setup';
import { StoryCategory } from 'storybook/config/constants';
import Input from 'components/core/Form/Input';
import FormElement, { FormElementProps } from 'components/core/Form/FormElement';

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
